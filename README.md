# SPARKMIND-OBP — Sovereign Agent Foundry

## Project Overview
- **Name**: SPARKMIND-OBP-HYBRID v2.0
- **Goal**: Marketplace 36 *sovereign skill* agentik dengan **Oasis BI Pro (OBP)** sebagai **Merchant-of-Record (MoR)** untuk ekosistem SparkMind, gateway pembayaran **Duitku**.
- **Doctrine**: 4-Layer Hybrid Lock — Brand (SparkMind) · Merchant (Oasis BI Pro) · Domain (sub-brand) · Compliance (brand ledger).

## URLs
- **Production (Cloudflare Pages)**: https://sparkmind-obp.pages.dev
- **Dev (sandbox)**: https://3000-i3ni21v5yrnmyra7ze0gj-d0b9e1e2.sandbox.novita.ai
- **GitHub**: https://github.com/ganihypha/Sovereign-Agent-Foundry

## Tech Stack
Hono + Cloudflare Pages + D1 (SQLite) + TypeScript + TailwindCSS (CDN). 100% Cloudflare-Native.

## Currently Completed Features
- ✅ SSR landing, katalog (36 skill, 6 sub-brand), pricing, product detail, about, thank-you.
- ✅ Checkout → buat order pending + **Duitku POP `createInvoice` MODE PRODUCTION** (signature HMAC-SHA256 via header `x-duitku-signature`).
- ✅ Webhook `/webhook/duitku` — verifikasi signature POP (HMAC-SHA256 `merchantCode+amount+merchantOrderId` & fallback MD5), update order `paid`, mint license token, catat brand ledger.
- ✅ **Verified live**: checkout production menghasilkan `paymentUrl` ke `https://app-prod.duitku.com/redirect_checkout`.
- ✅ Download endpoint dengan validasi token & limit unduhan.
- ✅ D1 schema lengkap (customers, orders, licenses, webhook_events, waitlist, brand_ledger, **leads**).
- ✅ Disclosure MoR di footer & checkout (kepatuhan).
- ✅ **Legal Hub enterprise-grade** — Syarat & Ketentuan, Refund, Privasi (UU PDP No. 27/2022), Kepatuhan/MoR, + kontak support.
- ✅ **Monetisasi penuh** — All-Access Bundle (Rp 990k, anchor), Founder Pass (Rp 149k/bln, MRR), Done-for-You (jasa), Reseller/White-Label & MoR-aaS (partner).
- ✅ **Buyer dashboard** — `/orders` cek status + unduh ulang via Merchant Order ID.
- ✅ **Lead capture** — intake Done-for-You & Partner (`POST /api/intake` → tabel `leads`).
- ✅ **SEO/Discoverability** — OG/Twitter meta, JSON-LD (Organization), `robots.txt`, `sitemap.xml`, OG image.
- ✅ **SSOT canonical docs** disimpan di `docs/ssot/`:
  - **Batch 1 — Fondasi & Produk** (00–13): PRD, Design, Architect, Productionized, Monetization, Strategic, GTM, Runplaybook, Launch, Roadmap, Gap-Analysis.
  - **Batch 2 — Operasional** (`batch-2-operasional/`, B2-00..B2-05): runbooks per-fase, API spec agen, template prompt per role, sprint per session, master architect prompt per session.
  - **Batch 3 — Skala** (`batch-3-skala/`, B3-00..B3-03): metrik AaaS, playbook onboarding klien, runbook insiden.

## Functional Entry URIs
| Method | Path | Keterangan |
|---|---|---|
| GET | `/` | Landing |
| GET | `/catalog` | Katalog per sub-brand |
| GET | `/pricing` | Tiering harga IDR |
| GET | `/product/:slug` | Detail + form checkout |
| GET | `/about` `/docs` | Doctrine 4-layer |
| GET | `/thank-you` | Halaman return |
| GET | `/legal` | Legal Hub (index) |
| GET | `/legal/:slug` | `terms` · `refund` · `privacy` · `compliance` |
| GET | `/checkout/:slug` | `all-access-bundle` · `founder-pass` (offer checkout) |
| GET | `/done-for-you` | Halaman jasa + intake |
| GET | `/partner` | Reseller/White-label & MoR-aaS + intake |
| GET | `/orders` | Buyer dashboard (cek pesanan + unduh ulang) |
| GET | `/setup` | **Panduan setup & pakai skill (crystal-clear)** |
| GET | `/static/downloads/:file.zip` | **File skill ZIP (delivery produk)** |
| GET | `/robots.txt` `/sitemap.xml` | SEO |
| GET | `/api/products` | List 36 produk |
| GET | `/api/product/:slug` | Detail produk |
| GET | `/api/brands` | Metadata sub-brand |
| POST | `/api/checkout` | `{slug,name,email}` → `{paymentUrl}` (produk & offer) |
| GET | `/api/order/:moid` | Status order (+ `license_token`, `downloads_remaining`) |
| POST | `/api/waitlist` | `{email,slug}` |
| POST | `/api/intake` | `{name,email,wa,need,kind}` → lead |
| POST | `/webhook/duitku` | Callback Duitku (x-www-form-urlencoded) |
| GET | `/api/download/:token` | Unduh skill (validasi license) |
| GET | `/api/health` | Health check |

