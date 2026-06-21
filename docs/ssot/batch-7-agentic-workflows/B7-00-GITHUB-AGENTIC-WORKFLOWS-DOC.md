# B7-00 — GitHub Agentic Workflows (gh-aw) untuk Sovereign Agent Foundry

> **Batch 7 · 2026-06-21 · Status: 🟢 IMPLEMENTED (repo) · ⚠️ AKTIVASI = HITL (butuh akun + secret AI owner)**
> Realisasi **agentic CI/CD**: agen AI berjalan di dalam GitHub Actions, ditulis dalam
> **Markdown + frontmatter** (bukan YAML manual), untuk meng-otomatiskan operasi repo
> (status harian, triase issue, penjaga konsistensi SSOT) — patuh doktrin D-1 Truth-Lock + HITL.

---

## 1. Tujuan

Menutup gap "operasi repo masih manual" dengan menambahkan lapisan **GitHub Agentic
Workflows (gh-aw)** — proyek riset resmi GitHub Next yang memungkinkan menulis workflow
GitHub Actions sebagai **instruksi bahasa natural** di Markdown, lalu di-*compile* menjadi
`*.lock.yml` yang dijalankan Actions. Ini melengkapi Batch 6 (A2A orchestrator runtime):
sementara Batch 6 = "otak agentik saat produk dipanggil", Batch 7 = "agen yang merawat
repo itu sendiri secara terjadwal/event-driven".

## 2. Apa itu gh-aw (ringkas kanonik)

| Aspek | Penjelasan |
|---|---|
| Bentuk | 1 file `.md` = 1 workflow. **Frontmatter YAML** (config) + **body Markdown** (instruksi natural). |
| Kompilasi | `gh aw compile` → menghasilkan `*.lock.yml` (GitHub Actions asli). Commit keduanya. |
| Engine AI | `copilot` (default), `claude`, `codex`, atau `gemini` — dipilih via secret + `engine:`. |
| Trigger | Standar Actions (`schedule`, `issues`, `push`, `workflow_dispatch`) + tambahan gh-aw (`command:` untuk slash-command, `reaction:`, `stop-after:`, `manual-approval:`). |
| Output aman | `safe-outputs:` — agen **tidak** push langsung; menulis lewat `create-issue`, `add-comment`, `add-labels`, `create-pull-request` (bisa `draft`). |
| Tooling | `tools:` (github toolsets, `bash` allowlist, `edit`), `network:` allowlist, MCP servers. |
| Keamanan | `strict: true` (validasi penuh, wajib repo publik), `permissions:` read-minimal, no `secrets.*` di `env:`. |
| Reuse | `imports:` untuk komponen bersama (tools/steps/MCP/prompt). |

## 3. Arsitektur implementasi di repo ini

```
.github/workflows/
├── shared/
│   └── sovereign-guardrails.md     # import: tools baseline + network + 6 aturan non-negotiable
├── daily-sovereign-status.md       # schedule:daily → create-issue (status + gap P0 + next steps)
├── sovereign-issue-triage.md       # issues + /triage → add-labels + add-comment (HITL flag)
├── sovereign-ssot-guardian.md      # push skills|docs + weekly → create-pull-request (draft)
└── README.md                       # cara compile & aktifkan
```

Alur tiap workflow:
```
Event (schedule / issue / push / slash-command)
      │
      ▼
GitHub Actions  ──►  gh-aw runner (engine AI)  ──►  baca repo (read-only)
      │                                              │
      │                              import shared/sovereign-guardrails.md
      ▼                                              ▼
safe-outputs  ◄──  agen menghasilkan: issue / komentar / draft-PR (tidak pernah push ke main)
```

## 4. Tiga workflow yang diimplementasi

### 4.1 `daily-sovereign-status.md` — 🔱 Continuity Report
- **Trigger:** `schedule: daily` + `workflow_dispatch`.
- **Fungsi:** baca `RESUME.md` + `skills/INDEX.md` + roadmap → buat issue ringkas
  (state terakhir, gap P0 T1–T4, next steps, kalimat boot 1-baris).
- **Nilai:** continuity "boot instan" otomatis → sesi baru tinggal baca issue terbaru.

