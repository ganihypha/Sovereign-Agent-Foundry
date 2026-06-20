---
name: sovereign-computer-browser-use
version: 2.0.0
description: >-
  SparkMind Sovereign browser/console verification — FASE 4 visual &
  runtime check untuk UI Cloudflare Pages: buka URL via
  PlaywrightConsoleCapture, pastikan nol error JS console, elemen kunci
  ter-render, dan endpoint hidup. Credit-aware: curl dulu, browser
  hanya untuk verifikasi visual/JS yang tidak bisa di-curl. Trigger:
  "cek UI", "console error?", "test browser", "render benar?",
  "verifikasi visual", "playwright".
metadata:
  category: verification
  skill_category: "infrastructure-operations"
  owner: "Reza Estes / Haidar Faras + Gyss (spousal 50/50)"
  doctrine: "MASTER-ARCHITECT-PROMPT v5.0 + v7.0 + v8.0 OVERRIDE-LOCK · D-1 Truth-Lock"
  requires:
    bins: ["curl"]
    tools: ["PlaywrightConsoleCapture", "GetServiceUrl"]
---

# sovereign-computer-browser-use

Verifikasi runtime sisi-klien (FASE 4 `sovereign-fullstack-cycle`).
Banyak bug hanya muncul di browser (error JS, fetch gagal, elemen
tidak render) yang `curl` tidak tangkap. Skill ini menutup gap itu —
tapi tetap **credit-aware**: curl/health dulu, browser belakangan.

## Urutan verifikasi (murah → mahal)

```bash
# 1. Murah dulu (curl) — server-side
curl -s http://localhost:3000/api/health
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/
```

```text
# 2. Baru browser (jika ada JS/interaktivitas yang harus diverifikasi)
GetServiceUrl(port=3000)                      # dapatkan URL publik
PlaywrightConsoleCapture(
  url=<service_url>,
  wait_for_selector="#<elemen-kunci>",        # mis. #catalog, #app
  capture_duration=4
)
```

## Yang diperiksa

- **Console bersih**: nol `error`/uncaught exception. Warning dicatat.
- **Elemen kunci render**: selector utama tiap halaman ada (home,
  catalog, product, checkout, legal).
- **Fetch/API dari frontend**: panggilan `axios`/`fetch` ke `/api/*`
  sukses (cek log network/console, bukan hanya status server).
- **No secret di klien**: tidak ada token/API key di HTML/JS terkirim.

## Format laporan

```
🖥️ BROWSER VERIFY — <halaman/URL>
Console : <nol error / N error: ...>
Render  : <selector kunci ✅/❌>
API call: <endpoint frontend ✅/❌>
Secret  : <bersih / temuan>
Verdict : ✅ / 🚫 (+ temuan)
```

## Aturan credit-aware

- Browser capture lebih mahal dari curl → jalankan **sekali** setelah
  fix terkumpul, bukan tiap perubahan kecil.
- Halaman tanpa JS interaktif → cukup curl, lewati browser.
- `capture_duration` secukupnya (3-5s); jangan berlebihan.

## Failure modes

| Gejala | Fix |
|---|---|
| Error JS di console | Root-cause (Debugger, Eng squad) → fix → rebuild → re-verify. |
| Selector tidak ketemu | Cek render/route; mungkin SSR gagal atau path salah. |
| Service URL tidak hidup | Pastikan PM2 jalan + port 3000 (workflow-ops). |

## Out of scope

- Build/start service → `sovereign-workflow-ops`.
- Verifikasi DoD lengkap → `sovereign-verify-rubric`.
