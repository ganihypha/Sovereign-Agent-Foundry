# B6-00 — AI Orchestration A2A (LangChain + LangGraph + CrewAI)

> **Batch 6 · 2026-06-21 · Status: 🟢 LIVE & VERIFIED**
> Realisasi nyata Tier-7 External Runtime: tiga framework orkestrasi disatukan menjadi
> **satu service A2A (Agent-to-Agent)**, dipanggil dari edge Cloudflare lewat gateway Hono.

## 1. Tujuan
Mengubah skill konseptual `crewai-swarm`, `langgraph-statemachine`, `langchain-tools`
menjadi **satu runnable orchestrator** yang bisa dipanggil produk SparkMind-OBP — tanpa
melanggar batas runtime Cloudflare (Python diletakkan di HF Space; edge tetap jadi pintu).

## 2. Arsitektur
```
Client ──► Hono Worker  POST /api/orchestrate ──► (HITL gate di edge)
                                                      │  force_approve?
                                                      ▼
                       HF Space (FastAPI/Docker)  POST /orchestrate
                                                      │
                            LangGraph state machine  │
                            plan → gate(HITL) → tools → crew → finalize
                              │           │        │       │
                         (LLM Groq)    HITL   LangChain  CrewAI
                                              tools     (planner→
                                              registry   executor→
                                                         reviewer)
```

## 3. Komponen
| Layer | Framework | Implementasi |
|---|---|---|
| Tools | **LangChain-core** | Registry tool: `calc`, `echo`, `word_count` + eksekutor aman |
| Control | **LangGraph** | `StateGraph` 6-node + conditional edge (gate → tools / halt) |
| Agents | **CrewAI** | Crew sekuensial planner → executor → reviewer |
| LLM | **Groq** | `llama-3.3-70b-versatile` (via `langchain_groq`) |
| Edge | **Hono** | `POST /api/orchestrate` (proxy + HITL gate), `GET /api/orchestrate/health` |

## 4. Human-in-the-Loop (HITL) — dua lapis
1. **Edge gate (Hono):** deteksi kata kunci sensitif (payment/legal/secret/deploy/refund/email).
   Tanpa `x-hitl-token` yang valid → **HTTP 202 `hitl_required`** (manusia harus approve).
2. **Engine gate (LangGraph node `gate`):** bila `HITL_AUTO_APPROVE != 1` → pipeline `halt`
   sampai gateway mengirim `force_approve: true`.

## 5. Bukti verifikasi (Truth-Lock)
- `GET /health` → `{langchain:true, langgraph:true, crewai:true, llm:true, model:"llama-3.3-70b-versatile"}` ✅
- `POST /orchestrate {"objective":"3 ide konten TikTok warung kopi UMKM"}` → output LLM nyata (Bahasa Indonesia) ✅
- Gateway normal → `status:ok, hitl:auto` ✅
- Gateway payment tanpa token → `status:hitl_required` (202) ✅
- Gateway payment + token benar → `status:ok, hitl:approved` ✅

## 6. Lokasi & deployment
| Aset | Lokasi |
|---|---|
| Orchestrator source | `/home/user/ai-orch-space/` (main.py, Dockerfile, requirements.txt, README.md) |
| HF Space (LIVE) | https://elmatador0197-ai-orchestrationl.hf.space |
| HF Space repo | https://huggingface.co/spaces/elmatador0197/AI-Orchestrationl |
| Edge gateway | `src/index.tsx` → `POST /api/orchestrate`, `GET /api/orchestrate/health` |
| Bindings | `src/types.ts` → `ORCH_URL`, `ORCH_API_KEY?`, `ORCH_HITL_TOKEN?` |

## 7. Env / Secrets
**HF Space:** `GROQ_API_KEY` (✅ set), `HITL_AUTO_APPROVE=1`, opsional `ORCH_API_KEY`.
**CF Pages (production, T15):**
```bash
npx wrangler pages secret put ORCH_URL          # https://elmatador0197-ai-orchestrationl.hf.space
npx wrangler pages secret put ORCH_HITL_TOKEN   # token approval HITL
npx wrangler pages secret put ORCH_API_KEY      # (opsional)
```

## 8. Next (T15)
- Set secret `ORCH_URL` + `ORCH_HITL_TOKEN` di CF Pages production (BYOK).
- UI tipis di `/foundry` untuk memanggil `/api/orchestrate` (demo outcome engine).
- Tambah tool LangChain domain-spesifik (retriever katalog skill, kalkulator harga paket).