### 4.2 `sovereign-issue-triage.md` — 🏷️ Triage
- **Trigger:** `issues: [opened, reopened]` + slash-command `/triage`.
- **Fungsi:** klasifikasi area (`orchestration/edge-app/docs-ssot/skill/deploy`) +
  prioritas (`P0/P1/P2`), tulis komentar rangkuman + next steps.
- **HITL:** isu payment/legal/customer/secret → label `needs-human-approval`, tak dieksekusi.

### 4.3 `sovereign-ssot-guardian.md` — 🛡️ SSOT Guardian
- **Trigger:** `push` ke `skills/**`|`docs/ssot/**`|`RESUME.md` + `schedule: weekly`.
- **Fungsi:** deteksi *drift* (jumlah skill nyata vs klaim INDEX/RESUME, tautan dokumen).
- **Output:** **draft PR** perbaikan minimal (bukan push langsung) → tetap di-review owner.

## 5. Pemetaan ke doktrin Sovereign (kenapa aman)

| Non-Negotiable | Cara dipenuhi di gh-aw |
|---|---|
| D-1 Truth-Lock | Instruksi eksplisit "jangan klaim tanpa bukti"; guardian membandingkan klaim vs kenyataan. |
| HITL gate | `safe-outputs` (issue/comment/draft-PR) + label `needs-human-approval`; tak ada auto-merge. |
| No secret leak | `strict: true`, secret hanya `${{ secrets.* }}`, larangan `secrets.*` di `env:`. |
| Indonesia-first | Body Markdown menginstruksikan output Bahasa Indonesia + IDR + konteks UU PDP. |
| Credit-aware | `timeout-minutes` ketat; guardian *no-op* bila tidak ada drift. |
| Safe by default | `permissions:` read-minimal; tak ada `contents: write` untuk agen. |

## 6. Cara aktivasi (HITL — butuh owner)

> Eksekusi nyata = **gate HITL** karena butuh akun GitHub owner + secret engine AI (uang/kuota).

```bash
gh extension install github/gh-aw
gh secret set COPILOT_GITHUB_TOKEN        # atau ANTHROPIC/OPENAI/GEMINI_API_KEY
gh aw compile                             # .md → .lock.yml
git add .github/workflows && git commit -m "chore(gh-aw): compile" && git push
gh aw run daily-sovereign-status          # uji manual
gh aw status                              # status semua workflow
```

## 7. Status & Truth-Lock (jujur, apa adanya)

- ✅ **3 workflow `.md` + 1 shared import + README** ditulis & tervalidasi struktur (frontmatter sesuai spec resmi gh-aw).
- ✅ **SSOT doc ini (B7-00)** kanonik, terhubung ke INDEX.
- ❌ **Belum di-compile ke `.lock.yml`** — butuh ekstensi `gh aw` + akun GitHub owner (HITL).
- ❌ **Belum ada run nyata di Actions** — butuh secret engine AI (Copilot/Claude/dst) = biaya/kuota owner (HITL).
- ⚠️ Aktivasi penuh = langkah Bagian 6 oleh owner.

## 8. Referensi kanonik (deep research)

| Sumber | URL |
|---|---|
| Frontmatter spec | https://github.github.com/gh-aw/reference/frontmatter/ |
| Quick start | https://github.github.com/gh-aw/setup/quick-start/ |
| Multi-repo examples | https://github.github.com/gh-aw/examples/multi-repo/ |
| Contoh resmi | https://github.com/githubnext/agentics |
| GitHub Next project | https://githubnext.com/projects/agentic-workflows/ |
| Blog GitHub (automate repo tasks) | https://github.blog/ai-and-ml/automate-repository-tasks-with-github-agentic-workflows/ |
| Topik agentic-ai | https://github.com/topics/agentic-ai |
| Dify (referensi platform agentik) | https://github.com/langgenius/dify |

---

## 9. Hubungan dengan batch lain

```
Batch 6 (A2A orchestrator runtime)  →  "otak agentik" saat PRODUK dipanggil  (LangChain+LangGraph+CrewAI di HF Space)
Batch 7 (gh-aw agentic CI/CD)       →  "agen perawat REPO" terjadwal/event   (Markdown workflow di GitHub Actions)
```
Keduanya berbagi doktrin guardrail yang sama (Truth-Lock + HITL + Indonesia-first).

*B7-00 adalah dokumen kanonik Batch 7. Update bila menambah/mengubah workflow di `.github/workflows/`.*
