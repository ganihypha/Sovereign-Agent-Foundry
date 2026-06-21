# 🧭 RESUME — Sovereign Agent Foundry / SparkMind-OBP

> **Baca file ini PERTAMA di setiap sesi baru.** Isinya = state terakhir + cara boot 1-kalimat + daftar skill + next steps.
> Tujuan: sesi baru langsung lanjut, **zero credit terbuang untuk re-explain**.
>
> **Owner:** Reza Estes / Haidar Faras + Gyss (spousal 50/50)
> **Doctrine:** MASTER-ARCHITECT-PROMPT v8.0 OVERRIDE-LOCK · D-1 Truth-Lock · Indonesia-first · Credit-aware
> **Repo kanonik (SSOT):** https://github.com/ganihypha/Sovereign-Agent-Foundry · branch `main`
> **Update terakhir:** 2026-06-21 (Batch 7 — GitHub Agentic Workflows / gh-aw)

---

## 🚀 BOOT 1-KALIMAT

> **"Baca `RESUME.md` + `skills/INDEX.md`, load `sovereign-system-prompt-opus-4.8` lalu `sovereign-master-boot`, ingest context FASE 0, dan lanjut dari Next Steps."**

(Untuk full agentic company: ganti `sovereign-master-boot` → `sovereign-team-boot`.)

---

## 📍 STATE TERAKHIR (di mana kita sekarang)

**Apa ini:** SparkMind = **Outcome Foundry (OaaS)** untuk UMKM/SMB Indonesia — pabrik yang mengubah
masalah bisnis jadi hasil yang sudah jalan, dirakit dari **36 sovereign skill** di atas infrastruktur
edge Cloudflare, dijual sebagai paket hibrida (Setup + langganan + jasa), dibayar via QRIS/VA lewat
Merchant-of-Record (Duitku) yang patuh.

**Status produk:** 🟢 **PRODUCTION LIVE**

| Aset | Lokasi |
|---|---|
| Production | https://sparkmind-obp.pages.dev |
| Repo / SSOT | https://github.com/ganihypha/Sovereign-Agent-Foundry (`main`) |
| Stack | Hono + Cloudflare Pages + D1 + Duitku (MoR) |
| Project name (CF/wrangler) | `sparkmind-obp` · D1: `sparkmind-obp-production` |

**Commit terakhir:** `04ba3e7` (HF Space) + commit GitHub berikut — *feat(orchestration): A2A orchestrator LangChain+LangGraph+CrewAI + edge gateway /api/orchestrate* (2026-06-21)

**Yang sudah selesai / LIVE:**
- ✅ Marketplace Hono + CF Pages + D1 + checkout Duitku (verified: `paymentUrl` → `app-prod.duitku.com`).
- ✅ **Pivot Outcome Foundry (Sprint R1) LIVE di kode** — `/solutions` (9 solusi outcome) + `/solutions/:slug`, `/developers` (36 skill DIY), `/foundry`, engine checkout merge (offer + SKU outcome).
- ✅ Lead capture (`POST /api/intake` → tabel `leads`), `/done-for-you`, `/partner`.
- ✅ Delivery produk: skill ZIP via `/static/downloads/:file.zip` + `/setup` guide.
- ✅ Halaman legal (`/legal/:slug` — terms/refund/privacy/compliance), `/orders`, `/admin`.
- ✅ **39 skill** lengkap di `skills/` (lihat `skills/INDEX.md`).
- ✅ **SSOT canonical docs** 00–13 + Batch 2–5 di `docs/ssot/`.
- ✅ **AI Orchestration A2A (Batch 6) LIVE** — orchestrator nyata yang menyatukan
  **LangChain (tools) + LangGraph (state machine + HITL) + CrewAI (multi-agent)** dalam 1 service
  FastAPI/Docker di HF Space, dipanggil lewat **edge gateway** Hono `POST /api/orchestrate`
  (proxy + HITL gate). Verified end-to-end dengan LLM nyata (Groq llama-3.3-70b).
- ✅ **🆕 GitHub Agentic Workflows / gh-aw (Batch 7)** — 3 workflow agentik (Markdown+frontmatter)
  di `.github/workflows/` (`daily-sovereign-status`, `sovereign-issue-triage`, `sovereign-ssot-guardian`)
  + shared import `sovereign-guardrails.md`. Frontmatter tervalidasi sesuai spec resmi gh-aw,
  patuh Truth-Lock + HITL + safe-outputs. SSOT: `docs/ssot/batch-7-agentic-workflows/B7-00`.
  ⚠️ Aktivasi (compile `.lock.yml` + secret engine AI) = HITL (butuh akun + kuota owner).

---

## 🤖 AI ORCHESTRATION (A2A) — Batch 6

