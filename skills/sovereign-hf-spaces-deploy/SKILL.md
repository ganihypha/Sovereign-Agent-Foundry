---
name: sovereign-hf-spaces-deploy
version: 1.0.0
description: >-
  SparkMind Sovereign HF deploy playbook — deploy & push proyek
  Docker (FastAPI swarm / CrewAI / LangGraph / n8n) ke Hugging Face
  Spaces sebagai "VPS gratis" eksternal untuk beban yang TIDAK bisa
  jalan di Cloudflare edge (Python runtime, long-running, n8n). Full
  workflow: siapkan repo Space (Dockerfile + requirements + app) →
  set HF secrets → git push ke huggingface.co/spaces/<user>/<space>
  → verifikasi endpoint :7860 → wire balik ke Worker via REST.
  Trigger: "deploy ke hf", "push hugging face", "jalankan crewai/
  langgraph/n8n di hf", "buat space docker", "hf spaces".
metadata:
  category: external
  skill_category: "ci-cd-deployment"   # Anthropic cat #7
  layer: L6-external
  owner: "Reza Estes / Haidar Faras + Gyss (spousal 50/50)"
  doctrine: "MASTER-ARCHITECT-PROMPT v5.0 + v7.0 + v8.0 OVERRIDE-LOCK · D-1 Truth-Lock"
  requires:
    bins: ["git", "git-lfs", "curl"]
    env: ["HF_TOKEN"]
  related_skills:
    - sovereign-crewai-swarm
    - sovereign-langchain-tools
    - sovereign-langgraph-statemachine
    - sovereign-n8n-workflow
    - sovereign-cf-byok-deploy
---

# sovereign-hf-spaces-deploy (L6 — External Compute on Hugging Face)

## ROLE

Deploy beban berat yang **TIDAK bisa jalan di Cloudflare Workers/Pages**
(Python interpreter, proses long-running, n8n VM-style) ke **Hugging
Face Spaces (Docker runtime)** sebagai compute eksternal gratis. CF
edge tetap jadi front-door (lihat `06-EXTERNAL-INTEGRATIONS`); skill
ini menyiapkan & mem-push sisi eksternalnya, lalu mengembalikan URL
REST agar Worker bisa memanggilnya.

> ⚠️ **Aturan main (SSOT §4)**: edge-native dulu. HF Spaces hanya
> dipakai kalau kebutuhan benar-benar melampaui batas edge (CrewAI/
> LangGraph/n8n Python). HF = **opsional**, bukan dependency CF Pages.

## KAPAN DIPAKAI

- User minta: "deploy ke HF", "push hugging face", "jalankan
  CrewAI/LangGraph/n8n", "buat Space Docker", "VPS gratis".
- Sudah ada (atau perlu dibuat) sebuah aplikasi Docker yang meng-expose
  HTTP di port **7860** (default HF).

## ⚠️ D-1 TRUTH-LOCK (jujur soal HF free tier)

| Klaim referensi | Realita yang dipakai |
|---|---|
| "VPS gratis 24/7" | HF free Space **tidur setelah ~48 jam idle**. Keep-alive cron (ping tiap ~30 mnt) = **patch, bukan SLA**. Tetap bisa mati saat maintenance HF. |
| "Unlimited compute" | CPU/RAM free terbatas (2 vCPU / 16GB shared, no GPU). "Upgrade GPU 1 klik" = **berbayar**. |
| "Selalu nyala produksi" | Untuk uptime serius → VPS/cloud berbayar. HF gratis = **eksperimen/training**, bukan produksi kritis. |

Sampaikan batas ini ke user, jangan jual "always-on gratis".

## PRASYARAT — token HF

`HF_TOKEN` (Write) wajib ada di env sandbox. Ambil dari
huggingface.co → Settings → Access Tokens (role **Write**).

```bash
# Cek token tersedia (JANGAN echo nilainya)
[ -n "$HF_TOKEN" ] && echo "HF_TOKEN OK" || echo "HF_TOKEN MISSING — minta user set di vault"
```

Token disimpan di vault gitignored (`SECRETS.local.md` / `.dev.vars`),
**tidak pernah** di-commit atau echo ke log.

## URUTAN WAJIB (jangan diacak)

### 1. Siapkan folder Space lokal

Build sisi eksternal **terpisah** dari `webapp/` CF (jangan campur
runtime). Default lokasi kerja:

```bash
mkdir -p /home/user/webapp/external/hf-space
cd /home/user/webapp/external/hf-space
```

Tiga file inti minimal (isi spesifik diisi oleh skill turunan
`sovereign-crewai-swarm` / `-langgraph-statemachine` / `-n8n-workflow`):

```
external/hf-space/
├── Dockerfile
├── requirements.txt        # (kalau Python)
└── app.py | main.py        # entrypoint FastAPI :7860
```

### 2. Dockerfile baku HF (port 7860)

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
ENV PORT=7860
EXPOSE 7860
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
```

> HF mengharuskan app listen di **0.0.0.0:7860**. Salah port → Space
> build OK tapi "Application not responding".

### 3. README.md Space dengan front-matter HF (WAJIB)

HF butuh header YAML agar tahu ini Docker Space + private:

```markdown
---
title: Hermes Swarm
emoji: 🛰️
colorFrom: indigo
colorTo: slate
sdk: docker
app_port: 7860
pinned: false
---

