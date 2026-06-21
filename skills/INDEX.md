# 🗂️ SKILLS INDEX — Sovereign Agent Foundry

> **Tujuan:** katalog instan semua skill agar **boot tanpa membaca 39 file `SKILL.md`** satu per satu.
> Baca file ini → tahu skill apa yang tersedia → load hanya yang relevan → hemat credit.
>
> **Total skill:** 39 · **Owner:** Reza Estes / Haidar Faras + Gyss (spousal 50/50)
> **Doctrine induk:** MASTER-ARCHITECT-PROMPT v8.0 OVERRIDE-LOCK · D-1 Truth-Lock · Indonesia-first · Credit-aware
> **Lokasi skill:** `skills/<nama-skill>/SKILL.md`

---

## ⚡ Cara pakai (boot)

1. **Sesi baru:** baca [`/RESUME.md`](../RESUME.md) (state) → baca file ini (katalog skill).
2. **Aktivasi penuh:** load `sovereign-system-prompt-opus-4.8` → `sovereign-master-boot` (atau `sovereign-team-boot` untuk full agentic company).
3. **Per-task:** pilih skill dari tabel di bawah berdasarkan kolom **Trigger**. Jangan load semua kalau tidak perlu.

**Urutan load identitas (WAJIB paling atas):**
`sovereign-system-prompt-opus-4.8` → `sovereign-master-boot` → `sovereign-context-injection` → (skill task spesifik).

---

## 🥇 Tier 0 — Boot & Identitas (load PERTAMA)

| Skill | Versi | Fungsi singkat | Trigger |
|---|---|---|---|
| `sovereign-system-prompt-opus-4.8` | 4.8.0 | Meta-skill identitas tertinggi. Kunci persona SPARKMIND SOVEREIGN + 7 Non-Negotiables sebelum skill lain jalan. | "sovereign mode", "kunci identitas", "boot identitas" |
| `sovereign-master-boot` | 2.0.0 | Entry point sesi baru — 1 perintah load seluruh `skills/` (pack v5.0) + context/memory ingest, lalu standby/eksekusi. | "boot", "activate semua skill", "mulai sesi" |
| `sovereign-team-boot` | 1.0.0 | Spawn SELURUH agentic company (Co-Founder → C-Suite → Squads → Specialists → Claw/Hermes) dengan 1 kalimat. | "boot full team", "activate agentic team", "rapat c-suite" |
| `sovereign-context-injection` | 2.0.0 | FASE 0 — baca semua sumber konteks (uploaded_files, repo, README, HANDOFF, SSOT), ekstrak scope, lalu kunci scope. | "ingest context", "scope lock", "fase 0", "resume" |

---

## 👔 Tier 1 — Control Plane & C-Suite (agentic company)

| Skill | Layer | Fungsi singkat | Trigger |
|---|---|---|---|
| `sovereign-orchestrator` | L1 | Control plane — routing task ke layer/role, enforce 7 Non-Negotiables, budget-guard, HITL gates, kill-switch. | "route task", "siapa yang ngerjain", "STOP ALL" |
| `sovereign-cofounder` | L0.5 | Co-Founder / Chief-of-Staff — sintesis keputusan lintas C-Suite, terjemahkan mandate owner jadi prioritas. | "cofounder", "prioritas minggu ini", "rekap untuk owner" |
| `sovereign-cto` | L2 | Chief Technology Officer — strategi tech, arsitektur, repo governance, deploy strategy (constraint Rp 0). | "CTO", "arsitektur", "tech stack", "ADR" |
| `sovereign-cpo` | L2 | Chief Product Officer — roadmap, PRD, backlog RICE, katalog 36 skill, pengalaman buyer. | "CPO", "produk", "PRD", "roadmap" |
| `sovereign-cmo` | L2 | Chief Marketing Officer — positioning, brand 4-layer, GTM Indonesia-first, funnel, SEO. | "CMO", "marketing", "positioning", "GTM" |
| `sovereign-cfo` | L2 | Chief Financial Officer — runway, pricing IDR, pajak ID (PPN 12%, PPh21, e-Faktur, Coretax, BPJS), unit economics. | "CFO", "harga", "runway", "pajak" |
| `sovereign-coo` | L2 | Chief Operating Officer — SOP, ops harian, manajemen quota free-tier, triage, koordinasi squad. | "COO", "SOP", "ops", "quota", "SLA" |

---

## 👥 Tier 2 — Squads (L3) & Specialists (L4)

