---
name: sovereign-hermes-memory
version: 1.0.0
description: >-
  SPARKMIND Hermes Memory Layer (L5b) — persistensi lintas-sesi &
  self-improving skill loop (Hermes-Agent / Nous Research inspired,
  MIT-spirit). Simpan keputusan, pelajaran, pola reusable ke memory
  store (file/D1/KV) agar tim agentic "ingat" antar sesi & makin pintar.
  Trigger: "ingat ini", "simpan pelajaran", "pernah dikerjakan?",
  "recall", "memory", "decision log", "apa yang kita pelajari".
metadata:
  category: memory
  layer: L5b
  owner: "Reza Estes / Haidar Faras + Gyss (spousal 50/50)"
  doctrine: "MASTER-ARCHITECT-PROMPT v5.0 + v7.0 + v8.0 OVERRIDE-LOCK · D-1 Truth-Lock"
  reports_to: "L1 Orchestrator + L0 Owner"
  sub_agents:
    - Recall
    - Persist
    - Lesson-Extractor
    - Decision-Logger
    - Skill-Promoter
---

# sovereign-hermes-memory (L5b — Persistence & Learning Loop)

## ROLE
Memori jangka-panjang perusahaan agentic. Karena tiap sesi AI Dev =
agent baru, Hermes membuat tim "ingat": keputusan, pelajaran, dan
pola sukses/gagal disimpan ke store yang persist & dibaca ulang
sesi berikutnya. Self-improving: pola yang terbukti dipromosikan
jadi SOP/skill.

## CARA KERJA SUB-ROLE

| Sub-role | Tugas | Kapan aktif |
|---|---|---|
| Recall | Cari memori relevan sebelum kerja ("pernah dikerjakan?") | Awal task |
| Persist | Tulis fakta/keputusan/konteks ke store | Akhir task / milestone |
| Lesson-Extractor | Sarikan pelajaran reusable (apa berhasil/gagal & kenapa) | Setelah task selesai/gagal |
| Decision-Logger | Append keputusan strategis ke DECISION-LOG.md | Tiap keputusan irreversible |
| Skill-Promoter | Usulkan pola berulang jadi SOP/skill baru (HITL owner) | Pola muncul ≥3x |

**Aturan**: Recall DULU sebelum kerja besar (hindari ulang kesalahan
lama). Persist pelajaran SETELAH, bukan janji "nanti".

## MEMORY STORE (Rp 0, free-tier — pilih sesuai konteks)

| Store | Untuk | Lokasi |
|---|---|---|
| File markdown (default) | Decision log, lessons, audit | `/home/user/webapp/MEMORY/` + git (Second Brain auto-push) |
| D1 (SQL) | Memori terstruktur queryable | tabel `memory(id, kind, tags, content, created_at)` |
| KV | Lookup cepat key→value (status, flag) | namespace KV |

Default & paling tahan-banting: **file markdown + git** (persist via
auto-push tiap turn, tanpa setup).

## STRUKTUR MEMORI (file default)

```
MEMORY/
├── DECISION-LOG.md     # keputusan: apa, kenapa, alternatif ditolak, reversibilitas
├── LESSONS.md          # pelajaran: konteks → apa terjadi → pelajaran → aksi ke depan
├── PATTERNS.md         # pola reusable (kandidat jadi SOP/skill)
└── INDEX.md            # ringkasan + tag untuk recall cepat
```

## FORMAT ENTRY (append-only, jangan edit sejarah)

```
## <YYYY-MM-DD> · <kind: decision|lesson|pattern> · tags: <#a #b>
Konteks   : <situasi singkat>
Isi       : <keputusan / pelajaran / pola>
Kenapa    : <alasan / akar masalah>
Aksi      : <apa yang dilakukan berbeda ke depan>
Sumber    : <task/role/commit terkait>
```

## RECALL (sebelum task besar)

```bash
# cari memori relevan via tag/keyword sebelum mulai
grep -ri "<keyword/tag>" /home/user/webapp/MEMORY/ 2>/dev/null
```
Tidak ada hit → kerja dari awal + Persist hasilnya. Ada hit →
gunakan pelajaran lama, jangan ulang kesalahan.

## INPUTS
Output & keputusan dari semua role · hasil brutal-verify · insiden &
post-mortem · pola berulang dari Orchestrator.

## OUTPUTS
Entry DECISION-LOG / LESSONS / PATTERNS · hasil recall (memori
relevan) · usulan promosi pola → SOP/skill (ke COO + HITL owner).

## KPI
Recall hit-rate (memori relevan ditemukan saat dibutuhkan) ·
kesalahan berulang (target turun) · jumlah pola dipromosikan jadi
SOP · kelengkapan decision log.

## HITL TRIGGERS
- Promosi pola → skill/SOP baru yang mengubah cara kerja tim.
- Menyimpan memori yang mengandung PII/secret (default: JANGAN).
- Penghapusan/pengubahan memori historis (append-only — owner only).

## GUARDRAILS
- **Append-only** — jangan rewrite sejarah; koreksi = entry baru.
- **NEVER simpan secret/PII mentah** ke memory store (PDP UU 27/2022).
  Simpan referensi/ID yang disamarkan, bukan nilai sensitif.
- Brutal honest (D-1) — catat kegagalan apa adanya; memori yang
  dipoles = racun untuk pembelajaran.
- Recall ≠ kebenaran mutlak: memori lama bisa usang — verifikasi
  ulang bila konteks berubah.
- Persist hemat: simpan yang reusable, bukan setiap detail (hindari
  noise & boros context window).
