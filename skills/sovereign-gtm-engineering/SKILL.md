---
name: sovereign-gtm-engineering
version: 2.0.0
description: >-
  SparkMind Sovereign GTM engineering — pola teknis untuk landing/
  waitlist/pricing Indonesia-first di Hono + Cloudflare Pages: lead
  capture ke D1 (+ consent PDP), SEO/OG/JSON-LD, sitemap/robots,
  funnel katalog→checkout, dan instrumentasi metrik. Dipakai di FASE
  1-2 fullstack-cycle untuk project bermuatan GTM. Trigger: "landing",
  "waitlist", "pricing page", "lead capture", "GTM engineering",
  "SEO setup", "funnel".
metadata:
  category: gtm
  skill_category: "ci-cd-deployment"
  owner: "Reza Estes / Haidar Faras + Gyss (spousal 50/50)"
  doctrine: "MASTER-ARCHITECT-PROMPT v5.0 + v7.0 + v8.0 OVERRIDE-LOCK · D-1 Truth-Lock"
  requires:
    bins: ["npm", "npx", "wrangler"]
    tools: []
  related_skills:
    - sovereign-fullstack-cycle
    - sovereign-enterprise-patterns
    - sovereign-squad-marketing
---

# sovereign-gtm-engineering

Sisi **engineering** dari go-to-market: mengubah arah CMO/GTM-DOC jadi
halaman yang menangkap permintaan & lead, hemat (Rp 0, CF-native),
patuh PDP. Pasangan teknis dari `sovereign-squad-marketing`.

## Komponen GTM (pola implementasi)

### 1. Lead capture → D1 (+ consent)
```sql
CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT, email TEXT NOT NULL, whatsapp TEXT,
  need TEXT, kind TEXT,                 -- waitlist|done-for-you|partner
  consent INTEGER DEFAULT 0,            -- PDP UU 27/2022
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```
- Endpoint `POST /api/intake` → validasi → simpan. Checkbox consent
  WAJIB (PDP); tanpa consent = tolak.
- JANGAN simpan data sensitif berlebih (data minimization).

### 2. SEO / discoverability (tiap halaman publik)
- `<title>` + meta description Bahasa.
- OG/Twitter meta + OG image (SVG via Worker, hemat).
- JSON-LD (Organization/Product) di `<head>`.
- `robots.txt` + `sitemap.xml` route.

### 3. Funnel
- Awareness (landing) → katalog → product → checkout (Duitku) →
  order status/license. Setiap langkah punya CTA tunggal.
- Pricing page: harga IDR jelas + disclosure MoR Oasis BI Pro.

### 4. Instrumentasi metrik (selaras B3-01 Metrik AaaS)
- Catat event kunci (intake, checkout-start, paid) ke D1 — sumber
  kebenaran funnel. Hindari tracker pihak-ketiga berat/berbayar.

## DEFINITION OF DONE
- [ ] `/api/intake` simpan lead + consent (PDP) — terverifikasi curl
- [ ] SEO lengkap (title/meta/OG/JSON-LD/sitemap/robots) per halaman
- [ ] Harga IDR + disclosure MoR di pricing/checkout
- [ ] Funnel event tercatat ke D1
- [ ] Build hijau + lewat `sovereign-verify-rubric`

## KPI
Lead capture rate · konversi katalog→checkout→bayar · SEO impressions
· CAC (≈Rp 0).

## HITL TRIGGERS
- Copy/klaim publik baru (→ CMO + truth-lock).
- Apa pun yang menyentuh pembayaran/harga (→ CFO).

## GUARDRAILS
- PDP UU 27/2022: consent + opt-out + data minimization WAJIB.
- ZERO token di frontend (lihat `sovereign-enterprise-patterns`).
- D-1 Truth-Lock pada semua klaim landing.

## Out of scope
- Produksi konten/copy → `sovereign-squad-marketing`.
- Hardening keamanan penuh → `sovereign-enterprise-patterns` / zero-trust.
