---
name: sovereign-memory-dreaming
version: 1.0.0
description: >-
  Persistensi memori lintas sesi: review session log, ekstrak pola &
  pelajaran, kurasi doctrine file, agent membaik antar sesi. Inspirasi:
  Anthropic Managed Agents "Memory + Dreaming" — proses terjadwal yang
  me-review session + memory store, ekstrak pola, kurasi memori. Trigger:
  "dreaming", "kurasi memori", "distil pelajaran", "review session",
  "update doctrine", "apa yang sudah dipelajari", "memory update",
  "sesi sudah panjang", "ekstrak pelajaran", "skill memory".
metadata:
  category: data-fetching
  skill_category: "3-data-fetching-analysis"
  version_pack: "SOVEREIGN-SKILLS-PACK-v5.0"
  owner: "Reza Estes / Haidar Faras + Gyss (spousal 50/50)"
  doctrine: "MASTER-ARCHITECT-PROMPT v8.0 · D-1 Truth-Lock"
  generated: "2026-06-12"
  new_in: "v5.0"
  inspiration: "Anthropic Managed Agents — Memory + Dreaming (scheduled review process)"
---

# sovereign-memory-dreaming v1.0.0 — MEMORY & DREAMING

> Terinspirasi Anthropic Managed Agents: "Dreaming" = proses terjadwal yang
> me-review session + memory store, ekstrak pola, kurasi memori → agent
> membaik antar sesi. Di Genspark: kita replikasi secara manual/semi-auto.

## 🌙 KAPAN INVOKE SKILL INI

```
Invoke sovereign-memory-dreaming kalau:
□ Sesi sudah panjang (>1 jam atau >20 turn)
□ Akhir sprint/milestone besar
□ Ada kegagalan berulang yang perlu jadi pelajaran
□ User minta "update doctrine" atau "distil pelajaran"
□ Sebelum memulai sub-brand baru (bawa pelajaran dari yang sebelumnya)
```

## 📚 DREAMING PROTOCOL — 4 Langkah

### Step 1 — READ (Baca session history)

```bash
# Baca session log terakhir
cat /home/user/webapp/docs/SESSION_LOG.md | tail -100

# Baca HANDOFF terkini
cat /home/user/webapp/docs/HANDOFF.md

# Baca git log untuk rekam jejak perubahan
cd /home/user/webapp && git log --oneline --since="7 days ago"

# Baca CREDIT_LOG (kalau ada)
cat /home/user/webapp/docs/CREDIT_LOG.md 2>/dev/null | tail -30
```

### Step 2 — EXTRACT (Ekstrak pola & pelajaran)

Analisis dengan prompt-to-self:

```
Dari session history di atas, identifikasi:

PATTERNS (berulang > 2x):
- Apa yang selalu berhasil? (keep doing)
- Apa yang selalu gagal? (stop doing)
- Apa workaround yang ditemukan? (document as gotcha)

DECISIONS (keputusan arsitektur/bisnis yang dibuat):
- [list keputusan dengan rationale]

GOTCHAS BARU (failure nyata yang ditemukan):
- [list gotcha spesifik yang belum terdokumentasi di SKILL.md]

OPTIMASI BIAYA:
- Aksi mahal apa yang bisa dihindari?
- Alternatif tier rendah yang ditemukan?
```

### Step 3 — CURATE (Kurasi ke doctrine file)

```bash
# Update docs/DOCTRINE.md dengan pelajaran baru
cat >> /home/user/webapp/docs/DOCTRINE.md << 'EOF'

## [YYYY-MM-DD] — Distilasi Sesi

### Pelajaran Teknis
- [gotcha 1 yang ditemukan]
- [gotcha 2]

### Keputusan Arsitektur
- [keputusan 1 + rationale]

### Optimasi Biaya
- [temuan optimasi]

### Pola yang Berhasil
- [pola sukses yang perlu dipertahankan]
EOF
```

### Step 4 — PERSIST (Simpan & push)

```bash
cd /home/user/webapp
git add docs/DOCTRINE.md docs/SESSION_LOG.md
git commit -m "docs: dreaming — distil pelajaran sesi [YYYY-MM-DD]"
git push origin main
```

## 🧠 SKILL MEMORY PATTERN (Anthropic best practice)

Tiap skill bisa punya memory sendiri di `skill-memory/` folder:

```bash
# Append ke skill-specific memory
cat >> /home/user/webapp/docs/skill-memory/cf-deploy.log << 'EOF'
[YYYY-MM-DD] Deploy [project] berhasil. Gotcha: wrangler.jsonc harus sinkron nama project.
EOF

cat >> /home/user/webapp/docs/skill-memory/d1.log << 'EOF'
[YYYY-MM-DD] Migration korup karena .wrangler/state tidak di-reset. Fix: rm -rf .wrangler sebelum re-apply.
EOF
```

## 📊 OUTCOMES EVALUATION (Anthropic pattern)

Di akhir setiap sprint/milestone, evaluasi:

```
OUTCOMES SCORECARD — [Sprint/Milestone Nama]
Period: [tanggal mulai] → [tanggal selesai]

□ Goal tercapai: [yes/partial/no] — [penjelasan jujur]
□ Budget (kredit) sesuai estimasi: [yes/over/under]
□ Timeline sesuai: [yes/over/under]
□ Technical debt ditambahkan: [none/minor/major]
□ Gotcha baru ditemukan: [list]
□ Pola baru yang berguna: [list]

JUJUR: [1 hal yang harusnya dilakukan berbeda]
NEXT: [1 perbaikan konkret yang akan diterapkan sesi berikutnya]
```

## 🔄 DOCTRINE EVOLUTION

File `docs/DOCTRINE.md` = memori kumulatif project. Setiap "dreaming" session menambahkan ke sini.
Format tumbuh organik — append saja, jangan hapus yang lama.

```markdown
# DOCTRINE — [Project Name]

Ini adalah dokumen hidup. Di-update setiap "dreaming session" (distilasi pelajaran).

## [Tanggal] — [Nama milestone]
### Pelajaran teknis
### Keputusan arsitektur  
### Optimasi biaya
### Pola yang berhasil
```

## Gotchas

- Dreaming session = baca lebih banyak file → monitor context window (jangan >70%)
- Kalau SESSION_LOG.md terlalu panjang → baca hanya `tail -100` bukan full
- Doctrine yang berguna = spesifik + actionable, bukan abstrak
- Push hasil dreaming ke git — kalau tidak push = hilang saat sandbox restart
- Jangan dreaming di tengah task penting — lakukan di akhir sesi atau break natural
