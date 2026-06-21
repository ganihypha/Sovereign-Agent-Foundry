import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'
import { Home, Catalog, Pricing, ProductDetail, ThankYou, About } from './views/pages'
import { OutcomeHome, SolutionsCatalog, SolutionDetail } from './views/solutions'
import {
  LegalHub, LegalPage, DoneForYou, Partner, OrderLookup, CheckoutOffer, SetupGuide
} from './views/extra'
import { PRODUCTS, findProduct } from './data/products'
import { BRANDS } from './data/brands'
import { findLegal, LEGAL_DOCS } from './data/legal'
import { findOffer, OFFER_AS_PRODUCT } from './data/offers'
import { SOLUTIONS, findSolution, SOLUTION_AS_PRODUCT } from './data/solutions'

// Engine checkout — gabungan SKU offer (bundle/founder-pass) + solusi (care-plan/ai-staff/course).
// Truth-Lock: hanya slug terdaftar di sini yang bisa checkout one-time/subscription.
const CHECKOUT_PRODUCTS: Record<string, { name: string; price_idr: number; brand: string }> = {
  ...OFFER_AS_PRODUCT,
  ...SOLUTION_AS_PRODUCT
}
import { getGateway } from './lib/gateway'
import { sendLicenseEmail } from './lib/email'
import { AdminDashboard, AdminLogin, DownloadPage, type AdminStats } from './views/admin'
import type { Bindings } from './types'

const app = new Hono<{ Bindings: Bindings }>()

