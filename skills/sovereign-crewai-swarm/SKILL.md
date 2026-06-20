---
name: sovereign-crewai-swarm
version: 1.0.0
description: >-
  SparkMind Sovereign CrewAI orchestration — bangun tim multi-agent
  (role/goal/task) yang berjalan di Hugging Face Spaces (Docker) dan
  di-expose sebagai FastAPI REST agar bisa dipanggil dari Cloudflare
  Worker edge. CrewAI = Komandan orkestrasi (membagi tugas ke agen
  spesifik); LLM ditarik via LangChain ChatGroq (blazing fast). Pakai
  saat butuh penalaran multi-agent yang TIDAK bisa di edge (Python).
  Trigger: "crewai", "tim agent", "multi-agent swarm", "orkestrasi
  agen", "crew of agents".
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
    - sovereign-langgraph-statemachine
---

# sovereign-crewai-swarm (L6 — CrewAI Multi-Agent on HF)

## ROLE

Orkestrasi **tim agent CrewAI** (Agent → Task → Crew) yang membagi
satu tujuan besar ke beberapa agen spesialis (Researcher, Writer,
Reviewer, dst) secara otonom. Berjalan **eksternal di HF Spaces**
(Python), dipanggil Worker CF via REST.

> ⚠️ **Truth-Lock**: CrewAI = **Python**, tidak bisa native di CF
> Workers (V8 isolate). Skill ini SELALU dideploy lewat
> `sovereign-hf-spaces-deploy`. Kalau cuma butuh tool ringan/crawl →
> tetap di edge, jangan tarik CrewAI.

## KAPAN DIPAKAI

- Tugas butuh ≥2 peran agen yang berkolaborasi (riset → tulis → review).
- Penalaran berlapis yang berat untuk satu Worker.
- User minta "crew", "tim agent", "multi-agent".

Jangan dipakai untuk: 1 panggilan LLM sederhana (cukup proxy Groq edge),
atau crawl/scrape (cukup `/crawl` REST CF).

## requirements.txt (pin versi — stabil)

```
crewai==0.100.0
langchain-groq==0.4.0
langchain-core==0.3.40
fastapi==0.115.0
uvicorn[standard]==0.30.6
groq==0.18.0
requests==2.32.3
```

## main.py — Crew + FastAPI gateway

```python
import os
from fastapi import FastAPI, Header, HTTPException
from pydantic import BaseModel
from crewai import Agent, Crew, Process, Task
from langchain_groq import ChatGroq

# LangChain ChatGroq = base LLM client (lihat skill sovereign-langchain-tools)
llm = ChatGroq(
    temperature=0.2,
    groq_api_key=os.environ["GROQ_API_KEY"],
    model_name=os.getenv("MODEL_NAME", "llama-3.3-70b-versatile"),
)

researcher = Agent(
    role="Senior Researcher",
    goal="Kumpulkan fakta akurat & terverifikasi tentang {topic}",
    backstory="Analis brutal-honest; tidak mengarang sumber.",
    llm=llm, verbose=True, allow_delegation=False,
)
writer = Agent(
    role="Technical Writer",
    goal="Tulis ringkasan jelas & jujur dari temuan researcher",
    backstory="Penulis ringkas, tanpa hype kosong.",
    llm=llm, verbose=True, allow_delegation=False,
)

def build_crew(topic: str) -> Crew:
    t1 = Task(description=f"Riset mendalam: {topic}",
              expected_output="Bullet fakta + sumber", agent=researcher)
    t2 = Task(description="Ringkas temuan jadi laporan singkat",
              expected_output="Laporan markdown <300 kata", agent=writer,
              context=[t1])
    return Crew(agents=[researcher, writer], tasks=[t1, t2],
                process=Process.sequential, verbose=True)

app = FastAPI()
PROXY_TOKEN = os.environ.get("PROXY_TOKEN", "")

class RunReq(BaseModel):
    topic: str

@app.get("/health")
def health():
    return {"ok": True, "engine": "crewai"}

@app.post("/run")
def run(req: RunReq, authorization: str = Header(default="")):
    # Gate dengan shared secret — bukan key provider
    if PROXY_TOKEN and authorization != f"Bearer {PROXY_TOKEN}":
        raise HTTPException(status_code=401, detail="unauthorized")
    result = build_crew(req.topic).kickoff()
    return {"ok": True, "result": str(result)}
```

`Dockerfile` & deploy = ikut `sovereign-hf-spaces-deploy` (entrypoint
`main:app`, port 7860).

## POLA PROSES

| Process | Kapan |
|---|---|
| `sequential` (default) | Pipeline jelas: riset → tulis → review |
| `hierarchical` | Ada manager agent yang delegasi dinamis (butuh `manager_llm`) |

Mulai dari `sequential` — paling deterministik & murah token. Naik ke
hierarchical hanya kalau delegasi dinamis benar dibutuhkan.

## PANGGILAN DARI WORKER (edge → swarm)

```ts
// di Hono Worker — keys aman sebagai CF secret
const r = await fetch(`${env.SWARM_BASE_URL}/run`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${env.PROXY_TOKEN}`,
  },
  body: JSON.stringify({ topic: userInput }),
})
const data = await r.json()
```

## GUARDRAILS

- `allow_delegation=False` default — cegah loop delegasi tak terkendali
  yang membakar token.
- Set `max_iter` / timeout per task; CrewAI bisa loop & boros token.
- Output agent = **draft**, bukan kebenaran final → tetap brutal-verify
  (D-1) sebelum dipakai untuk keputusan/aksi.
- Aksi eksternal (kirim pesan, transaksi) → **HITL**, tidak otonom.
- Key provider hanya di HF secret; `/run` selalu cek shared secret.

## KPI

Task selesai tanpa loop liar · token per run (target turun) · akurasi
output vs verifikasi · latency edge→swarm→edge.

## FAILURE MODES

| Gejala | Fix |
|---|---|
| Build HF gagal di `crewai` | Pin versi sesuai requirements; cek log build Space. |
| Run hang / token meledak | Set `max_iter`, `max_execution_time`; `allow_delegation=False`. |
| 401 dari `/run` | `PROXY_TOKEN` Worker ≠ secret Space. |
| `GROQ_API_KEY` error | Belum di-set sebagai HF Space secret. |
| Output mengarang sumber | Tambah instruksi anti-halusinasi + verify pass. |

## OUT OF SCOPE

- Deploy/push Space → `sovereign-hf-spaces-deploy`.
- LLM client & custom tool definitions → `sovereign-langchain-tools`.
- Self-healing retry / conditional flow → `sovereign-langgraph-statemachine`.
- Workflow automation no-code → `sovereign-n8n-workflow`.
