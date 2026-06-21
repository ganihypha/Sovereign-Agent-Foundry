# 🤖 GitHub Agentic Workflows — Sovereign Agent Foundry

Folder ini berisi **GitHub Agentic Workflows (gh-aw)** — workflow yang ditulis
dalam **Markdown + YAML frontmatter** (bahasa natural), bukan YAML Actions biasa.
gh-aw meng-*compile* tiap `*.md` menjadi `*.lock.yml` yang dijalankan GitHub Actions.

> Doktrin: semua workflow di sini mengimpor `shared/sovereign-guardrails.md`
> (Truth-Lock + HITL gate + Indonesia-first + no-secret-leak + safe-by-default).

## 📂 Isi

| File | Trigger | Fungsi | Output (safe) |
|---|---|---|---|
| `daily-sovereign-status.md` | `schedule: daily` + manual | Laporan status & continuity harian (state + gap P0 + next steps) | `create-issue` |
| `sovereign-issue-triage.md` | issue dibuka/reopen + `/triage` | Klasifikasi area + prioritas + HITL flag | `add-labels` + `add-comment` |
| `sovereign-ssot-guardian.md` | push `skills/**`,`docs/ssot/**`,`RESUME.md` + weekly | Deteksi drift SSOT (skills↔INDEX↔RESUME) | `create-pull-request` (draft) |
| `shared/sovereign-guardrails.md` | — (import) | Komponen bersama: tools + network + aturan non-negotiable | — |

## 🚀 Cara mengaktifkan (sekali setup, butuh akun GitHub owner)

Workflow ini **tidak otomatis jalan** sampai di-compile & secret AI diisi. Langkah:

```bash
# 1. Install ekstensi gh-aw (butuh GitHub CLI v2+)
gh extension install github/gh-aw

# 2. Set salah satu secret engine AI (pilih satu)
gh secret set COPILOT_GITHUB_TOKEN   # GitHub Copilot (rekomendasi)
# atau: gh secret set ANTHROPIC_API_KEY / OPENAI_API_KEY / GEMINI_API_KEY

# 3. Compile semua workflow markdown → *.lock.yml
gh aw compile

# 4. Commit .md + .lock.yml yang dihasilkan
git add .github/workflows && git commit -m "chore(gh-aw): compile agentic workflows" && git push

# 5. (opsional) Trigger manual untuk uji
gh aw run daily-sovereign-status
gh aw status            # lihat status semua workflow
```

> **Engine default:** bila tak diset di frontmatter, gh-aw memakai engine yang
> dipilih saat setup (Copilot/Claude/Codex/Gemini). Tambahkan `engine: copilot`
> di frontmatter untuk memaksa.

## 🔒 Keamanan (selaras doktrin Sovereign)

- **`strict: true`** di semua workflow → validasi keamanan penuh (wajib untuk repo publik).
- **`safe-outputs`** → agen tak pernah push langsung ke `main`; semua tulis lewat
  issue/komentar/draft-PR yang bisa di-review.
- **HITL** → aksi payment/legal/customer/secret hanya menghasilkan label
  `needs-human-approval`, tidak pernah dieksekusi otomatis.
- **`network: defaults`** → akses jaringan dibatasi allowlist.
- **No secret di `env:`** → secret hanya via `${{ secrets.* }}` / konfigurasi engine.

## 📚 Referensi kanonik

- Frontmatter: https://github.github.com/gh-aw/reference/frontmatter/
- Quick start: https://github.github.com/gh-aw/setup/quick-start/
- Multi-repo: https://github.github.com/gh-aw/examples/multi-repo/
- Contoh resmi: https://github.com/githubnext/agentics
- Doc lengkap (SSOT): `docs/ssot/batch-7-agentic-workflows/B7-00-GITHUB-AGENTIC-WORKFLOWS-DOC.md`
