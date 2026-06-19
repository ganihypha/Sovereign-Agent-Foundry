// PM2 — SPARKMIND-OBP dev server (Cloudflare Pages + D1 lokal)
module.exports = {
  apps: [
    {
      name: 'sparkmind-obp',
      script: 'npx',
      args: 'wrangler pages dev dist --d1=sparkmind-obp-production --local --ip 0.0.0.0 --port 3000',
      env: { NODE_ENV: 'development', PORT: 3000 },
      watch: false,
      instances: 1,
      exec_mode: 'fork'
    }
  ]
}