| Skill | Layer | Fungsi singkat | Trigger |
|---|---|---|---|
| `sovereign-squad-engineering` | L3 → CTO | 8 sub-role eng (Code-Writer, Reviewer, Debugger, Testing, Deploy/CI, IaC, Observability, Security). | "coding", "implement", "fix bug", "test", "CI" |
| `sovereign-squad-product` | L3 → CPO | 6 sub-role (PRD-Writer, User-Research, UX-Wireframe, Design-System, Prototype, A/B-Test). | "tulis PRD", "wireframe", "design system" |
| `sovereign-squad-marketing` | L3 → CMO | 6 sub-role (Content, SEO, Social-Organic, Email, Brand-Designer, Analytics). | "tulis konten", "SEO", "email funnel" |
| `sovereign-squad-sales-cs` | L3 → CMO+COO | 6 sub-role (Lead-Qualifier, Closer, Onboarding-CS, Support-Triage, Retention, Refund-Dispute). | "follow up lead", "closing", "onboarding", "refund" |
| `sovereign-squad-opsfinance` | L3 → CFO+COO | 6 sub-role (Invoice-Ops, Bookkeeping, Tax-Filing-ID, Payroll-BPJS, Reconciliation, Quota-Ledger). | "buat invoice", "filing pajak", "rekonsiliasi" |
| `sovereign-specialists` | L4 | Pakar on-demand (DevSecOps, Data, ID-Localization, Legal-ID, Customer-Insight, Growth, Prompt-Eng, Brutal-Verifier). | "panggil specialist", "second opinion", "brutal verify" |

---

## 🦾 Tier 3 — Actuation & Memory (L5)

| Skill | Layer | Fungsi singkat | Trigger |
|---|---|---|---|
| `sovereign-claw-actuation` | L5a | Actuator aksi KELUAR (WA/email, sosmed, API pihak ke-3, webhook, payment trigger). **Semua = HITL.** | "kirim", "posting", "broadcast", "trigger outbound" |
| `sovereign-hermes-memory` | L5b | Persistensi lintas-sesi & self-improving loop — simpan keputusan/pelajaran ke file/D1/KV. | "ingat ini", "simpan pelajaran", "recall", "decision log" |
| `sovereign-memory-dreaming` | — | Review session log → ekstrak pola → kurasi doctrine (Anthropic "Memory + Dreaming"). | "dreaming", "kurasi memori", "sesi sudah panjang" |

---

## 🔁 Tier 4 — Orchestration & Continuity (full-cycle)

| Skill | Fungsi singkat | Trigger |
|---|---|---|
| `sovereign-fullstack-cycle` | **Master Orchestrator** — full pipeline: ingest → scope → code (Hono+CF+D1) → build → test → PM2 → deploy → push → backup → README. | "full cycle", "kerjakan semua", "build sampai deploy" |
| `sovereign-orchestration-patterns` | Pola dekomposisi tugas (sequential pipeline, role-switching, best-of-N, map-reduce manual) — D-1 Truth-Lock (1 agent). | "pecah tugas", "decompose", "tournament" |
| `sovereign-cowork-handoff` | Tulis/baca `HANDOFF.md` agar sesi/agent berikutnya resume tanpa ingest ulang. FASE 0 & FASE 7. | "handoff", "tutup sesi", "continuity" |
| `sovereign-workflow-ops` | SOP operate harian sandbox: build → PM2 → port cleanup → curl test → log → D1 local → backup → README. | "operate", "restart", "build", "backup" |

---

## 🚀 Tier 5 — Deploy, VCS & Verification (CI/CD gates)

| Skill | Fungsi singkat | Trigger |
|---|---|---|
| `sovereign-cf-byok-deploy` | Deploy Hono/CF Pages ke akun Cloudflare user (BYOK): setup token → build → pages create → deploy → D1 prod → secrets → domain. | "deploy ke cloudflare", "byok deploy" |
| `sovereign-github-push` | Setup auth GitHub di sandbox → commit → remote → push (repo existing vs baru, force push first deploy). | "push github", "git push", "setup github" |
| `sovereign-hf-spaces-deploy` | Deploy proyek Docker (FastAPI/CrewAI/LangGraph/n8n) ke Hugging Face Spaces sebagai "VPS gratis". | "deploy ke hf", "push hugging face", "space docker" |
| `sovereign-verify-rubric` | DoD/verification gate brutal — build, test/curl + bukti, secret-scan, truth-lock, compliance. Lulus/gagal + bukti. | "verifikasi", "DoD", "brutal verify", "cek sebelum ship" |
| `sovereign-computer-browser-use` | FASE 4 verifikasi visual/runtime UI (PlaywrightConsoleCapture) — nol error JS, elemen ter-render. | "cek UI", "console error?", "test browser" |
| `sovereign-gtm-engineering` | Pola teknis landing/waitlist/pricing ID-first: lead capture D1 + consent PDP, SEO/OG/JSON-LD, sitemap. | "landing", "waitlist", "lead capture", "SEO setup" |

