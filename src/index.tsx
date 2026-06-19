import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'
import { Home, Catalog, Pricing, ProductDetail, ThankYou, About } from './views/pages'
import { PRODUCTS, findProduct } from './data/products'
import { BRANDS } from './data/brands'
import { createInquiry, verifyCallbackSignature } from './lib/duitku'
import type { Bindings } from './types'

const app = new Hono<{ Bindings: Bindings }>()

app.use('/api/*', cors())
app.use('/webhook/*', cors())
app.use('/static/*', serveStatic({ root: './public' }))
app.use(renderer)

/* ───────────────────────── Pages (SSR) ───────────────────────── */
app.get('/', (c) => c.render(<Home />, { title: 'SparkMind · Sovereign Agent Foundry' }))
app.get('/catalog', (c) => c.render(<Catalog />, { title: 'Katalog · SparkMind' }))
app.get('/pricing', (c) => c.render(<Pricing />, { title: 'Harga · SparkMind' }))
app.get('/about', (c) => c.render(<About />, { title: 'Tentang · SparkMind' }))
app.get('/docs', (c) => c.redirect('/about'))
app.get('/thank-you', (c) => c.render(<ThankYou />, { title: 'Terima kasih · SparkMind' }))

app.get('/product/:slug', (c) => {
  const p = findProduct(c.req.param('slug'))
  if (!p) return c.notFound()
  return c.render(<ProductDetail {...p} />, { title: `${p.name} · SparkMind` })
})

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

  const product = findProduct(slug)
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

  const inquiry = await createInquiry(env, {
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

// Cek status order
app.get('/api/order/:moid', async (c) => {
  const row = await c.env.DB.prepare(
    `SELECT customer_email, product_slug, status, duitku_merchant_order_id,
            duitku_reference, payment_amount_idr, payment_url, created_at
     FROM orders WHERE duitku_merchant_order_id=?`
  ).bind(c.req.param('moid')).first()
  return row ? c.json(row) : c.json({ error: 'not_found' }, 404)
})

// Waitlist
app.post('/api/waitlist', async (c) => {
  const { email, slug } = await c.req.json().catch(() => ({}))
  if (!email) return c.json({ error: 'missing_email' }, 400)
  await c.env.DB.prepare(`INSERT INTO waitlist (email, product_slug) VALUES (?, ?)`)
    .bind(email, slug ?? null).run()
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

  const valid = await verifyCallbackSignature(
    env, merchantCode, amount, merchantOrderId, signature
  )
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
  // Catatan: file biner skill di-host di R2/asset; di sini kembalikan metadata unduhan.
  return c.json({
    ok: true,
    product_slug: lic.product_slug,
    file: prod?.file_key,
    downloads_remaining: lic.max_downloads - lic.download_count - 1
  })
})

app.get('/api/health', (c) =>
  c.json({ status: 'ok', service: 'sparkmind-obp', products: PRODUCTS.length })
)

// Favicon inline (SVG) — hindari 500 dari route yang tidak ada handler.
app.get('/favicon.ico', (c) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#4f46e5"/><text x="32" y="44" font-size="38" font-family="system-ui,sans-serif" font-weight="800" fill="#fff" text-anchor="middle">S</text></svg>`
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'public, max-age=86400' } })
})

export default app
