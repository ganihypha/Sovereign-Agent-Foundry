---
name: sovereign-n8n-workflow
version: 1.0.0
description: >-
  SparkMind Sovereign n8n automation — jalankan n8n (workflow no-code:
  webhook, scheduler, integrasi 400+ app) di Hugging Face Spaces
  (Docker) sebagai automation engine eksternal. Cloudflare Worker jadi
  trigger/receiver via webhook; n8n meng-orkestrasi tugas yang butuh
  proses long-running (TIDAK bisa di edge). Termasuk auth dasar &
  persistensi data.
  Trigger: "n8n", "workflow automation", "webhook", "automasi", "zapier
  alternatif", "scheduler".
metadata:
  category: external
  skill_category: "workflow-automation"
  layer: L6-external
  owner: "Reza Estes / Haidar Faras + Gyss (spousal 50/50)"
  doctrine: "MASTER-ARCHITECT-PROMPT v5.0 + v7.0 + v8.0 OVERRIDE-LOCK · D-1 Truth-Lock"
  deploy_via: sovereign-hf-spaces-deploy
  requires:
    runtime: "Docker (HF Space) — image n8nio/n8n, BUKAN Cloudflare edge"
    env: ["N8N_BASIC_AUTH_USER", "N8N_BASIC_AUTH_PASSWORD", "WEBHOOK_URL"]
  related_skills:
    - sovereign-hf-spaces-deploy
    - sovereign-crewai-swarm
---

# sovereign-n8n-workflow (L6 — n8n Automation on HF)

## ROLE

Jalankan **n8n** (automation no-code/low-code) di HF Spaces Docker
sebagai engine workflow eksternal: webhook in/out, scheduler, integrasi
ratusan app. CF Worker = trigger/receiver via webhook; n8n menangani
proses long-running yang **tidak mungkin di edge**.

> ⚠️ **Truth-Lock**: n8n butuh proses long-running + disk → **tidak
> bisa native di CF Workers/Pages**. WAJIB eksternal (HF/VPS). Di HF
> free tier ada batas berat — lihat batas jujur di bawah.

## ⚠️ BATAS JUJUR n8n DI HF FREE

| Aspek | Realita |
|---|---|
| Persistensi | Container HF **ephemeral** — data n8n bisa hilang saat rebuild/sleep. Untuk produksi WAJIB DB eksternal (Postgres) atau volume berbayar. |
| Sleep 48 jam | Workflow scheduler **mati saat Space tidur**. Trigger eksternal (webhook) + keep-alive cron = patch, bukan SLA. |
| Resource | CPU/RAM terbatas; workflow berat bisa OOM. |

Untuk automasi kritis/produksi → VPS/n8n Cloud. HF = eksperimen/dev.

## KAPAN DIPAKAI

- Butuh webhook receiver / scheduler / integrasi banyak app tanpa nulis
  kode tiap konektor.
- Worker edge perlu melempar event ke pipeline automasi.

Jangan dipakai untuk: logika ringan yang cukup di Worker, atau data
kritis yang tidak boleh hilang (HF ephemeral).

## Dockerfile (image resmi n8n)

```dockerfile
FROM n8nio/n8n:latest
# HF expose 7860; n8n default 5678 → arahkan via env
ENV N8N_PORT=7860
ENV N8N_LISTEN_ADDRESS=0.0.0.0
EXPOSE 7860
# user node sudah default di image n8n
```

> Catatan: image `n8nio/n8n` berbasis Node, bukan Python — **tidak**
> perlu `requirements.txt`. README front-matter HF tetap `sdk: docker`,
> `app_port: 7860`.

## HF Space secrets (env n8n — JANGAN di kode)

Set lewat `sovereign-hf-spaces-deploy` step 5:

```
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=<user>
N8N_BASIC_AUTH_PASSWORD=<password-kuat>
N8N_HOST=<hf-user>-<space>.hf.space
N8N_PROTOCOL=https
WEBHOOK_URL=https://<hf-user>-<space>.hf.space/
N8N_ENCRYPTION_KEY=<random-32-char>
# Persistensi (disarankan untuk apa pun selain coba-coba):
DB_TYPE=postgresdb
DB_POSTGRESDB_HOST=<host-postgres-eksternal>
DB_POSTGRESDB_DATABASE=<db>
DB_POSTGRESDB_USER=<user>
DB_POSTGRESDB_PASSWORD=<pass>
```

Tanpa DB eksternal, n8n pakai SQLite di disk ephemeral → **data hilang
saat rebuild**. Komunikasikan ini ke user sebelum dipakai serius.

## WIRE: CF Worker → n8n webhook

n8n bikin node **Webhook** (production URL:
`https://<space>.hf.space/webhook/<path>`). Worker memanggil:

```ts
// Hono Worker — kirim event ke n8n
await fetch(`${env.N8N_BASE_URL}/webhook/hermes-event`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Proxy-Token": env.PROXY_TOKEN,   // gate shared secret
  },
  body: JSON.stringify({ type: "task", payload }),
})
```

n8n bisa balas ke Worker (Respond to Webhook node) atau panggil swarm
CrewAI/LangGraph via HTTP Request node.

## DEPLOY

Ikuti `sovereign-hf-spaces-deploy` (buat Space Docker private → set
secrets di atas → git push). Setelah build, buka
`https://<hf-user>-<space>.hf.space` → login Basic Auth → buat workflow.

## GUARDRAILS

- **Basic Auth WAJIB aktif** (`N8N_BASIC_AUTH_ACTIVE=true`) — UI n8n
  jangan pernah terbuka publik tanpa auth.
- Webhook yang menerima dari Worker harus cek **shared secret**
  (`X-Proxy-Token`) di node IF pertama.
- Jangan simpan credential pihak ketiga di workflow yang ter-export ke
  git — pakai n8n Credentials (terenkripsi via `N8N_ENCRYPTION_KEY`).
- Aksi eksternal berisiko (kirim WA, transaksi) → node konfirmasi /
  **HITL**, bukan auto-fire.
- Ingatkan user soal data ephemeral HF (backup workflow JSON berkala).

## KPI

Workflow jalan tanpa kehilangan data tak terduga · webhook latency ·
zero UI terbuka tanpa auth · jumlah workflow ter-backup.

## FAILURE MODES

| Gejala | Fix |
|---|---|
| Space "not responding" | n8n tidak listen :7860 — set `N8N_PORT=7860` + `N8N_LISTEN_ADDRESS=0.0.0.0`. |
| Data workflow hilang | Disk ephemeral — pindah ke `DB_TYPE=postgresdb` eksternal. |
| Webhook 404 | Workflow belum **Active**, atau pakai URL test bukan production. |
| Login gagal | Basic auth env salah; cek secret di Space. |
| Scheduler tidak jalan | Space tidur — trigger via webhook eksternal + keep-alive. |

## OUT OF SCOPE

- Multi-agent reasoning → `sovereign-crewai-swarm`.
- State machine / retry loop → `sovereign-langgraph-statemachine`.
- Deploy/push mekanik Space → `sovereign-hf-spaces-deploy`.
- Front-door chat/API edge → proyek CF Pages (`sovereign-cf-byok-deploy`).
