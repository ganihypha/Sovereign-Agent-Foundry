---
name: sovereign-agent-foundry
version: 2.0.0
description: >-
  SOVEREIGN AGENT FOUNDRY — skill kanonik platform/produk. Intisari
  dari SELURUH SSOT Canonical Doc (batch 1-3): apa itu SparkMind-OBP
  (marketplace 36 sovereign skill agentik), arsitektur 4-Layer Hybrid
  Lock, MoR Oasis BI Pro + Duitku, 6 sub-brand, model monetisasi, dan
  peta dua pack skill (Sovereign-Skills v5.0 + Agentic-Team v2.0).
  Dipakai untuk memahami "keseluruhan" sebelum membangun/menjual/
  mengoperasikan apa pun. Trigger: "agent foundry", "sparkmind",
  "marketplace", "produk apa", "platform", "katalog skill", "monetisasi",
  "ssot ringkas", "4 layer lock".
metadata:
  category: platform-canon
  skill_category: "business-process-automation"
  owner: "Reza Estes / Haidar Faras + Gyss (spousal 50/50)"
  doctrine: "MASTER-ARCHITECT-PROMPT v5.0 + v7.0 + v8.0 OVERRIDE-LOCK · D-1 Truth-Lock"
  canonical_source: "docs/ssot/ (00-13 + batch-2-operasional + batch-3-skala)"
  repo: "https://github.com/ganihypha/Sovereign-Agent-Foundry"
  live: "https://sparkmind-obp.pages.dev"
  related_skills:
    - sovereign-system-prompt-opus-4.8
    - sovereign-master-boot
    - sovereign-team-boot
    - sovereign-agent-foundry-context
  requires:
    bins: ["cat", "ls"]
    tools: []
---

# sovereign-agent-foundry

Skill **kanonik platform** — peta tunggal "apa keseluruhannya". Bila
butuh detail, rujuk SSOT di `docs/ssot/`; skill ini adalah ringkasan
yang selalu cukup untuk mengambil keputusan cepat & benar.

## 1. APA INI

**SparkMind-OBP** = **marketplace 36 sovereign skill agentik** yang
dijual sebagai **produk digital** (ZIP `SKILL.md`). 100% Cloudflare-
Native (Hono + Pages + D1), **ZERO VPS**. PRODUCTION LIVE.

- Mother brand: **SparkMind** (`sparkmind.web.id`) — "Sovereign Agent
  Foundry, ekosistem skill agentik siap-pakai".
- MoR: **Oasis BI Pro (OBP)** (`oasis-bi-pro.web.id`) via PJP **Duitku**
  (QRIS/VA, diawasi BI). Mode PRODUCTION (uang riil).
- Katalog: **36 skill**, **6 sub-brand**, harga **Rp 59k–149k**.

## 2. 4-LAYER HYBRID LOCK (doctrine)

```
Layer 1 Brand      : SparkMind (mother)
Layer 2 Merchant   : Oasis BI Pro (Merchant-of-Record)
Layer 3 Domain     : sub-brand produk
Layer 4 Compliance : brand_ledger OBP (audit settlement)
```
Disclosure MoR WAJIB hadir di footer & checkout (`src/data/brands.ts`).

## 3. SUB-BRAND (6)

| Sub-brand | Warna | Fokus |
|---|---|---|
| SparkMind Core | indigo | Skill fondasi & orkestrasi agent |
| BarberKas | amber | Kas & operasional barbershop |
| KuratorKas | green | Kurasi konten & knowledge ops |
| PaceLokal | red | Aktivasi bisnis lokal & GTM |
| Nurani.OS | sky | Donasi, sosial & compliance |
| MomentKas | purple | Event & moment monetization |

## 4. DUA PACK SKILL (arsitektur agentik)

> D-1 Truth-Lock: 1 agent/sesi. "Full team" = role-switching, bukan paralel.

```
PACK A — SOVEREIGN-SKILLS v5.0 (BAGAIMANA eksekusi teknis)
  system-prompt-opus-4.8 (identitas) → master-boot → context-injection
   → credit-aware (guard) → orchestration-patterns → verify-rubric
   → zero-trust → workflow-ops → cf-byok-deploy → github-push
   → fullstack-cycle (orkestrator) → cowork-handoff → computer-browser-use
   → enterprise-patterns → gtm-engineering → memory-dreaming
   → integrasi L6: crewai-swarm · langchain-tools · langgraph-statemachine
     · n8n-workflow · hf-spaces-deploy · supabase-vault

PACK B — AGENTIC-TEAM v2.0 (SIAPA yang memutuskan)
  team-boot → orchestrator (L1) → cofounder (L0.5)
   → C-Suite L2: cto · cmo · cpo · cfo · coo
   → squads L3: engineering · product · marketing · sales-cs · opsfinance
   → specialists (L4) → claw-actuation (L5a) · hermes-memory (L5b)
```

## 5. MODEL MONETISASI (monetize EVERY capability)

- **Per-skill** (Rp 59k–149k) — produk digital ZIP.
- **All-Access Bundle** (Rp 990k) — anchor offer 36 skill.
- **Founder Pass** — continuity/langganan.
- **Done-for-You** — high-ticket service (lead via `/api/intake`).
- **Partner / MoR-as-a-Service** — white-label.
> Detail: `docs/ssot/05-MONETIZATION-DOC.md` + `src/data/offers.ts`.

## 6. 7 NON-NEGOTIABLES (ringkas)

Sovereignty · Zero-cost (Rp 0) · Indonesia-first · Auditable ·
Composable · Brutal-verified · Hardened. (Detail: system-prompt-opus-4.8.)

## 7. PETA SSOT (di mana semuanya)

| Mau apa | Baca |
|---|---|
| Gambaran penuh | `00-SSOT-CANONICAL-INDEX.md` |
| Produk & user | `01-PRD` · `02-DESIGN` |
| Teknis & live | `03-ARCHITECT` · `04-PRODUCTIONIZED` |
| Uang | `05-MONETIZATION` |
| Strategi/menang/dominasi | `06`/`07`/`08` |
| GTM/launch/roadmap | `09`/`11`/`12` |
| Legal/compliance | Legal Hub `/legal` + `13-GAP-ANALYSIS` |
| Operasional 1 sesi | `batch-2-operasional/` (B2-01..B2-05) |
| Skala/AaaS/insiden | `batch-3-skala/` (B3-01..B3-03) |

## 8. CARA PAKAI

- Onboarding owner/partner → skill ini → 01 → 04 → 05.
- Bangun fitur baru → skill ini (konteks) → `fullstack-cycle`.
- Jual/operasikan → skill ini → offers.ts + Legal Hub + B3 playbook.

## HITL & GUARDRAILS

Patuhi gate dari `sovereign-system-prompt-opus-4.8` (payment/legal/
customer-facing/secret = HITL). Disclosure MoR wajib. Harga = wewenang
CFO+owner. D-1 Truth-Lock pada semua klaim produk.

## Out of scope

- Identitas/etika → `sovereign-system-prompt-opus-4.8`.
- Load skill teknis → `sovereign-master-boot` / `sovereign-team-boot`.
- State antar-sesi → `sovereign-agent-foundry-context`.
