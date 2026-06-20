// SPARKMIND-OBP — Email license delivery (T3, SSOT batch 11 §3 / batch 12 T3)
// Via Resend REST API (Cloudflare Workers compatible — fetch only, NO Node SDK).
// Env-gated: jika RESEND_API_KEY tidak diset, fungsi menjadi no-op aman
// (tidak menggagalkan webhook). Secret WAJIB lewat `wrangler pages secret put RESEND_API_KEY`.

import type { Bindings } from '../types'

export interface LicenseEmailParams {
  to: string
  productName: string
  merchantOrderId: string
  licenseToken: string
  baseUrl: string
}

export interface EmailResult {
  ok: boolean
  skipped?: boolean
  id?: string
  error?: string
}

// Kirim email lisensi + tautan unduh ke pembeli setelah pembayaran `paid`.
export async function sendLicenseEmail(
  env: Bindings,
  p: LicenseEmailParams
): Promise<EmailResult> {
  const apiKey = env.RESEND_API_KEY
  if (!apiKey) return { ok: true, skipped: true } // no-op bila belum dikonfigurasi

  const from = env.RESEND_FROM || 'SparkMind <noreply@sparkmind-obp.pages.dev>'
  const downloadUrl = `${p.baseUrl}/download/${p.licenseToken}`
  const orderUrl = `${p.baseUrl}/orders`

  const html = `
  <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;color:#0f172a">
    <h2 style="color:#4f46e5">Terima kasih atas pembelian Anda 🎉</h2>
    <p>Pesanan <b>${p.merchantOrderId}</b> untuk <b>${p.productName}</b> telah <b>LUNAS</b>.</p>
    <p>Akses unduh Anda (berlaku beberapa kali unduh):</p>
    <p><a href="${downloadUrl}" style="display:inline-block;background:#4f46e5;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600">Unduh Skill</a></p>
    <p style="font-size:13px;color:#475569">Atau cek pesanan kapan saja di <a href="${orderUrl}">${orderUrl}</a> menggunakan Merchant Order ID Anda.</p>
    <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0"/>
    <p style="font-size:12px;color:#94a3b8">Pembayaran diproses oleh Oasis BI Pro sebagai Merchant-of-Record untuk ekosistem SparkMind, melalui PJP Duitku yang terdaftar & diawasi Bank Indonesia.</p>
  </div>`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        to: [p.to],
        subject: `Lisensi & Unduhan — ${p.productName} (${p.merchantOrderId})`,
        html
      })
    })
    const data: any = await res.json().catch(() => ({}))
    if (res.ok) return { ok: true, id: data.id }
    return { ok: false, error: data?.message || `HTTP ${res.status}` }
  } catch (err) {
    return { ok: false, error: String(err) }
  }
}