**Backend orchestrator (HF Space, Docker SDK):**
- 🟢 LIVE: https://elmatador0197-ai-orchestrationl.hf.space · `/health` `/orchestrate` `/tool` `/tools` `/docs`
- Repo Space: https://huggingface.co/spaces/elmatador0197/AI-Orchestrationl
- Stack: **FastAPI** + **LangChain-core** (tools) + **LangGraph** (state machine `plan→gate→tools→crew→finalize` + HITL) + **CrewAI** (planner→executor→reviewer) + **Groq** LLM.
- Capabilities (verified `/health`): `langchain:true, langgraph:true, crewai:true, llm:true (llama-3.3-70b-versatile)`.
- Graceful degradation: tetap sehat tanpa LLM key (mode deterministik).
- Source di sandbox: `/home/user/ai-orch-space/` (main.py, Dockerfile, requirements.txt, README.md).

**Edge gateway (Hono Worker, repo ini):**
- `POST /api/orchestrate` — proxy ke Space + **HITL gate** (deteksi payment/legal/secret/deploy → 202 `hitl_required`; approve via header `x-hitl-token`).
- `GET /api/orchestrate/health` — proxy health upstream.
- Bindings baru (`src/types.ts`): `ORCH_URL`, `ORCH_API_KEY?`, `ORCH_HITL_TOKEN?`.

**Cara aktifkan di production CF Pages (BYOK):**
```bash
npx wrangler pages secret put ORCH_URL          # https://elmatador0197-ai-orchestrationl.hf.space
npx wrangler pages secret put ORCH_HITL_TOKEN   # token approval HITL
# (opsional) npx wrangler pages secret put ORCH_API_KEY
```

**Yang BELUM (gap terbuka, jujur / Truth-Lock):**
- ❌ Belum ada **1 transaksi paid live nyata** end-to-end (T1, P0).
- ❌ File skill belum di **R2** (masih static); `/api/download/:token` belum bind R2 (T2, P0).
- ❌ **Email license** otomatis belum jalan (Resend/Mailgun REST) (T3, P0).
- ❌ **All-Access Bundle 990k** belum jadi SKU+offer (T4, P0).
- ❌ Custom domain belum di-bind (T5, P1).
- ⚠️ Orchestrator A2A LIVE, tapi `ORCH_URL`/`ORCH_HITL_TOKEN` belum di-set sebagai **secret production** CF Pages (T15 — butuh BYOK CF, lihat di atas).
- ⚠️ **gh-aw (Batch 7)** workflow sudah ada di repo, tapi belum di-`compile` jadi `.lock.yml` & belum punya secret engine AI → belum ada run nyata di Actions (T16 — butuh akun GitHub + kuota AI owner = HITL).

---

## 🤖 GITHUB AGENTIC WORKFLOWS (gh-aw) — Batch 7

**Apa:** agen AI yang berjalan di GitHub Actions, ditulis dalam Markdown+frontmatter
(di-compile jadi `*.lock.yml`). Merawat REPO (beda dari Batch 6 yang merawat PRODUK).

**File (`.github/workflows/`):**
- `daily-sovereign-status.md` — `schedule:daily` → issue status+gap P0+next steps (continuity).
- `sovereign-issue-triage.md` — issue/`/triage` → label area+prioritas + flag HITL.
- `sovereign-ssot-guardian.md` — push `skills|docs`/weekly → draft-PR perbaikan drift SSOT.
- `shared/sovereign-guardrails.md` — import: tools+network+6 aturan non-negotiable.

**Aktivasi (HITL — owner):**
```bash
gh extension install github/gh-aw
gh secret set COPILOT_GITHUB_TOKEN     # atau ANTHROPIC/OPENAI/GEMINI_API_KEY
gh aw compile && git add .github/workflows && git commit -m "chore(gh-aw): compile" && git push
gh aw run daily-sovereign-status
```
**SSOT:** `docs/ssot/batch-7-agentic-workflows/B7-00-GITHUB-AGENTIC-WORKFLOWS-DOC.md`

---

## ⏭️ NEXT STEPS (kerjakan dari atas — RICE, P0 dulu)

> Sumber: `docs/ssot/12-TODO-ROADMAP-DOC.md`. Sprint 1 (D0–D14) = validasi delivery & AOV.

| # | Tugas | Prioritas | Skill yang dipakai |
|---|---|---|---|
| T1 | **1 transaksi paid live** (nominal kecil) end-to-end | 🔴 P0 | `workflow-ops`, `cfo` |
| T2 | Upload skill ke **R2** + bind `/api/download/:token` | 🔴 P0 | `cf-byok-deploy` |
| T3 | **Email license** otomatis (Resend/Mailgun REST) | 🔴 P0 | `gtm-engineering` |
| T4 | **All-Access Bundle (990k)** sebagai SKU + offer | 🔴 P0 | `cmo`, `cfo` |
| T5 | Bind **custom domain** + update callback/return URL | 🟠 P1 | `cf-byok-deploy` |
| T6 | **Founder Pass (149k/bln)** continuity/MRR | 🟠 P1 | `cfo`, `cpo` |
| T7 | Halaman **Done-for-You** + intake (polish) | 🟠 P1 | `gtm-engineering` |
| T8 | Halaman **kebijakan** (refund/privasi-PDP/terms) (polish) | 🟠 P1 | `specialists`, `zero-trust` |
| T15 | **Wire orchestrator ke production**: set secret `ORCH_URL` + `ORCH_HITL_TOKEN` di CF Pages, tambah set `GROQ_API_KEY` di HF Space (✅ sudah), UI tipis `/foundry` panggil `/api/orchestrate` | 🟠 P1 | `cf-byok-deploy`, `langgraph-statemachine`, `crewai-swarm`, `langchain-tools` |
| T16 | **Aktifkan gh-aw (Batch 7)**: `gh extension install github/gh-aw` → set secret engine AI → `gh aw compile` (.lock.yml) → push → `gh aw run` | 🟠 P1 | `github-push`, `workflow-ops`, `orchestration-patterns` |

