// SPARKMIND-OBP — integrasi Duitku POP (Cloudflare Workers compatible, Web Crypto API)
// Referensi resmi: https://docs.duitku.com/pop/id/
// Doctrine signature (semua HMAC-SHA256 hex lowercase):
//   createInvoice header  stringToSign = merchantCode + timestamp        key=apiKey  (header x-duitku-signature)
//   Callback (form-urlencoded) stringToSign = merchantCode + amount + merchantOrderId  key=apiKey
import type { Bindings } from '../types'

// Endpoint Duitku POP createInvoice.
// PRODUCTION (live, uang riil): https://api-prod.duitku.com/api/merchant/createInvoice
// SANDBOX  (testing)         : https://api-sandbox.duitku.com/api/merchant/createInvoice
export function duitkuBaseUrl(env: Bindings): string {
  return env.DUITKU_ENV === 'production'
    ? 'https://api-prod.duitku.com/api/merchant'
    : 'https://api-sandbox.duitku.com/api/merchant'
}

async function hmacSha256Hex(message: string, key: string): Promise<string> {
  const enc = new TextEncoder()
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    enc.encode(key),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, enc.encode(message))
  return [...new Uint8Array(sig)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export interface InquiryParams {
  merchantOrderId: string
  paymentAmount: number
  productDetails: string
  email: string
  customerName: string
}

export interface InquiryResult {
  ok: boolean
  reference?: string
  paymentUrl?: string
  statusCode?: string
  statusMessage?: string
  raw?: unknown
}

// Buat transaksi (createInvoice) ke Duitku POP.
// Signature dikirim via HEADER: x-duitku-signature = HMAC-SHA256(merchantCode + timestamp, apiKey)
// timestamp = UNIX epoch milidetik (zona waktu Jakarta — gunakan Date.now()).
export async function createInquiry(
  env: Bindings,
  p: InquiryParams
): Promise<InquiryResult> {
  const merchantCode = env.DUITKU_MERCHANT_CODE
  const apiKey = env.DUITKU_API_KEY
  const timestamp = Date.now().toString()
  const signature = await hmacSha256Hex(merchantCode + timestamp, apiKey)

  // Body Duitku POP createInvoice (signature TIDAK di body, tapi di header).
  const body = {
    paymentAmount: p.paymentAmount,
    merchantOrderId: p.merchantOrderId,
    productDetails: p.productDetails,
    email: p.email,
    customerVaName: p.customerName,
    callbackUrl: env.DUITKU_CALLBACK_URL,
    returnUrl: env.DUITKU_RETURN_URL,
    expiryPeriod: 60
  }

  try {
    const res = await fetch(`${duitkuBaseUrl(env)}/createInvoice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-duitku-signature': signature,
        'x-duitku-timestamp': timestamp,
        'x-duitku-merchantcode': merchantCode
      },
      body: JSON.stringify(body)
    })
    const data: any = await res.json().catch(() => ({}))
    if (res.ok && (data.statusCode === '00' || data.paymentUrl)) {
      return {
        ok: true,
        reference: data.reference,
        paymentUrl: data.paymentUrl,
        statusCode: data.statusCode,
        statusMessage: data.statusMessage,
        raw: data
      }
    }
    return {
      ok: false,
      statusCode: data.statusCode,
      statusMessage: data.statusMessage || `HTTP ${res.status}`,
      raw: data
    }
  } catch (err) {
    return { ok: false, statusMessage: String(err) }
  }
}

// Verifikasi signature callback Duitku POP (HTTP POST, x-www-form-urlencoded).
// Formula resmi POP: stringToSign = merchantCode + amount + merchantOrderId, key = apiKey (merchantKey).
export async function verifyCallbackSignature(
  env: Bindings,
  merchantCode: string,
  amount: string,
  merchantOrderId: string,
  signature: string
): Promise<boolean> {
  // POP: HMAC-SHA256. Fallback MD5 untuk kompatibilitas callback Duitku klasik (jika ada).
  const hmac = await hmacSha256Hex(
    merchantCode + amount + merchantOrderId,
    env.DUITKU_API_KEY
  )
  if (hmac.toLowerCase() === signature.toLowerCase()) return true
  const md5 = await md5Hex(merchantCode + amount + merchantOrderId + env.DUITKU_API_KEY)
  return md5.toLowerCase() === signature.toLowerCase()
}

// MD5 minimal (untuk kompatibilitas callback Duitku klasik) — implementasi murni JS.
async function md5Hex(str: string): Promise<string> {
  // Web Crypto tidak mendukung MD5; pakai implementasi ringkas.
  return md5(str)
}

/* eslint-disable */
function md5(s: string): string {
  function rl(n: number, c: number) { return (n << c) | (n >>> (32 - c)) }
  function au(x: number, y: number) {
    const l = (x & 0xffff) + (y & 0xffff)
    const m = (x >> 16) + (y >> 16) + (l >> 16)
    return (m << 16) | (l & 0xffff)
  }
  function cmn(q: number, a: number, b: number, x: number, sft: number, t: number) {
    return au(rl(au(au(a, q), au(x, t)), sft), b)
  }
  function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cmn((b & c) | (~b & d), a, b, x, s, t) }
  function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cmn((b & d) | (c & ~d), a, b, x, s, t) }
  function hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cmn(b ^ c ^ d, a, b, x, s, t) }
  function ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cmn(c ^ (b | ~d), a, b, x, s, t) }
  function tb(str: string) {
    const n = str.length, b: number[] = []
    for (let i = 0; i < n * 8; i += 8) b[i >> 5] |= (str.charCodeAt(i / 8) & 0xff) << (i % 32)
    return b
  }
  function rh(num: number) {
    let s = '', j
    for (j = 0; j <= 3; j++) s += ((num >> (j * 8 + 4)) & 0x0f).toString(16) + ((num >> (j * 8)) & 0x0f).toString(16)
    return s
  }
  function u8(str: string) {
    let o = '', i = -1, x, y
    while (++i < str.length) {
      x = str.charCodeAt(i); y = i + 1 < str.length ? str.charCodeAt(i + 1) : 0
      if (x >= 0xd800 && x <= 0xdbff && y >= 0xdc00 && y <= 0xdfff) { x = 0x10000 + ((x & 0x03ff) << 10) + (y & 0x03ff); i++ }
      if (x <= 0x7f) o += String.fromCharCode(x)
      else if (x <= 0x7ff) o += String.fromCharCode(0xc0 | ((x >>> 6) & 0x1f), 0x80 | (x & 0x3f))
      else if (x <= 0xffff) o += String.fromCharCode(0xe0 | ((x >>> 12) & 0x0f), 0x80 | ((x >>> 6) & 0x3f), 0x80 | (x & 0x3f))
      else o += String.fromCharCode(0xf0 | ((x >>> 18) & 0x07), 0x80 | ((x >>> 12) & 0x3f), 0x80 | ((x >>> 6) & 0x3f), 0x80 | (x & 0x3f))
    }
    return o
  }
  const str = u8(s)
  const x = tb(str); let a = 1732584193, b = -271733879, c = -1732584194, d = 271733878
  x[str.length >> 2] |= 0x80 << (str.length % 4 << 3)
  x[(((str.length + 8) >> 6) << 4) + 14] = str.length * 8
  for (let i = 0; i < x.length; i += 16) {
    const oa = a, ob = b, oc = c, od = d
    a = ff(a, b, c, d, x[i], 7, -680876936); d = ff(d, a, b, c, x[i + 1], 12, -389564586); c = ff(c, d, a, b, x[i + 2], 17, 606105819); b = ff(b, c, d, a, x[i + 3], 22, -1044525330)
    a = ff(a, b, c, d, x[i + 4], 7, -176418897); d = ff(d, a, b, c, x[i + 5], 12, 1200080426); c = ff(c, d, a, b, x[i + 6], 17, -1473231341); b = ff(b, c, d, a, x[i + 7], 22, -45705983)
    a = ff(a, b, c, d, x[i + 8], 7, 1770035416); d = ff(d, a, b, c, x[i + 9], 12, -1958414417); c = ff(c, d, a, b, x[i + 10], 17, -42063); b = ff(b, c, d, a, x[i + 11], 22, -1990404162)
    a = ff(a, b, c, d, x[i + 12], 7, 1804603682); d = ff(d, a, b, c, x[i + 13], 12, -40341101); c = ff(c, d, a, b, x[i + 14], 17, -1502002290); b = ff(b, c, d, a, x[i + 15], 22, 1236535329)
    a = gg(a, b, c, d, x[i + 1], 5, -165796510); d = gg(d, a, b, c, x[i + 6], 9, -1069501632); c = gg(c, d, a, b, x[i + 11], 14, 643717713); b = gg(b, c, d, a, x[i], 20, -373897302)
    a = gg(a, b, c, d, x[i + 5], 5, -701558691); d = gg(d, a, b, c, x[i + 10], 9, 38016083); c = gg(c, d, a, b, x[i + 15], 14, -660478335); b = gg(b, c, d, a, x[i + 4], 20, -405537848)
    a = gg(a, b, c, d, x[i + 9], 5, 568446438); d = gg(d, a, b, c, x[i + 14], 9, -1019803690); c = gg(c, d, a, b, x[i + 3], 14, -187363961); b = gg(b, c, d, a, x[i + 8], 20, 1163531501)
    a = gg(a, b, c, d, x[i + 13], 5, -1444681467); d = gg(d, a, b, c, x[i + 2], 9, -51403784); c = gg(c, d, a, b, x[i + 7], 14, 1735328473); b = gg(b, c, d, a, x[i + 12], 20, -1926607734)
    a = hh(a, b, c, d, x[i + 5], 4, -378558); d = hh(d, a, b, c, x[i + 8], 11, -2022574463); c = hh(c, d, a, b, x[i + 11], 16, 1839030562); b = hh(b, c, d, a, x[i + 14], 23, -35309556)
    a = hh(a, b, c, d, x[i + 1], 4, -1530992060); d = hh(d, a, b, c, x[i + 4], 11, 1272893353); c = hh(c, d, a, b, x[i + 7], 16, -155497632); b = hh(b, c, d, a, x[i + 10], 23, -1094730640)
    a = hh(a, b, c, d, x[i + 13], 4, 681279174); d = hh(d, a, b, c, x[i], 11, -358537222); c = hh(c, d, a, b, x[i + 3], 16, -722521979); b = hh(b, c, d, a, x[i + 6], 23, 76029189)
    a = hh(a, b, c, d, x[i + 9], 4, -640364487); d = hh(d, a, b, c, x[i + 12], 11, -421815835); c = hh(c, d, a, b, x[i + 15], 16, 530742520); b = hh(b, c, d, a, x[i + 2], 23, -995338651)
    a = ii(a, b, c, d, x[i], 6, -198630844); d = ii(d, a, b, c, x[i + 7], 10, 1126891415); c = ii(c, d, a, b, x[i + 14], 15, -1416354905); b = ii(b, c, d, a, x[i + 5], 21, -57434055)
    a = ii(a, b, c, d, x[i + 12], 6, 1700485571); d = ii(d, a, b, c, x[i + 3], 10, -1894986606); c = ii(c, d, a, b, x[i + 10], 15, -1051523); b = ii(b, c, d, a, x[i + 1], 21, -2054922799)
    a = ii(a, b, c, d, x[i + 8], 6, 1873313359); d = ii(d, a, b, c, x[i + 15], 10, -30611744); c = ii(c, d, a, b, x[i + 6], 15, -1560198380); b = ii(b, c, d, a, x[i + 13], 21, 1309151649)
    a = ii(a, b, c, d, x[i + 4], 6, -145523070); d = ii(d, a, b, c, x[i + 11], 10, -1120210379); c = ii(c, d, a, b, x[i + 2], 15, 718787259); b = ii(b, c, d, a, x[i + 9], 21, -343485551)
    a = au(a, oa); b = au(b, ob); c = au(c, oc); d = au(d, od)
  }
  return rh(a) + rh(b) + rh(c) + rh(d)
}
/* eslint-enable */