## Data Architecture
- **Storage**: Cloudflare D1 (`sparkmind-obp-production`).
- **Tabel**: `customers`, `orders`, `licenses`, `webhook_events`, `waitlist`, `brand_ledger`.
- **Flow pembayaran**: checkout → order(pending) → **Duitku POP createInvoice (PRODUCTION)** → redirect paymentUrl (`app-prod.duitku.com`) → user bayar → callback `/webhook/duitku` → order(paid) + mint license + ledger → unduh via token.

## Duitku POP — Integrasi PRODUCTION
- **Mode**: `DUITKU_ENV=production` (uang riil; BUKAN sandbox).
- **Merchant**: `D20919` (MoR: Oasis BI Pro).
- **Endpoint**: `https://api-prod.duitku.com/api/merchant/createInvoice`.
- **Signature createInvoice**: header `x-duitku-signature = HMAC_SHA256(merchantCode + timestamp, apiKey)`, `x-duitku-timestamp` (epoch ms), `x-duitku-merchantcode`.
- **Signature callback**: `HMAC_SHA256(merchantCode + amount + merchantOrderId, apiKey)`.

## Environment Variables (secrets)
`DUITKU_MERCHANT_CODE`, `DUITKU_API_KEY`, `DUITKU_ENV`, `DUITKU_CALLBACK_URL`, `DUITKU_RETURN_URL`.
Lokal: `.dev.vars` (gitignored). Production: `wrangler pages secret put`.

## User Guide
1. Buka `/catalog`, pilih skill, klik **Lihat & Beli**.
2. Isi nama + email, klik **Bayar via Duitku** → diarahkan ke halaman pembayaran.
3. Setelah bayar, Duitku callback → status `paid` → tautan unduhan diterbitkan.

## Development
```bash
npm install
npm run build
npm run db:migrate:local && npm run db:seed
pm2 start ecosystem.config.cjs    # http://localhost:3000
```

## Buyer Setup Guide (BARU — crystal-clear)
- ✅ **File skill REAL terkirim** — 38 sovereign skill di-bundle jadi ZIP di `public/static/downloads/` + **All-Access Bundle** (`all-access-bundle.zip`, 38 skill + panduan).
- ✅ Endpoint `/api/download/:token` kini mengembalikan **`download_url` REAL** (`/static/downloads/<file_key>`) + `setup_guide_url`.
- ✅ **Halaman `/setup`** — master super crystal-clear, cara setup & pakai skill (<10 menit, anti-error). Sumber: `docs/SETUP-GUIDE.md`.
- ✅ Folder `skills/` kanonik (38 SKILL.md) disertakan di repo sebagai source-of-truth produk.

## Features Not Yet Implemented
- Migrasi file skill dari static asset → **R2** (untuk skala & signed-URL kedaluwarsa).
- Pengiriman email otomatis (license link) — perlu integrasi REST (Resend/Mailgun).

## Recommended Next Steps
1. ✅ ~~D1 production + secrets Duitku production~~ (SELESAI).
2. ✅ ~~File skill terkirim sebagai ZIP + panduan setup buyer~~ (SELESAI — static asset).
3. Lakukan 1 transaksi nominal kecil live untuk validasi callback `paid` end-to-end.
4. (Skala) Pindahkan ZIP ke R2 + signed URL kedaluwarsa di `/api/download/:token`.
5. Bind custom domain (sparkmind.web.id / oasis-bi-pro.web.id) + update `DUITKU_CALLBACK_URL`/`DUITKU_RETURN_URL`.
6. Kirim email license otomatis (Resend/Mailgun via REST).

## Deployment
- **Platform**: Cloudflare Pages (akun BYOK: ganihypha@gmail.com)
- **Status**: ✅ **PRODUCTION LIVE** — https://sparkmind-obp.pages.dev
- **D1**: `sparkmind-obp-production` (`a50feb42-43b0-44df-9fbe-41b1343c948c`), migrations applied (remote).
- **Secrets**: DUITKU_* terpasang (encrypted) di environment production.
- **Last Updated**: 2026-06-20 (SSOT Batch 2 Operasional + Batch 3 Skala ditambahkan)