---

## 🛡️ Tier 6 — Governance, Security & Hardening (guardrail wajib)

| Skill | Fungsi singkat | Trigger |
|---|---|---|
| `sovereign-credit-aware` | Disiplin konsumsi credit Genspark — hindari tool mahal, pilih jalur murah (bash/curl/grep), batching, konfirmasi sebelum operasi berbiaya. | "hemat kredit", "credit aware", "budget mode" |
| `sovereign-enterprise-patterns` | Hardening produksi: rate limiting, security headers, audit log D1, UU PDP, CORS, input validation. **Gate sebelum prod.** | "hardening", "security", "rate limit", "UU PDP" |
| `sovereign-zero-trust` | Zero Trust agent: 5 kelas ancaman agentic, quarantine, least-privilege token, anti-poison memory, supply chain. | "zero trust", "prompt injection", "audit keamanan" |

---

## 🔌 Tier 7 — External Runtime (di luar edge, via HF Spaces / SaaS)

> Untuk beban yang **TIDAK bisa** jalan di Cloudflare edge (Python runtime, long-running, vector DB). Cloudflare Worker tetap jadi pintu edge → panggil layanan eksternal via REST.

| Skill | Fungsi singkat | Trigger |
|---|---|---|
| `sovereign-crewai-swarm` | Tim multi-agent (role/goal/task) di HF Spaces Docker, expose FastAPI REST, dipanggil dari Worker. | "crewai", "tim agent", "multi-agent swarm" |
| `sovereign-langgraph-statemachine` | Orkestrasi alur agent bersiklus (graph + state + HITL checkpoint) di HF Spaces, expose FastAPI. | "langgraph", "state machine", "workflow bercabang" |
| `sovereign-langchain-tools` | Agent LangChain dengan tool-calling/RAG (retriever, web, calculator, custom REST) di HF Spaces. | "langchain", "tool calling", "RAG", "retriever" |
| `sovereign-n8n-workflow` | n8n no-code automation (webhook, scheduler, 400+ app) di HF Spaces sebagai automation engine. | "n8n", "workflow automation", "webhook" |
| `sovereign-supabase-vault` | Supabase (Postgres + Auth + pgvector + Vault) saat butuh melampaui D1: auth penuh, RLS, embeddings, secret vault. | "supabase", "postgres", "auth", "pgvector" |

---

## 📚 Tier 8 — Platform Canon (pemahaman keseluruhan)

| Skill | Fungsi singkat | Trigger |
|---|---|---|
| `sovereign-agent-foundry` | Skill kanonik platform — intisari SELURUH SSOT (batch 1-3): apa itu SparkMind-OBP, 4-Layer Hybrid Lock, MoR Duitku, 6 sub-brand, model monetisasi, peta 2 pack skill. | "agent foundry", "sparkmind", "produk apa", "ssot ringkas" |

---

## 🧭 Peta cepat: "Saya mau ___ → load skill ___"

| Saya mau… | Load skill |
|---|---|
| Mulai sesi dari nol | `sovereign-system-prompt-opus-4.8` + `sovereign-master-boot` |
| Lanjut sesi sebelumnya | `sovereign-context-injection` + `sovereign-cowork-handoff` (baca `RESUME.md`/`HANDOFF.md`) |
| Bangun fitur sampai deploy | `sovereign-fullstack-cycle` |
| Cuma deploy ke Cloudflare | `sovereign-cf-byok-deploy` |
| Push ke GitHub | `sovereign-github-push` |
| Cek aman/siap ship | `sovereign-verify-rubric` + `sovereign-enterprise-patterns` |
| Hemat credit | `sovereign-credit-aware` |
| Rapat / keputusan bisnis | `sovereign-team-boot` (lalu C-Suite yang relevan) |
| Bikin landing/funnel | `sovereign-gtm-engineering` + `sovereign-squad-marketing` |
| Butuh Python/agent runtime | `sovereign-hf-spaces-deploy` + (`crewai`/`langgraph`/`langchain`/`n8n`) |

---

*Maintained sebagai SSOT katalog skill. Update file ini setiap kali menambah/menghapus/mengubah skill di `skills/`.*
