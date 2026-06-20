---
name: sovereign-supabase-vault
version: 1.0.0
description: >-
  SparkMind Sovereign Supabase integration — pakai Supabase (Postgres
  + Auth + pgvector + Vault) sebagai layanan eksternal ketika butuh
  kapabilitas yang melampaui D1: auth penuh, relasi kompleks, RLS,
  embeddings/vector, atau secret vault. Diakses dari Cloudflare Worker
  via REST/PostgREST dengan service key disimpan sebagai secret. D1
  tetap default; Supabase hanya saat perlu. Trigger: "supabase",
  "postgres", "auth", "RLS", "pgvector", "vector db", "secret vault".
metadata:
  category: external
  skill_category: "infrastructure-operations"
  layer: L6-external
  owner: "Reza Estes / Haidar Faras + Gyss (spousal 50/50)"
  doctrine: "MASTER-ARCHITECT-PROMPT v5.0 + v7.0 + v8.0 OVERRIDE-LOCK · D-1 Truth-Lock"
  requires:
    runtime: "Cloudflare Worker (REST client) + Supabase free-tier"
    env: ["SUPABASE_URL", "SUPABASE_SERVICE_KEY", "SUPABASE_ANON_KEY"]
  related_skills:
    - sovereign-enterprise-patterns
    - sovereign-zero-trust
    - sovereign-langchain-tools
---

# sovereign-supabase-vault (L6 — Supabase on edge)

## ROLE
Lapisan data/lanjutan saat **D1 tidak cukup**. Supabase memberi
Postgres penuh (relasi kompleks, RLS), Auth (email/OAuth/magic-link),
pgvector (RAG/embeddings), dan Vault (secret). Diakses dari Worker
edge via REST (PostgREST/`supabase-js`), **bukan** koneksi TCP langsung.

## KAPAN PAKAI (D-1 Truth-Lock — D1 tetap default)
| Kebutuhan | Pakai |
|---|---|
| KV/relasional ringan, edge-native, Rp 0 | **D1** (default) |
| Auth penuh (OAuth, magic link, sesi) | Supabase Auth |
| Relasi kompleks, JOIN berat, RLS per-row | Supabase Postgres |
| Vector search / RAG embeddings | Supabase pgvector |
| Secret terkelola di luar wrangler | Supabase Vault |

Jangan migrasi dari D1 tanpa alasan di atas (hindari biaya & lock-in).

## AKSES DARI WORKER (pola aman)
```ts
// service key HANYA di server (Worker secret) — JANGAN ke frontend
const res = await fetch(`${env.SUPABASE_URL}/rest/v1/leads`, {
  method: 'POST',
  headers: {
    apikey: env.SUPABASE_SERVICE_KEY,
    Authorization: `Bearer ${env.SUPABASE_SERVICE_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  },
  body: JSON.stringify({ email, need, consent }),
})
```
- Frontend hanya boleh pakai `ANON_KEY` + RLS aktif. **SERVICE_KEY
  tidak pernah** menyentuh klien.
- RLS WAJIB ON untuk tiap tabel yang diakses anon.

## SECRETS
```bash
cd /home/user/webapp
npx wrangler pages secret put SUPABASE_URL
npx wrangler pages secret put SUPABASE_SERVICE_KEY
# .dev.vars (lokal, gitignored) untuk dev
```

## KPI
Latensi query · biaya (target free-tier) · 0 kebocoran service key ·
RLS coverage 100% tabel anon-accessible.

## HITL TRIGGERS
- Upgrade ke paid tier Supabase (default: DITOLAK → CFO + owner).
- Migrasi data dari D1 ke Supabase (irreversible-ish).
- Skema yang menyimpan PII baru (→ Legal-Compliance-ID + PDP).

## GUARDRAILS
- ZERO service key di frontend/repo (secret scan wajib — zero-trust).
- RLS ON sebelum expose anon key.
- PDP UU 27/2022 untuk PII; data minimization.
- D-1 Truth-Lock: ini layanan eksternal (bukan CF-native); pakai hanya
  saat D1 benar-benar tidak memadai.

## Out of scope
- Storage edge default → D1/KV/R2.
- Agent tool-use yang memakai pgvector → `sovereign-langchain-tools`.
