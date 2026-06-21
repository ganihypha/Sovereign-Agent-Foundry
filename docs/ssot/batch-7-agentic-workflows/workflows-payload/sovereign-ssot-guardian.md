---
description: |
  Penjaga konsistensi SSOT untuk Sovereign Agent Foundry. Berjalan saat ada
  perubahan pada skills/** atau docs/ssot/**, atau terjadwal mingguan. Mengecek
  drift antara skills/ (folder nyata) vs skills/INDEX.md (katalog) vs RESUME.md
  (klaim jumlah skill), lalu mengusulkan perbaikan lewat draft PR (bukan push
  langsung ke main). Murni dokumentasi — tidak menyentuh kode runtime/secret.
emoji: "🛡️"
labels: ["sovereign", "ssot", "docs", "automation"]
metadata:
  author: "Reza Estes / Haidar Faras + Gyss"
  version: "1.0.0"
  category: "governance"

on:
  push:
    paths:
      - "skills/**"
      - "docs/ssot/**"
      - "RESUME.md"
  schedule: weekly
  workflow_dispatch:

permissions:
  contents: read

imports:
  - shared/sovereign-guardrails.md

tools:
  edit:
  bash: ["ls", "wc", "grep", "find", "cat", "head"]
  github:
    lockdown: false

safe-outputs:
  mentions: false
  create-pull-request:
    title-prefix: "[ssot-guardian] "
    labels: [sovereign, ssot, docs]
    draft: true

timeout-minutes: 15
tracker-id: sovereign-ssot-guardian
strict: true
---

# 🛡️ Sovereign SSOT Guardian

Jaga agar **single source of truth** tetap konsisten. Patuhi
`shared/sovereign-guardrails.md`. Output WAJIB lewat **draft PR** (tidak langsung
ke `main`), karena perubahan dokumen tetap perlu review owner.

## Yang dicek (drift detection)

1. **Jumlah skill** — `ls -1 skills/ | grep -c '^sovereign-'` vs angka yang
   diklaim di `RESUME.md` ("**N skill**") dan `skills/INDEX.md`.
2. **Katalog vs folder** — setiap folder `skills/sovereign-*` harus tercatat di
   `skills/INDEX.md`; setiap entri INDEX harus punya folder nyata.
3. **Tautan dokumen** — peta dokumen di `RESUME.md` menunjuk ke file yang benar
   ada di `docs/ssot/**`.
4. **Batch terbaru** — bagian "STATE TERAKHIR" di `RESUME.md` menyebut batch doc
   tertinggi yang ada di `docs/ssot/` (mis. `batch-7-...`).

## Jika ada drift

- Buat **draft PR** yang memperbaiki angka/tautan/katalog yang salah, dengan
  diff minimal dan deskripsi jelas (apa yang drift, kenapa, koreksinya).
- JANGAN mengarang skill/dokumen baru — hanya selaraskan klaim dengan kenyataan.

## Jika tidak ada drift

- Jangan buat PR. Cukup berhenti (no-op) agar hemat credit.

## Proses

1. Jalankan pengecekan via bash read-only (`ls`, `grep`, `find`, `wc`, `cat`).
2. Bandingkan kenyataan vs klaim.
3. Bila drift → buat draft PR perbaikan. Bila bersih → no-op.
