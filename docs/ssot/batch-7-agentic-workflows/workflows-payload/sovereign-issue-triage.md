---
description: |
  Triase issue otomatis untuk Sovereign Agent Foundry. Saat issue dibuka (atau
  perintah /triage di komentar), agen membaca issue, mengklasifikasikan ke area
  (orchestration / edge-app / docs-ssot / skill / deploy / billing-HITL), memberi
  label saran, dan menulis komentar ringkas berisi rangkuman + langkah berikutnya.
  Item yang menyentuh uang/legal/customer/secret ditandai needs-human-approval.
emoji: "🏷️"
labels: ["sovereign", "triage", "automation"]
metadata:
  author: "Reza Estes / Haidar Faras + Gyss"
  version: "1.0.0"
  category: "ops"

on:
  issues:
    types: [opened, reopened]
  command:
    name: triage

permissions:
  contents: read
  issues: read
  pull-requests: read

imports:
  - shared/sovereign-guardrails.md

tools:
  github:
    lockdown: false

safe-outputs:
  mentions: false
  add-labels:
    allowed:
      - "area:orchestration"
      - "area:edge-app"
      - "area:docs-ssot"
      - "area:skill"
      - "area:deploy"
      - "needs-human-approval"
      - "priority:P0"
      - "priority:P1"
      - "priority:P2"
    max: 4
  add-comment:

timeout-minutes: 12
tracker-id: sovereign-issue-triage
strict: true
---

# 🏷️ Sovereign Issue Triage

Triase issue yang baru dibuka / di-reopen, atau saat ada perintah `/triage`.
Patuhi `shared/sovereign-guardrails.md`.

## Tugas

1. **Baca** judul + body issue.
2. **Klasifikasi area** (pilih 1 utama; boleh + sekunder):
   - `area:orchestration` — LangChain/LangGraph/CrewAI, A2A, `/api/orchestrate`, HF Space.
   - `area:edge-app` — Hono/Cloudflare Pages, D1, checkout Duitku, route web.
   - `area:docs-ssot` — dokumen `docs/ssot/**`, RESUME.md, INDEX.md.
   - `area:skill` — skill di `skills/**`.
   - `area:deploy` — wrangler, CF Pages, HF Spaces, secret/binding.
3. **Tentukan prioritas** (`priority:P0|P1|P2`) berdasar dampak ke DoD Sprint 1.
4. **HITL check** — jika issue menyangkut **pembayaran/uang, legal/kontrak, pesan
   customer, atau secret/kredensial**, WAJIB tambahkan label `needs-human-approval`
   dan tulis di komentar bahwa eksekusi menunggu approval owner.

## Output (komentar)

- 1 paragraf rangkuman issue (Bahasa Indonesia, Truth-Lock).
- Area + prioritas yang diberikan + alasan singkat.
- 1–3 langkah berikutnya yang konkret (tanpa mengeksekusi aksi HITL).
- Jika butuh approval: tulis blok **⚠️ HITL — menunggu approval owner**.

## Proses

1. Analisis issue.
2. Terapkan label via `add-labels` (maksimum 4).
3. Tulis komentar via `add-comment`.