// ── Security headers (production-grade hardening) ──
app.use('*', async (c, next) => {
  await next()
  c.header('X-Content-Type-Options', 'nosniff')
  c.header('X-Frame-Options', 'SAMEORIGIN')
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin')
  c.header('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
  c.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
})

app.use('/api/*', cors())
app.use('/webhook/*', cors())
app.use('/static/*', serveStatic({ root: './public' }))
app.use(renderer)

/* ───────────────────────── Pages (SSR) ───────────────────────── */
// ── Outcome Foundry (pivot Batch 4): landing & katalog publik = HASIL ──
app.get('/', (c) => c.render(<OutcomeHome />, { title: 'SparkMind — Bikin bisnismu otomatis & online' }))
app.get('/solutions', (c) => c.render(<SolutionsCatalog />, { title: 'Solusi · SparkMind' }))
app.get('/solutions/:slug', (c) => {
  const s = findSolution(c.req.param('slug'))
  if (!s) return c.notFound()
  return c.render(<SolutionDetail {...s} />, { title: `${s.name} · SparkMind` })
})

// ── Jalur developer (skill mentah = mesin) ──
app.get('/developers', (c) => c.render(<Catalog />, { title: 'Developer · 36 Sovereign Skill · SparkMind' }))
app.get('/foundry', (c) => c.render(<Home />, { title: 'Sovereign Agent Foundry (mesin) · SparkMind' }))
app.get('/catalog', (c) => c.redirect('/developers'))
app.get('/pricing', (c) => c.render(<Pricing />, { title: 'Harga · SparkMind' }))
app.get('/about', (c) => c.render(<About />, { title: 'Tentang · SparkMind' }))
app.get('/docs', (c) => c.redirect('/about'))
app.get('/thank-you', (c) => c.render(<ThankYou />, { title: 'Terima kasih · SparkMind' }))

app.get('/product/:slug', (c) => {
  const p = findProduct(c.req.param('slug'))
  if (!p) return c.notFound()
  return c.render(<ProductDetail {...p} />, { title: `${p.name} · SparkMind` })
})

/* ── Legal Hub (enterprise-grade compliance) ── */
app.get('/setup', (c) => c.render(<SetupGuide />, { title: 'Panduan Setup · SparkMind' }))
app.get('/legal', (c) => c.render(<LegalHub />, { title: 'Legal Hub · SparkMind' }))
app.get('/legal/:slug', (c) => {
  const d = findLegal(c.req.param('slug'))
  if (!d) return c.notFound()
  return c.render(<LegalPage {...d} />, { title: `${d.title} · SparkMind` })
})

/* ── Offers: checkout bundle / Founder Pass ── */
app.get('/checkout/:slug', (c) => {
  const slug = c.req.param('slug')
  // Offer terdaftar (punya view kaya) → render CheckoutOffer.
  const o = findOffer(slug)
  if (o && OFFER_AS_PRODUCT[o.slug]) {
    return c.render(<CheckoutOffer {...o} />, { title: `${o.name} · SparkMind` })
  }
  // SKU solusi (care-plan/ai-staff/course/template) → checkout generik via SetupGuide-less form.
  const sku = CHECKOUT_PRODUCTS[slug]
  if (sku) {
    return c.render(<CheckoutOffer {...{
      slug,
      name: sku.name,
      tagline: 'Pembayaran aman via Merchant-of-Record (Oasis BI Pro) lewat Duitku.',
      model: 'one-time' as const,
      price_idr: sku.price_idr,
      priceLabel: 'Rp ' + sku.price_idr.toLocaleString('id-ID'),
      features: ['Akses solusi setelah pembayaran terkonfirmasi', 'Bayar pakai QRIS / VA / e-wallet', 'Faktur & konfirmasi via email'],
      cta: 'Bayar Sekarang',
      ctaHref: `/checkout/${slug}`
    }} />, { title: `${sku.name} · SparkMind` })
  }
  return c.notFound()
})

/* ── High-ticket & partner & buyer dashboard ── */
app.get('/done-for-you', (c) => c.render(<DoneForYou />, { title: 'Done-for-You · SparkMind' }))
app.get('/partner', (c) => c.render(<Partner />, { title: 'Partner · SparkMind' }))
app.get('/orders', (c) => c.render(<OrderLookup />, { title: 'Cek Pesanan · SparkMind' }))

/* ───────────────────────── API ───────────────────────── */
app.get('/api/products', (c) => c.json({ count: PRODUCTS.length, products: PRODUCTS }))

app.get('/api/product/:slug', (c) => {
  const p = findProduct(c.req.param('slug'))
  return p ? c.json(p) : c.json({ error: 'not_found' }, 404)
})

app.get('/api/brands', (c) => c.json(BRANDS))

// Checkout → buat order + Duitku inquiry
app.post('/api/checkout', async (c) => {
  const { env } = c
  let body: any
  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: 'invalid_json' }, 400)
  }
  const { slug, email, name } = body ?? {}
  if (!slug || !email || !name) return c.json({ error: 'missing_fields' }, 400)

  // Produk satuan (skill) ATAU offer/solusi (bundle/founder-pass/care-plan/ai-staff/course)
  const offer = CHECKOUT_PRODUCTS[slug]
  const product = offer
    ? { name: offer.name, price_idr: offer.price_idr, brand: offer.brand }
    : findProduct(slug)
  if (!product) return c.json({ error: 'product_not_found' }, 404)

  const merchantOrderId = `OBP-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

  // simpan customer & order (pending)
  await env.DB.prepare(
    `INSERT OR IGNORE INTO customers (email, name) VALUES (?, ?)`
  ).bind(email, name).run()

  await env.DB.prepare(
    `INSERT INTO orders (customer_email, product_slug, status, duitku_merchant_order_id, payment_amount_idr)
     VALUES (?, ?, 'pending', ?, ?)`
  ).bind(email, slug, merchantOrderId, product.price_idr).run()

  const gateway = getGateway(env)
  const inquiry = await gateway.createInvoice(env, {
    merchantOrderId,
    paymentAmount: product.price_idr,
    productDetails: `SparkMind — ${product.name}`,
    email,
    customerName: name
  })

  if (!inquiry.ok) {
    await env.DB.prepare(
      `UPDATE orders SET status='failed', updated_at=CURRENT_TIMESTAMP WHERE duitku_merchant_order_id=?`
    ).bind(merchantOrderId).run()
    return c.json(
      { error: 'duitku_failed', message: inquiry.statusMessage, merchantOrderId },
      502
    )
  }

  await env.DB.prepare(
    `UPDATE orders SET duitku_reference=?, payment_url=?, updated_at=CURRENT_TIMESTAMP
     WHERE duitku_merchant_order_id=?`
  ).bind(inquiry.reference ?? null, inquiry.paymentUrl ?? null, merchantOrderId).run()

  return c.json({
    ok: true,
    merchantOrderId,
    reference: inquiry.reference,
    paymentUrl: inquiry.paymentUrl
  })
})

// Cek status order (+ license token & sisa unduhan untuk buyer dashboard)
app.get('/api/order/:moid', async (c) => {
  const row: any = await c.env.DB.prepare(
    `SELECT o.id, o.customer_email, o.product_slug, o.status, o.duitku_merchant_order_id,
            o.duitku_reference, o.payment_amount_idr, o.payment_url, o.created_at,
            l.token AS license_token, l.download_count, l.max_downloads
     FROM orders o
     LEFT JOIN licenses l ON l.order_id = o.id
     WHERE o.duitku_merchant_order_id=?`
  ).bind(c.req.param('moid')).first()
  if (!row) return c.json({ error: 'not_found' }, 404)
  const downloads_remaining =
    row.license_token != null
      ? Math.max(0, (row.max_downloads ?? 0) - (row.download_count ?? 0))
      : null
  return c.json({ ...row, downloads_remaining })
})

// Waitlist
app.post('/api/waitlist', async (c) => {
  const { email, slug } = await c.req.json().catch(() => ({}))
  if (!email) return c.json({ error: 'missing_email' }, 400)
  await c.env.DB.prepare(`INSERT INTO waitlist (email, product_slug) VALUES (?, ?)`)
    .bind(email, slug ?? null).run()
  return c.json({ ok: true })
})

// Lead intake (Done-for-You / Partner / MoR-aaS)
app.post('/api/intake', async (c) => {
  const { name, email, wa, need, kind } = await c.req.json().catch(() => ({}))
  if (!email || !need) return c.json({ error: 'missing_fields' }, 400)
  await c.env.DB.prepare(
    `INSERT INTO leads (name, email, whatsapp, need, kind) VALUES (?, ?, ?, ?, ?)`
  ).bind(name ?? null, email, wa ?? null, need, kind ?? 'done-for-you').run()
  return c.json({ ok: true })
})

/* ──────────────── Webhook Duitku (callback) ──────────────── */
app.post('/webhook/duitku', async (c) => {
  const { env } = c
  const form = await c.req.parseBody().catch(() => ({} as Record<string, string>))
  const merchantCode = String(form.merchantCode ?? '')
  const amount = String(form.amount ?? '')
  const merchantOrderId = String(form.merchantOrderId ?? '')
  const signature = String(form.signature ?? '')
  const resultCode = String(form.resultCode ?? '')
  const reference = String(form.reference ?? '')

  // simpan event mentah
  await env.DB.prepare(
    `INSERT INTO webhook_events (provider, merchant_order_id, payload) VALUES ('duitku', ?, ?)`
  ).bind(merchantOrderId, JSON.stringify(form)).run()

  const gateway = getGateway(env)
  const valid = await gateway.verifyCallback(env, {
    merchantCode, amount, merchantOrderId, signature
  })
  if (!valid) return c.text('Invalid signature', 400)

  if (resultCode === '00') {
    await env.DB.prepare(
      `UPDATE orders SET status='paid', duitku_reference=?, updated_at=CURRENT_TIMESTAMP
       WHERE duitku_merchant_order_id=?`
    ).bind(reference, merchantOrderId).run()

    const order: any = await env.DB.prepare(
      `SELECT id, product_slug, payment_amount_idr FROM orders WHERE duitku_merchant_order_id=?`
    ).bind(merchantOrderId).first()

    if (order) {
      const token = crypto.randomUUID().replace(/-/g, '')
      await env.DB.prepare(
        `INSERT INTO licenses (order_id, product_slug, token) VALUES (?, ?, ?)`
      ).bind(order.id, order.product_slug, token).run()

      const prod = findProduct(order.product_slug)
      await env.DB.prepare(
        `INSERT INTO brand_ledger (order_id, brand, gross_idr, note) VALUES (?, ?, ?, 'duitku settlement')`
      ).bind(order.id, prod?.brand ?? 'sparkmind', order.payment_amount_idr).run()

      // Email lisensi otomatis (T3) — env-gated, no-op bila RESEND_API_KEY belum diset.
      const buyer: any = await env.DB.prepare(
        `SELECT customer_email FROM orders WHERE id=?`
      ).bind(order.id).first()
      if (buyer?.customer_email) {
        const offer = CHECKOUT_PRODUCTS[order.product_slug]
        const productName = offer ? offer.name : (prod?.name ?? order.product_slug)
        const baseUrl = new URL(c.req.url).origin
        // jangan blokir respons callback bila email gagal — best-effort
        await sendLicenseEmail(env, {
          to: buyer.customer_email,
          productName,
          merchantOrderId,
          licenseToken: token,
          baseUrl
        }).catch(() => null)
      }
    }
  } else {
    await env.DB.prepare(
      `UPDATE orders SET status='failed', updated_at=CURRENT_TIMESTAMP WHERE duitku_merchant_order_id=?`
    ).bind(merchantOrderId).run()
  }

  await env.DB.prepare(
    `UPDATE webhook_events SET processed=1 WHERE merchant_order_id=?`
  ).bind(merchantOrderId).run()

  return c.text('OK')
})

// Download (validasi token lisensi)
app.get('/api/download/:token', async (c) => {
  const token = c.req.param('token')
  const lic: any = await c.env.DB.prepare(
    `SELECT id, product_slug, download_count, max_downloads FROM licenses WHERE token=?`
  ).bind(token).first()
  if (!lic) return c.json({ error: 'invalid_token' }, 404)
  if (lic.download_count >= lic.max_downloads)
    return c.json({ error: 'download_limit_reached' }, 403)

  await c.env.DB.prepare(
    `UPDATE licenses SET download_count = download_count + 1 WHERE id=?`
  ).bind(lic.id).run()

  const prod = findProduct(lic.product_slug)
  // File biner skill di-host sebagai static asset di /downloads/<file_key>.
  // Endpoint ini memvalidasi lisensi lalu mengembalikan URL unduhan REAL + panduan setup.
  const origin = new URL(c.req.url).origin
  const fileKey = prod?.file_key
  const downloadUrl = fileKey ? `${origin}/static/downloads/${fileKey}` : null
  return c.json({
    ok: true,
    product_slug: lic.product_slug,
    product_name: prod?.name,
    file: fileKey,
    download_url: downloadUrl,
    setup_guide_url: `${origin}/setup`,
    downloads_remaining: lic.max_downloads - lic.download_count - 1
  })
})

app.get('/api/health', (c) =>
  c.json({ status: 'ok', service: 'sparkmind-obp', products: PRODUCTS.length })
)

/* ───────────────── AI Orchestration gateway (A2A) — /api/orchestrate ─────────────────
 * Edge gateway untuk backend orchestrator di HF Space yang menyatukan
 * LangChain (tools) + LangGraph (state machine + HITL) + CrewAI (multi-agent).
 *
 * Peran gateway (sesuai doctrine Sovereign):
 *  1) PROXY  — teruskan {objective} ke ORCH_URL/orchestrate.
 *  2) HITL GATE — deteksi tugas sensitif (payment/legal/customer/secret/deploy).
 *     Jika sensitif & approver TIDAK menyertakan ORCH_HITL_TOKEN yang benar →
 *     tolak dengan 202 {status:"hitl_required"} (manusia harus approve).
 *     Jika token benar → kirim force_approve:true ke orchestrator.
 *  3) GRACEFUL — jika ORCH_URL belum diset → 503 informatif (bukan crash).
 */
const HITL_TRIGGERS = [
  'bayar', 'payment', 'transfer', 'legal', 'kontrak', 'contract',
  'kirim email', 'send email', 'delete', 'hapus', 'secret', 'api key',
  'deploy prod', 'production', 'refund', 'invoice'
]
function orchestrateNeedsHITL(objective: string): boolean {
  const o = (objective || '').toLowerCase()
  return HITL_TRIGGERS.some((t) => o.includes(t))
}

app.post('/api/orchestrate', async (c) => {
  const base = c.env.ORCH_URL
  if (!base) {
    return c.json({
      status: 'unavailable',
      error: 'ORCH_URL belum diset. Set secret ke HF Space orchestrator.',
      hint: 'wrangler pages secret put ORCH_URL  → https://elmatador0197-ai-orchestrationl.hf.space'
    }, 503)
  }

  let body: any = {}
  try { body = await c.req.json() } catch { /* ignore */ }
  const objective: string = (body?.objective || '').toString().trim()
  if (!objective) return c.json({ status: 'error', error: 'objective wajib diisi' }, 400)

  // ── HITL gate (edge) ──
  const sensitive = orchestrateNeedsHITL(objective)
  const provided = c.req.header('x-hitl-token') || body?.hitl_token || ''
  const approverOk = !!c.env.ORCH_HITL_TOKEN && provided === c.env.ORCH_HITL_TOKEN
  if (sensitive && !approverOk) {
    return c.json({
      status: 'hitl_required',
      message: 'Tugas terdeteksi sensitif — butuh approval manusia.',
      objective,
      how_to_approve: 'Kirim ulang dengan header x-hitl-token: <ORCH_HITL_TOKEN>'
    }, 202)
  }

  // ── Proxy ke orchestrator ──
  const headers: Record<string, string> = { 'content-type': 'application/json' }
  if (c.env.ORCH_API_KEY) headers['authorization'] = `Bearer ${c.env.ORCH_API_KEY}`
  try {
    const resp = await fetch(`${base.replace(/\/+$/, '')}/orchestrate`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ objective, force_approve: sensitive ? true : null })
    })
    const data = await resp.json().catch(() => ({}))
    return c.json({ status: 'ok', gateway: 'sparkmind-edge', hitl: sensitive ? 'approved' : 'auto', result: data }, resp.status as any)
  } catch (e: any) {
    return c.json({ status: 'error', error: `orchestrator unreachable: ${e?.message || e}` }, 502)
  }
})

// Status ringkas orchestrator (proxy health)
app.get('/api/orchestrate/health', async (c) => {
  const base = c.env.ORCH_URL
  if (!base) return c.json({ status: 'unavailable', reason: 'ORCH_URL unset' }, 503)
  try {
    const resp = await fetch(`${base.replace(/\/+$/, '')}/health`)
    return c.json({ status: 'ok', upstream: await resp.json().catch(() => ({})) })
  } catch (e: any) {
    return c.json({ status: 'error', error: `${e?.message || e}` }, 502)
  }
})

/* ── Download page (UX) — /download/:token render halaman, /api/download/:token JSON ── */
app.get('/download/:token', (c) =>
  c.render(<DownloadPage token={c.req.param('token')} />, { title: 'Unduh · SparkMind' })
)

/* ───────────────────────── Admin dashboard (T10) ───────────────────────── */
// Proteksi: ADMIN_TOKEN via ?token= atau header x-admin-token. Bila ADMIN_TOKEN
// belum diset → tampilkan login (tidak membocorkan data).
function adminAuthorized(c: any): boolean {
  const expected = c.env.ADMIN_TOKEN
  if (!expected) return false
  const provided = c.req.query('token') || c.req.header('x-admin-token') || ''
  return provided === expected
}

app.get('/admin', async (c) => {
  if (!adminAuthorized(c)) {
    return c.render(<AdminLogin />, { title: 'Admin · SparkMind' })
  }
  const { DB } = c.env

  const o: any = await DB.prepare(
    `SELECT
       COUNT(*) AS total,
       SUM(CASE WHEN status='paid' THEN 1 ELSE 0 END) AS paid,
       SUM(CASE WHEN status='pending' THEN 1 ELSE 0 END) AS pending,
       SUM(CASE WHEN status='failed' THEN 1 ELSE 0 END) AS failed,
       SUM(CASE WHEN status='paid' THEN payment_amount_idr ELSE 0 END) AS revenue
     FROM orders`
  ).first()

  const lic: any = await DB.prepare(`SELECT COUNT(*) AS n FROM licenses`).first()
  const ld: any = await DB.prepare(
    `SELECT COUNT(*) AS total, SUM(CASE WHEN status='new' THEN 1 ELSE 0 END) AS fresh FROM leads`
  ).first()

  const recentOrders = (await DB.prepare(
    `SELECT duitku_merchant_order_id, product_slug, status, payment_amount_idr, customer_email, created_at
     FROM orders ORDER BY id DESC LIMIT 12`
  ).all()).results as any[]

  const recentLeads = (await DB.prepare(
    `SELECT name, email, kind, status, created_at FROM leads ORDER BY id DESC LIMIT 12`
  ).all()).results as any[]

  const ledger = (await DB.prepare(
    `SELECT brand, SUM(gross_idr) AS gross_idr, COUNT(*) AS n
     FROM brand_ledger GROUP BY brand ORDER BY gross_idr DESC`
  ).all()).results as any[]

  const stats: AdminStats = {
    orders: {
      total: o?.total ?? 0, paid: o?.paid ?? 0,
      pending: o?.pending ?? 0, failed: o?.failed ?? 0
    },
    revenue_idr: o?.revenue ?? 0,
    licenses: lic?.n ?? 0,
    leads: { total: ld?.total ?? 0, new: ld?.fresh ?? 0 },
    recentOrders: recentOrders ?? [],
    recentLeads: recentLeads ?? [],
    ledgerByBrand: (ledger ?? []).map((r) => ({
      brand: r.brand ?? 'unknown', gross_idr: r.gross_idr ?? 0, n: r.n ?? 0
    }))
  }
  return c.render(<AdminDashboard {...stats} />, { title: 'Admin · SparkMind' })
})

// JSON stats (programmatic) — proteksi sama
app.get('/api/admin/stats', async (c) => {
  if (!adminAuthorized(c)) return c.json({ error: 'unauthorized' }, 401)
  const o: any = await c.env.DB.prepare(
    `SELECT COUNT(*) AS total,
       SUM(CASE WHEN status='paid' THEN 1 ELSE 0 END) AS paid,
       SUM(CASE WHEN status='paid' THEN payment_amount_idr ELSE 0 END) AS revenue
     FROM orders`
  ).first()
  return c.json({ ok: true, orders_total: o?.total ?? 0, orders_paid: o?.paid ?? 0, revenue_idr: o?.revenue ?? 0 })
})

/* ── SEO: robots.txt + sitemap.xml (dominasi kategori = ditemukan) ── */
app.get('/robots.txt', (c) =>
  c.text(
    `User-agent: *\nAllow: /\nSitemap: https://sparkmind-obp.pages.dev/sitemap.xml\n`
  )
)

app.get('/sitemap.xml', (c) => {
  const base = 'https://sparkmind-obp.pages.dev'
  const staticUrls = [
    '/', '/solutions', '/developers', '/foundry', '/pricing', '/about', '/done-for-you', '/partner', '/orders', '/setup', '/legal',
    ...LEGAL_DOCS.map((d) => `/legal/${d.slug}`),
    '/checkout/all-access-bundle', '/checkout/founder-pass'
  ]
  const solutionUrls = SOLUTIONS.map((s) => `/solutions/${s.slug}`)
  const productUrls = PRODUCTS.map((p) => `/product/${p.slug}`)
  const urls = [...staticUrls, ...solutionUrls, ...productUrls]
    .map((u) => `  <url><loc>${base}${u}</loc></url>`)
    .join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`
  return c.body(xml, 200, { 'Content-Type': 'application/xml' })
})

// Favicon inline (SVG) — hindari 500 dari route yang tidak ada handler.
app.get('/favicon.ico', (c) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#4f46e5"/><text x="32" y="44" font-size="38" font-family="system-ui,sans-serif" font-weight="800" fill="#fff" text-anchor="middle">S</text></svg>`
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'public, max-age=86400' } })
})

export default app
