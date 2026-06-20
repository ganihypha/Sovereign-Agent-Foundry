---
name: sovereign-langgraph-statemachine
version: 1.0.0
description: >-
  SparkMind Sovereign LangGraph state machine — orkestrasi alur agent
  multi-step bersiklus (graph: node + edge + state persist + human-in-
  the-loop checkpoint) di Hugging Face Spaces (Python), di-expose
  FastAPI, dipanggil dari Cloudflare Worker. Pakai untuk workflow
  bercabang/berulang yang butuh state & approval di tengah jalan
  (TIDAK bisa di edge). Trigger: "langgraph", "state machine", "graph
  agent", "workflow bercabang", "human in the loop checkpoint", "alur agent".
metadata:
  category: external
  skill_category: "agent-orchestration"
  layer: L6-external
  owner: "Reza Estes / Haidar Faras + Gyss (spousal 50/50)"
  doctrine: "MASTER-ARCHITECT-PROMPT v5.0 + v7.0 + v8.0 OVERRIDE-LOCK · D-1 Truth-Lock"
  deploy_via: sovereign-hf-spaces-deploy
  requires:
    runtime: "Python 3.11 (HF Docker Space) — BUKAN Cloudflare edge"
    env: ["GROQ_API_KEY", "PROXY_TOKEN"]
  related_skills:
    - sovereign-hf-spaces-deploy
    - sovereign-langchain-tools
    - sovereign-crewai-swarm
---

# sovereign-langgraph-statemachine (L6 — LangGraph on HF)

## ROLE
Definisikan alur agent sebagai **graph berstate**: node = langkah/
keputusan, edge = transisi (termasuk kondisional & siklus), state =
data yang mengalir + checkpoint persist. Cocok untuk workflow yang
bercabang, berulang, dan butuh **human-in-the-loop** di titik tertentu.
Berjalan di HF Space (Python); edge hanya memanggil + meng-gate.

## KAPAN PAKAI (vs alternatif)
- Alur linear sederhana → cukup `sovereign-orchestration-patterns`
  (sequential, di edge/sandbox).
- Tool-use 1-2 langkah → `sovereign-langchain-tools`.
- **Bercabang/siklus + state + approval di tengah** → LangGraph (skill
  ini).

## POLA GRAPH (ringkas)
```
START → [node: plan] → [node: act (tools)] → kondisi?
          ↑                                   ├─ lanjut → [node: verify]
          └──────────── loop (retry) ─────────┘            │
                                                  approval? → [HITL checkpoint]
                                                              → END (persist state)
```
- **Checkpointer**: simpan state tiap transisi (resume-able). Persist
  hasil final ke Cloudflare D1/KV (sumber kebenaran tetap edge).
- **HITL checkpoint**: graph berhenti di node approval → kirim ke owner
  (via Worker) → lanjut setelah approve. Aksi keluar tetap via Claw L5a.

## ENV & DEPLOY
- Deploy via `sovereign-hf-spaces-deploy` (Docker + FastAPI).
- LLM: ChatGroq free/fast → fallback OpenRouter/Gemini. Secrets di HF
  Space settings + `wrangler secret` untuk PROXY_TOKEN di Worker.

## KPI
% run selesai tanpa intervensi · jumlah loop rata-rata (hemat) ·
checkpoint resume success · latensi · biaya LLM (free-tier target).

## HITL TRIGGERS
- Node yang memicu aksi keluar / uang / data riil → checkpoint approval
  owner WAJIB sebelum transisi lanjut.

## GUARDRAILS
- Batas siklus (`recursion_limit`) + timeout WAJIB — cegah loop tak
  hingga (credit-aware).
- State JANGAN menyimpan secret mentah; simpan referensi/terenkripsi.
- D-1 Truth-Lock: layanan eksternal HF, bukan edge; jelaskan ke owner.
- Validasi transisi (prompt-injection defense, `sovereign-zero-trust`).

## Out of scope
- Tool individual → `sovereign-langchain-tools`.
- Deploy Space → `sovereign-hf-spaces-deploy`.