# Hermes External Swarm
Compute eksternal (CrewAI/LangGraph/n8n) untuk Hermes Agent edge.
```

`sdk: docker` + `app_port: 7860` = kunci. Tanpa ini HF salah deteksi SDK.

### 4. Buat Space via REST API (idempoten)

```bash
HF_USER="<hf-username>"           # mis. ganihypha
SPACE="hermes-god-mode-swarm"

curl -s -X POST https://huggingface.co/api/repos/create \
  -H "Authorization: Bearer $HF_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"type\":\"space\",\"name\":\"$SPACE\",\"sdk\":\"docker\",\"private\":true}"
# Sudah ada → balas error "already created" → aman, lanjut push.
```

Set **private** agar secret (Groq/CF) aman.

### 5. Set HF Space secrets (env — JANGAN di kode)

```bash
for KV in \
  "GROQ_API_KEY=$GROQ_API_KEY" \
  "PROXY_TOKEN=$PROXY_TOKEN" ; do
  K="${KV%%=*}"; V="${KV#*=}"
  curl -s -X POST \
    "https://huggingface.co/api/spaces/$HF_USER/$SPACE/secrets" \
    -H "Authorization: Bearer $HF_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"key\":\"$K\",\"value\":\"$V\",\"description\":\"sovereign\"}"
done
```

Key provider hidup **di sisi HF**, tidak pernah ke browser / repo.

### 6. Git push ke Space (auth via token di URL, JANGAN log)

```bash
cd /home/user/webapp/external/hf-space
git init -q 2>/dev/null || true
git lfs install 2>/dev/null || true
git add -A
git -c user.email="bot@sparkmind" -c user.name="sovereign" \
    commit -q -m "deploy: hermes external swarm" || true

# Inject token after scheme — JANGAN echo URL yang sudah berisi token
REMOTE="https://${HF_USER}:${HF_TOKEN}@huggingface.co/spaces/${HF_USER}/${SPACE}"
git remote remove hf 2>/dev/null || true
git remote add hf "$REMOTE"
git -c credential.helper= push -f hf HEAD:main
```

HF auto-build Docker setelah push (lihat tab "Logs" di UI Space).

### 7. Verifikasi (WAJIB — tunggu build selesai)

```bash
BASE="https://${HF_USER}-${SPACE}.hf.space"   # URL publik Space
curl -sI "$BASE/" | head -5
curl -s  "$BASE/health"        # endpoint health swarm
curl -s -X POST "$BASE/run" \
  -H "Authorization: Bearer $PROXY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"task":"ping"}'
```

Build pertama bisa 2–5 menit. "Application not responding" sementara =
masih building; cek tab Logs.

### 8. Wire balik ke Cloudflare Worker (REST bridge)

Simpan base URL Space sebagai **CF secret**, panggil dari Worker:

```bash
# di proyek webapp CF
echo "$BASE" | npx wrangler pages secret put SWARM_BASE_URL \
  --project-name <cloudflare_project_name>
```

Worker memanggil dengan **shared secret** (`PROXY_TOKEN`), bukan key
provider (konsisten `06-EXTERNAL-INTEGRATIONS §7`).

### 9. Keep-alive (opsional, jujur = patch)

Daftarkan ping `GET $BASE/health` tiap ~30 menit di cron-job.org untuk
menunda tidur 48 jam. **Bukan jaminan uptime** — komunikasikan apa adanya.

## KEAMANAN (WAJIB)

1. `HF_TOKEN` & key provider = **HF Space secret / vault**, tidak
   pernah di-commit, di-echo, atau ke frontend.
2. Space **private** by default.
3. Endpoint `/run` selalu cek **shared secret** (`PROXY_TOKEN` header).
4. Whitelist origin Worker + rate-limit di sisi Space.
5. Tidak ada aksi destruktif/eksternal tanpa **HITL** (no YOLO) — SSOT §5.

## FAILURE MODES

| Gejala | Penyebab / fix |
|---|---|
| `HF_TOKEN MISSING` | Token belum di vault. STOP, minta user set token Write HF. |
| push 403 | Token bukan role **Write**, atau bukan owner Space. Regenerate token Write. |
| Space build gagal | Lihat tab **Logs** di UI. Biasanya `requirements.txt` / port salah. |
| "Application not responding" | App tidak listen `0.0.0.0:7860`, atau masih building. |
| 401 di `/run` | `PROXY_TOKEN` Worker ≠ secret Space. Samakan nilainya. |
| Space tidur | Idle >48 jam. Pasang keep-alive cron (patch, bukan SLA). |
| `git lfs` error | Model/asset besar tanpa LFS. `git lfs track "*.bin"` sebelum add. |

## OUT OF SCOPE

- Isi logika CrewAI → skill `sovereign-crewai-swarm`.
- LLM client & custom tools → `sovereign-langchain-tools`.
- State machine / self-healing loop → `sovereign-langgraph-statemachine`.
- n8n workflow automation → `sovereign-n8n-workflow`.
- Deploy front-door CF Pages → `sovereign-cf-byok-deploy`.
- Secret-scan pra-push → `sovereign-zero-trust`.
