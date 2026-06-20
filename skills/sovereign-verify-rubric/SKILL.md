---
name: sovereign-verify-rubric
version: 2.0.0
description: >-
  SparkMind Sovereign DoD/verification gate — rubrik brutal-verify
  sebelum apa pun dianggap "selesai" atau di-ship. Cek build, test/
  curl dengan bukti, secret-scan, truth-lock pada klaim, compliance
  (PDP/MoR), dan kesesuaian acceptance criteria. Output: lulus/gagal
  + bukti, bukan "looks good". Trigger: "verifikasi", "review", "DoD",
  "sudah benar?", "brutal verify", "cek sebelum ship", "definition of done".
metadata:
  category: governance
  skill_category: "infrastructure-operations"
  owner: "Reza Estes / Haidar Faras + Gyss (spousal 50/50)"
  doctrine: "MASTER-ARCHITECT-PROMPT v5.0 + v7.0 + v8.0 OVERRIDE-LOCK · D-1 Truth-Lock"
  requires:
    bins: ["npm", "curl", "git", "grep"]
    tools: []
---

# sovereign-verify-rubric

Gerbang terakhir sebelum ship. Prinsip: **"looks good" tanpa bukti =
DITOLAK**. Setiap klaim "selesai" harus disertai bukti yang bisa
direproduksi (output build/curl/git diff). Selaras `Brutal-Verifier`
(specialists L4) & 7 Non-Negotiables (#6 Brutal-verified).

## RUBRIK DoD (semua harus ✅ — sertakan bukti)

```
✅ VERIFY RUBRIC — <artefak/fitur>
[ ] Build hijau        → bukti: `npm run build` tail (no error)
[ ] Test/curl pass     → bukti: output curl tiap endpoint utama
[ ] Acceptance criteria → tiap butir PRD ditrace ke bukti
[ ] Secret-scan bersih  → `git diff` di-grep token/key (nol)
[ ] Truth-lock klaim    → klaim di README/UI = realita (no over-claim)
[ ] Error handling      → path gagal ditangani eksplisit
[ ] Compliance          → PDP (consent/PII) + disclosure MoR bila perlu
[ ] Docs                → README/HANDOFF diupdate bila user-facing
Verdict: ✅ SHIP / ⚠️ SHIP dengan syarat / 🚫 BLOCK
Temuan : <list — walau nol, sebutkan "nol temuan setelah cek X,Y,Z">
```

## Perintah verifikasi standar

```bash
cd /home/user/webapp
npm run build 2>&1 | tail -8                       # build gate
curl -s http://localhost:3000/api/health           # health gate
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/   # home
git diff --cached | grep -iE "api[_-]?key|secret|token|password" || echo "secret-scan: clean"
```

## Tingkat verifikasi (sesuaikan risiko — credit-aware)

| Risiko artefak | Kedalaman verify |
|---|---|
| Docs/copy | Truth-lock + ID-localization (ringan) |
| Fitur internal | Build + curl + secret-scan |
| Customer-facing / payment / legal | Rubrik penuh + ≥2 specialist (DevSecOps+Legal) + HITL owner |

## Aturan

- D-1 Truth-Lock: laporkan kegagalan apa adanya; jangan "hijaukan"
  hasil yang belum diuji.
- Verifikasi adversarial: coba **mematahkan** output, bukan
  mengonfirmasinya.
- High-stakes → minta posisi 2 role/specialist berbeda sebelum verdict.
- Verdict 🚫/⚠️ → kembalikan ke eksekutor dengan temuan konkret, jangan
  perbaiki diam-diam tanpa catatan.

## Out of scope

- Perbaikan kode → eksekutor (Eng squad / fullstack-cycle).
- Keamanan mendalam (scan + threat model) → `sovereign-zero-trust`.
