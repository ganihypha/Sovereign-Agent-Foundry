---
name: sovereign-cowork-handoff
version: 2.0.0
description: >-
  SparkMind Sovereign HANDOFF & continuity — tulis/baca HANDOFF.md
  agar sesi (atau agent) berikutnya bisa resume tanpa ingest ulang
  dari nol. Dipakai di FASE 0 (resume: baca handoff terakhir) dan
  FASE 7 (close-out: tulis handoff). State + keputusan + next-step
  atomic + known issues, lalu commit "handoff: ...". Trigger:
  "handoff", "tutup sesi", "lanjut sesi berikutnya", "resume", "rekap
  untuk sesi depan", "continuity".
metadata:
  category: continuity
  skill_category: "knowledge-retrieval"
  owner: "Reza Estes / Haidar Faras + Gyss (spousal 50/50)"
  doctrine: "MASTER-ARCHITECT-PROMPT v5.0 + v7.0 + v8.0 OVERRIDE-LOCK · D-1 Truth-Lock"
  requires:
    bins: ["git", "cat"]
    tools: []
---

# sovereign-cowork-handoff

Continuity antar-sesi. Genspark AI Dev = 1 agent/sesi & context window
terbatas → handoff tertulis di repo adalah memori jangka-panjang yang
andal (auto-push tiap turn). Pasangan dari `sovereign-context-injection`.

## Mode RESUME (FASE 0)

```bash
cd /home/user/webapp
cat HANDOFF.md 2>/dev/null
git log --oneline | grep -i "handoff:" | head -3
```
Ambil: state terakhir, keputusan yang sudah dibuat, next-step atomic,
known issues. Lanjut dari titik itu — jangan ulang kerja yang sudah
selesai.

## Mode CLOSE-OUT (FASE 7) — tulis/Update HANDOFF.md

Format kanonik (timpa bagian "Sesi terakhir", simpan riwayat ringkas):

```markdown
# HANDOFF — <project / brand>

## Sesi terakhir — <YYYY-MM-DD> (<judul singkat>)

### State sekarang
- Build: <hijau/merah + bukti> · Live: <URL prod / sandbox>
- Yang SELESAI sesi ini: <bullet>
- Yang BELUM / parkir: <bullet jujur (D-1)>

### Keputusan penting (kenapa)
- <keputusan> → <alasan 1 baris>

### Next step (ATOMIC — bisa langsung dieksekusi)
1. <langkah konkret + perintah/file>
2. <...>

### Known issues / risiko
- <gejala → dugaan penyebab → ide fix>

### Konteks kunci (jangan hilang)
- Brand/scope/data-model/constraint penting.
- Secrets terpasang? <ya/tidak — JANGAN tulis nilainya>
```

Commit:

```bash
cd /home/user/webapp && git add HANDOFF.md AUDIT-LOG.md README.md
git commit -m "handoff: <ringkas state + next step>"
```

## Hubungan dengan skill lain

- Resume detail context → `sovereign-context-injection` (FASE 0).
- Per-session/sprint header → `sovereign-agent-foundry-context` +
  `B2-04 Sprint per Session` / `B2-05 Master Architect Prompt`.
- Pelajaran reusable (kenapa salah berulang) → `sovereign-memory-dreaming`.

## Aturan

- **JANGAN tulis nilai secret** di HANDOFF (hanya status terpasang).
- Next-step WAJIB atomic — sesi depan tidak boleh menebak.
- D-1 Truth-Lock: tulis kabar buruk (yang belum jadi) apa adanya.
- Handoff = bagian dari Definition of Done FASE 7; tanpa handoff,
  sesi belum benar-benar ditutup.

## Failure modes

| Gejala | Fix |
|---|---|
| HANDOFF.md tidak ada saat resume | Fallback ke commit `handoff:` + README + AUDIT-LOG. |
| Handoff usang vs kode | Percaya kode/git; perbarui handoff. |
