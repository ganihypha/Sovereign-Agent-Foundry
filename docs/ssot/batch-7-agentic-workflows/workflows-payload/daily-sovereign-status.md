---
description: |
  Laporan status harian Sovereign Agent Foundry / SparkMind-OBP. Mengumpulkan
  aktivitas repo terbaru (issue, PR, commit, rilis), mengecek konsistensi
  RESUME.md + skills/INDEX.md, lalu membuat GitHub issue ringkas berisi: state
  terakhir, gap P0 terbuka (dari roadmap), dan next steps. Tujuan: continuity
  "boot instan" otomatis tanpa membakar credit untuk re-explain.
emoji: "🔱"
labels: ["sovereign", "status", "automation"]
metadata:
  author: "Reza Estes / Haidar Faras + Gyss"
  version: "1.0.0"
  category: "continuity"

on:
  schedule: daily
  workflow_dispatch:

permissions:
  contents: read
  issues: read
  pull-requests: read

imports:
  - shared/sovereign-guardrails.md

tools:
  github:
    lockdown: false
    min-integrity: none

safe-outputs:
  mentions: false
  create-issue:
    title-prefix: "[sovereign-status] "
    labels: [sovereign, status, daily]
    close-older-issues: true

timeout-minutes: 15
tracker-id: daily-sovereign-status
strict: true
---

# 🔱 Daily Sovereign Status — Continuity Report

Buat laporan status harian repo **Sovereign Agent Foundry / SparkMind-OBP** sebagai
GitHub issue. Patuhi `shared/sovereign-guardrails.md` (Truth-Lock + HITL + Indonesia-first).

## Yang harus dikumpulkan

1. **Aktivitas terbaru** — issue/PR/commit/rilis dalam 24 jam terakhir.
2. **State terakhir** — baca `RESUME.md` di root: ambil "STATE TERAKHIR", commit
   terakhir, dan daftar "Yang sudah selesai / LIVE".
3. **Gap P0 terbuka** — baca bagian "Yang BELUM (gap terbuka)" di `RESUME.md`
   dan `docs/ssot/12-TODO-ROADMAP-DOC.md`. Daftar tugas P0 (T1–T4) apa adanya.
4. **Konsistensi katalog** — cek apakah jumlah folder di `skills/` cocok dengan
   yang diklaim `skills/INDEX.md`. Jika beda, tandai sebagai "drift katalog".

## Format laporan (issue body)

- **Ringkasan 1 paragraf** state hari ini (jujur, Truth-Lock).
- **Tabel gap P0** (`#`, tugas, status, blocker).
- **Next steps** — 3 langkah teratas berikutnya (RICE, P0 dulu).
- **Catatan continuity** — kalimat boot 1-baris dari `RESUME.md`.

## Gaya

- Bahasa Indonesia, ringkas, hemat token.
- Emoji secukupnya (🔱 ✅ ❌ ⚠️).
- JANGAN merekomendasikan eksekusi aksi HITL (payment/legal/customer/secret) —
  cukup catat sebagai "butuh approval owner".

## Proses

1. Kumpulkan aktivitas repo.
2. Baca `RESUME.md`, `skills/INDEX.md`, `docs/ssot/12-TODO-ROADMAP-DOC.md`.
3. Susun laporan sesuai format di atas.
4. Buat 1 GitHub issue baru dengan temuan (via safe-outputs).
