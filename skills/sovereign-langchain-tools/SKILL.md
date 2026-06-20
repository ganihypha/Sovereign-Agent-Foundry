---
name: sovereign-langchain-tools
version: 1.0.0
description: >-
  SparkMind Sovereign LangChain tools — bangun agent LangChain dengan
  tool-calling (retriever, web, calculator, custom REST) di Hugging
  Face Spaces (Python), di-expose FastAPI REST, dipanggil dari
  Cloudflare Worker edge. LLM via ChatGroq (free/fast) → fallback
  OpenRouter/Gemini. Pakai saat butuh tool-use/RAG yang TIDAK bisa di
  edge. Trigger: "langchain", "tool calling", "RAG", "retriever",
  "agent tools", "chain".
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
    - sovereign-crewai-swarm
    - sovereign-langgraph-statemachine
---

# sovereign-langchain-tools (L6 — LangChain Tool-Use on HF)

## ROLE
Agent LangChain yang bisa **memanggil tool** (RAG retriever, web
fetch, kalkulasi, custom REST ke API internal). Berjalan di HF Space
(Python) karena tool-loop & dependency berat TIDAK muat di edge.
Cloudflare Worker = gateway tipis ke endpoint ini (proxy + HITL gate).

## ARSITEKTUR (D-1 Truth-Lock soal batas edge)
```
[CF Worker edge]  --REST (PROXY_TOKEN)-->  [HF Space FastAPI]
  - rate limit                              - LangChain AgentExecutor
  - HITL gate outbound                      - tools: retriever/web/calc/REST
  - simpan hasil ke D1                       - LLM: ChatGroq → fallback
```
Edge TIDAK menjalankan LangChain; ia hanya memanggilnya. Storage hasil
tetap Cloudflare-native (D1/KV/R2).

## TOOL PATTERN (ringkas)
- Definisikan tool sebagai fungsi ber-`@tool` (nama+deskripsi jelas →
  model paham kapan pakai).
- `AgentExecutor` dengan `max_iterations` kecil (cost guard).
- Custom REST tool memanggil API internal pakai token; JANGAN expose
  secret ke output.
- RAG: embeddings free-tier + vector store ringan (FAISS lokal di
  Space) atau Supabase pgvector (`sovereign-supabase-vault`).

## ENV & DEPLOY
- Deploy via `sovereign-hf-spaces-deploy` (Docker, FastAPI).
- Secrets di HF Space settings (GROQ_API_KEY, PROXY_TOKEN) — BUKAN di
  repo. Worker simpan PROXY_TOKEN via `wrangler secret`.

## KPI
Tool-call success rate · iterasi rata-rata (makin kecil makin hemat) ·
latensi end-to-end · biaya LLM (target free-tier).

## HITL TRIGGERS
- Tool yang melakukan aksi keluar (kirim/posting/bayar) → lewat Claw
  L5a + HITL owner, BUKAN langsung dari agent.
- Tool yang menulis data riil / memanggil API berbayar.

## GUARDRAILS
- `max_iterations` + timeout WAJIB (cegah loop mahal — credit-aware).
- Validasi & sanitasi input tool (prompt-injection defense, selaras
  `sovereign-zero-trust`).
- D-1 Truth-Lock: jelaskan bahwa ini layanan eksternal HF, bukan edge.
- Free-tier first: ChatGroq/Gemini sebelum opsi berbayar.

## Out of scope
- State machine multi-step kompleks → `sovereign-langgraph-statemachine`.
- Deploy HF Space → `sovereign-hf-spaces-deploy`.
