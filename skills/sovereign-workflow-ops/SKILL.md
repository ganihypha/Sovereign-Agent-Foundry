---
name: sovereign-workflow-ops
version: 2.0.0
description: >-
  SparkMind Sovereign operate playbook — workflow harian di sandbox
  Genspark AI Dev untuk proyek Hono/Cloudflare Pages: build → PM2
  start/restart → port cleanup → test curl → log non-blocking → D1
  local migrate/seed/reset → backup (ProjectBackup + AI Drive tar.gz)
  → README discipline. Dipakai sebagai SOP operate semua sub-brand
  SparkMind (BarberKas / KuratorKas / PaceLokal / Nurani / MomentKas).
metadata:
  category: ops
  owner: "Reza Estes / Haidar Faras + Gyss (spousal 50/50)"
  doctrine: "MASTER-ARCHITECT-PROMPT v5.0 + v7.0 + v8.0 OVERRIDE-LOCK"
  requires:
    bins: ["npm", "npx", "pm2", "wrangler", "git", "tar"]
    tools: ["GetServiceUrl", "ProjectBackup"]
---

# sovereign-workflow-ops

SOP operate harian proyek di sandbox Genspark AI Dev. Direktori kerja
WAJIB: `/home/user/webapp`. Setiap perintah bash mulai dengan
`cd /home/user/webapp && ...` (cwd reset tiap invocation).

## Kapan dipakai

- User bilang: "jalankan", "restart", "start service", "cek log",
  "reset db", "backup", "operate", "workflow".

## A. Standard service start/restart (urutan EXACT)

```bash
# 1. Bersihkan port 3000
fuser -k 3000/tcp 2>/dev/null || true
pm2 delete all 2>/dev/null || true

# 2. Build (WAJIB sebelum first start / setelah perubahan besar)
cd /home/user/webapp && npm run build        # timeout 300s+

# 3. Start via PM2 (JANGAN pernah npm run dev langsung / pakai &)
cd /home/user/webapp && pm2 start ecosystem.config.cjs

# 4. Test
curl -s http://localhost:3000 | head -20
curl -s http://localhost:3000/api/hello

# 5. Log non-blocking (JANGAN tail -f / pm2 logs tanpa --nostream)
pm2 logs webapp --nostream --lines 30
```

Public URL: panggil tool `GetServiceUrl(port=3000)` setelah service
terbukti hidup via curl.

### ecosystem.config.cjs template

```javascript
module.exports = {
  apps: [{
    name: 'webapp',
    script: 'npx',
    args: 'wrangler pages dev dist --ip 0.0.0.0 --port 3000',
    // Proyek D1 → ganti args:
    // args: 'wrangler pages dev dist --d1=webapp-production --local --ip 0.0.0.0 --port 3000',
    env: { NODE_ENV: 'development', PORT: 3000 },
    watch: false, instances: 1, exec_mode: 'fork'
  }]
}
```

## B. D1 local workflow

```bash
cd /home/user/webapp

# Apply migrations ke SQLite local (.wrangler/state/v3/d1)
npx wrangler d1 migrations apply webapp-production --local

# Seed data test
npx wrangler d1 execute webapp-production --local --file=./seed.sql

# Konsol query
npx wrangler d1 execute webapp-production --local \
  --command="SELECT * FROM users LIMIT 5"

# FULL RESET local DB (destructive local-only, aman)
rm -rf .wrangler/state/v3/d1 && \
  npx wrangler d1 migrations apply webapp-production --local && \
  npx wrangler d1 execute webapp-production --local --file=./seed.sql
```

Jika `wrangler.jsonc` berubah → `rm -rf .wrangler && npm run build`
lalu restart PM2.

⚠️ Perintah TANPA `--local` mengenai DB PRODUCTION — jangan jalankan
kecuali sedang deploy (lihat skill `sovereign-cf-byok-deploy`).

## C. Git discipline (lokal)

```bash
cd /home/user/webapp && git add . && \
  git commit -m "feat: <perubahan>"
```

- Commit SETIAP milestone kecil (jangan numpuk).
- Auto-push genspark remote terjadi otomatis akhir turn — tidak perlu
  push manual untuk backup Second Brain.
- Push GitHub → skill `sovereign-github-push`.

## D. Backup

```bash
# 1. Tool ProjectBackup (preferred — blob storage + URL download)
ProjectBackup(project_path="/home/user/webapp",
              backup_name="webapp_backup_YYYY-MM-DD")

# 2. AI Drive (HANYA single tar.gz, JANGAN cp -r banyak file kecil)
cd /home/user && tar --exclude='webapp/node_modules' \
  --exclude='webapp/.wrangler' --exclude='webapp/dist' \
  -czf webapp_2026-06-11.tar.gz webapp/
cp /home/user/webapp_2026-06-11.tar.gz /mnt/aidrive/
```

Aturan nama file AI Drive: huruf/angka/underscore + tanggal
`YYYY-MM-DD`. JANGAN deep-traversal `/mnt/aidrive` (sangat lambat).

## E. README discipline (WAJIB tiap perubahan besar)

`README.md` harus selalu memuat: fitur selesai, URI entry + parameter,
fitur belum selesai, next steps, URL production/GitHub, data model +
storage service, panduan user, status deploy + tanggal update.

## Failure modes

| Gejala | Fix |
|---|---|
| Port 3000 occupied | `fuser -k 3000/tcp` + `pm2 delete all`, lalu start ulang. |
| PM2 app errored | `pm2 logs webapp --nostream --lines 50` → baca error → fix → `pm2 restart webapp`. |
| Sandbox freeze (perintah dasar gagal) | Tool `ResetSandbox` — file disk aman, proses mati. |
| Build gagal `serveStatic` error | Pastikan import dari `hono/cloudflare-workers`, BUKAN `@hono/node-server/serve-static`. |
| Static 404 | File harus di `public/static/` → URL `/static/...`. |
| D1 "no such table" local | Migrations belum di-apply `--local`. Jalankan section B. |

## Out of scope

- Deploy production CF → skill `sovereign-cf-byok-deploy`.
- GitHub push → skill `sovereign-github-push`.
- Context ingest / resume sesi → skill `sovereign-context-injection`.
- Full pipeline end-to-end → skill `sovereign-fullstack-cycle`
  (skill ini = FASE 3-4-nya).
- Disiplin biaya tool → `sovereign-credit-aware`.