**DoD Sprint 1:** pembeli bisa beli → bayar → unduh file nyata; bundle 990k tampil.

---

## 🗂️ DAFTAR SKILL (ringkas — detail di `skills/INDEX.md`)

**39 skill**, dikelompokkan per tier. Load HANYA yang relevan (hemat credit).

- **Tier 0 — Boot/Identitas:** `system-prompt-opus-4.8`, `master-boot`, `team-boot`, `context-injection`
- **Tier 1 — Control plane & C-Suite:** `orchestrator` (L1), `cofounder` (L0.5), `cto` `cpo` `cmo` `cfo` `coo` (L2)
- **Tier 2 — Squads & Specialists:** `squad-engineering` `squad-product` `squad-marketing` `squad-sales-cs` `squad-opsfinance` (L3), `specialists` (L4)
- **Tier 3 — Actuation & Memory:** `claw-actuation` (L5a), `hermes-memory` (L5b), `memory-dreaming`
- **Tier 4 — Orchestration & Continuity:** `fullstack-cycle`, `orchestration-patterns`, `cowork-handoff`, `workflow-ops`
- **Tier 5 — Deploy/VCS/Verify:** `cf-byok-deploy`, `github-push`, `hf-spaces-deploy`, `verify-rubric`, `computer-browser-use`, `gtm-engineering`
- **Tier 6 — Governance/Security:** `credit-aware`, `enterprise-patterns`, `zero-trust`
- **Tier 7 — External runtime:** `crewai-swarm`, `langgraph-statemachine`, `langchain-tools`, `n8n-workflow`, `supabase-vault`
- **Tier 8 — Platform canon:** `agent-foundry`

👉 **Katalog lengkap + trigger tiap skill:** [`skills/INDEX.md`](skills/INDEX.md)

---

## 📚 PETA DOKUMEN (di mana cari apa)

| Mau tahu… | Baca |
|---|---|
| State + boot (file ini) | `RESUME.md` |
| Katalog skill | `skills/INDEX.md` |
| Keseluruhan platform | `docs/ssot/00-SSOT-CANONICAL-INDEX.md` |
| Apa yang dibangun | `docs/ssot/01-PRD.md` |
| Arsitektur teknis | `docs/ssot/03-ARCHITECT-DOC.md` |
| Apa yang sudah LIVE | `docs/ssot/04-PRODUCTIONIZED-DOC.md` |
| Monetisasi | `docs/ssot/05-MONETIZATION-DOC.md` |
| Backlog / next | `docs/ssot/12-TODO-ROADMAP-DOC.md` |
| Pivot Outcome Foundry | `docs/ssot/batch-5-outcome-foundry/` (B5-00 … B5-06) |
| AI Orchestration A2A | `docs/ssot/batch-6-ai-orchestration/B6-00` |
| GitHub Agentic Workflows (gh-aw) | `docs/ssot/batch-7-agentic-workflows/B7-00` + `.github/workflows/README.md` |
| Cara operasi sandbox | `docs/SETUP-GUIDE.md` + skill `workflow-ops` |
| Rute aplikasi lengkap | `README.md` |

---

## 🛠️ QUICK COMMANDS (operate sandbox)

```bash
# Build + start (PM2)
cd /home/user/webapp && npm run build && fuser -k 3000/tcp 2>/dev/null; pm2 start ecosystem.config.cjs
curl http://localhost:3000/api/health        # smoke test
pm2 logs --nostream                          # cek log (non-blocking)

# D1 lokal
npx wrangler d1 migrations apply sparkmind-obp-production --local
npm run db:seed

# Deploy prod (BYOK CF) — pakai skill cf-byok-deploy
npm run deploy        # vite build && wrangler pages deploy dist --project-name sparkmind-obp

# Push SSOT
git add -A && git commit -m "..." && git push origin main
```

---

## ✅ ATURAN SESI (Non-Negotiable ringkas)

1. **Truth-Lock:** jangan klaim "selesai" tanpa bukti (build/curl). Pakai `verify-rubric`.
2. **Credit-aware:** bash/curl/grep dulu; tool mahal hanya bila perlu + konfirmasi owner.
3. **HITL:** semua uang keluar & pesan keluar customer-facing = approve owner dulu.
4. **Indonesia-first:** copy IDR, pajak ID, UU PDP.
5. **Tutup loop:** akhir sesi → update `RESUME.md` (state + next steps) + commit + push.

---

*RESUME.md ini adalah SSOT continuity. Update SELALU di akhir sesi agar sesi berikutnya boot instan.*
