# SPARKMIND-OBP — Sovereign Agent Foundry

## Project Overview
- **Name**: SPARKMIND-OBP-HYBRID v2.0
- **Goal**: Marketplace 36 *sovereign skill* agentik dengan **Oasis BI Pro (OBP)** sebagai **Merchant-of-Record (MoR)** untuk ekosistem SparkMind, gateway pembayaran **Duitku**.
- **Doctrine**: 4-Layer Hybrid Lock — Brand (SparkMind) · Merchant (Oasis BI Pro) · Domain (sub-brand) · Compliance (brand ledger).

## URLs
- **Production (Cloudflare Pages)**: https://sparkmind-obp.pages.dev
- **Dev (sandbox)**: https://3000-ikq7qdoruvzii9q8juyox-ad490db5.sandbox.novita.ai
- **GitHub**: https://github.com/ganihypha/Sovereign-Agent-Foundry

## Tech Stack
Hono + Cloudflare Pages + D1 (SQLite) + TypeScript + TailwindCSS (CDN). 100% Cloudflare-Native.

## Currently Completed Features
- ✅ SSR landing, katalog (36 skill, 6 sub-brand), pricing, product detail, about, thank-you.
- ✅ Checkout → buat order pending + **Duitku POP `createInvoice` MODE PRODUCTION** (signature HMAC-SHA256 via header `x-duitku-signature`).
- ✅ Webhook `/webhook/duitku` — verifikasi signature POP (HMAC-SHA256 `merchantCode+amount+merchantOrderId` & fallback MD5), update order `paid`, mint license token, catat brand ledger.
- ✅ **Verified live**: checkout production menghasilkan `paymentUrl` ke `https://app-prod.duitku.com/redirect_checkout`.
- ✅ Download endpoint dengan validasi token & limit unduhan.
- ✅ D1 schema lengkap (customers, orders, licenses, webhook_events, waitlist, brand_ledger).
- ✅ Disclosure MoR di footer & checkout (kepatuhan).

## Functional Entry URIs
| Method | Path | Keterangan |
|---|---|---|
| GET | `/` | Landing |
| GET | `/catalog` | Katalog per sub-brand |
| GET | `/pricing` | Tiering harga IDR |
| GET | `/product/:slug` | Detail + form checkout |
| GET | `/about` `/docs` | Doctrine 4-layer |
| GET | `/thank-you` | Halaman return |
| GET | `/api/products` | List 36 produk |
| GET | `/api/product/:slug` | Detail produk |
| GET | `/api/brands` | Metadata sub-brand |
| POST | `/api/checkout` | `{slug,name,email}` → `{paymentUrl}` |
| GET | `/api/order/:moid` | Status order |
| POST | `/api/waitlist` | `{email,slug}` |
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

## Features Not Yet Implemented
- File biner skill di R2 (saat ini endpoint download kembalikan metadata).
- Pengiriman email otomatis (license link) — perlu integrasi REST (Resend/Mailgun).
- Dashboard pembeli & admin.

## Recommended Next Steps
1. ✅ ~~D1 production + secrets Duitku production~~ (SELESAI).
2. Upload file skill ke R2, sambungkan ke `/api/download/:token`.
3. Lakukan 1 transaksi nominal kecil live untuk validasi callback `paid` end-to-end.
4. Bind custom domain (sparkmind.web.id / oasis-bi-pro.web.id) + update `DUITKU_CALLBACK_URL`/`DUITKU_RETURN_URL`.
5. Kirim email license otomatis (Resend/Mailgun via REST).

## Deployment
- **Platform**: Cloudflare Pages (akun BYOK: ganihypha@gmail.com)
- **Status**: ✅ **PRODUCTION LIVE** — https://sparkmind-obp.pages.dev
- **D1**: `sparkmind-obp-production` (`a50feb42-43b0-44df-9fbe-41b1343c948c`), migrations applied (remote).
- **Secrets**: DUITKU_* terpasang (encrypted) di environment production.
- **Last Updated**: 2026-06-19
