---
name: sovereign-context-injection
version: 2.0.0
description: >-
  SparkMind Sovereign FASE 0 — context ingest & scope lock. Baca SEMUA
  sumber konteks di awal sesi (uploaded_files, repo existing, README,
  HANDOFF, AUDIT-LOG, SB-Git refs, SSOT docs), ekstrak brand/scope/
  data-model/constraint, lalu kunci scope 5-10 baris sebelum eksekusi.
  Mencegah halusinasi & rework. Trigger: "ingest context", "baca
  semua", "scope lock", "fase 0", "pahami project dulu", "resume".
metadata:
  category: context
  skill_category: "knowledge-retrieval"
  owner: "Reza Estes / Haidar Faras + Gyss (spousal 50/50)"
  doctrine: "MASTER-ARCHITECT-PROMPT v5.0 + v7.0 + v8.0 OVERRIDE-LOCK · D-1 Truth-Lock"
  requires:
    bins: ["ls", "cat", "grep", "find", "git"]
    tools: ["TodoWrite"]
---

# sovereign-context-injection

FASE 0 dari `sovereign-fullstack-cycle`. Tujuan: agent **paham penuh**
sebelum menyentuh kode. Konteks yang hilang = rework + halusinasi.
Credit-aware: pakai `cat/grep/find` (murah), bukan tool mahal.

## Urutan ingest (EXACT — pakai yang ada)

```bash
# 1. File upload user (sumber niat paling baru)
ls -la /home/user/uploaded_files/ 2>/dev/null
# Baca file kecil langsung; file besar → head + grep terarah.

# 2. Repo existing
cd /home/user/webapp && git log --oneline -10 2>/dev/null
find src -type f 2>/dev/null | sort
cat README.md 2>/dev/null | head -120

# 3. Continuity dari sesi sebelumnya
cat HANDOFF.md 2>/dev/null
git log --oneline | grep -i "handoff:" | head -3
cat AUDIT-LOG.md 2>/dev/null | tail -20

# 4. SSOT canonical (acuan tunggal)
ls docs/ssot/ 2>/dev/null
cat docs/ssot/00-SSOT-CANONICAL-INDEX.md 2>/dev/null

# 5. SB-Git refs (jika owner kasih URL repo knowledge)
#   clone ke $HOME/sb-git-refs/<repo> (di luar webapp), baca sebagai referensi.
```

## Ekstrak (catat ringkas, jangan dump panjang)

- **Brand & sub-brand** + tema/warna (`src/data/brands.ts`).
- **Scope fitur** yang diminta sesi ini (verbatim intent owner).
- **Data model** (migrations/, types.ts) — sumber kebenaran skema.
- **Constraint khusus** (Indonesia-first, IDR, Duitku MoR, Rp 0).
- **State terakhir** (apa selesai, apa belum) dari HANDOFF/commit.

## Scope lock (output FASE 0 — WAJIB)

```
🔒 SCOPE LOCK — <project>
Brand     : <nama + sub-brand>
Tujuan    : <1-2 kalimat verbatim intent>
In-scope  : <bullet — yang dikerjakan sesi ini>
Out-scope : <bullet — yang TIDAK>
Data model: <tabel/skema kunci>
Constraint: <Indonesia-first · IDR · CF-native · Rp0 · ...>
Mulai dari: <fase tersisa / titik resume>
```

Tulis scope lock + buat TodoWrite per langkah. Konfirmasi ke owner
HANYA jika ada **ambiguitas fatal**; scope jelas → langsung lanjut
(minimal prompting doctrine).

## Aturan credit-aware

- File besar → JANGAN `cat` penuh; pakai `head`/`grep -n` terarah.
- JANGAN `render_js`/deep-research kecuali benar-benar perlu.
- Batch baca file yang independen dalam 1 langkah.

## Failure modes

| Gejala | Fix |
|---|---|
| uploaded_files kosong & repo kosong | Minta owner sebutkan tujuan + sumber (1 pertanyaan padat). |
| File upload truncated/korup | Recovery via wrapper URL/DownloadFileWrapper; jangan asumsi isi. |
| Scope ambigu fatal | STOP, tanya 1 pertanyaan tajam, bukan interogasi panjang. |

## Out of scope

- Eksekusi build/deploy → `sovereign-workflow-ops` / `-cf-byok-deploy`.
- Penulisan handoff penutup → `sovereign-cowork-handoff`.
