# 🔑 Aktivasi gh-aw (Batch 7) — Instruksi untuk Owner

> **Kenapa file `.github/workflows/` tidak ikut di-push otomatis?**
> Token yang dipakai sandbox adalah **GitHub App user token** yang **tidak punya scope
> `workflow`**. GitHub menolak membuat/mengubah file di `.github/workflows/` tanpa scope itu
> (pesan: *"refusing to allow a GitHub App to create or update workflow ... without `workflows` permission"*).
> Ini batasan keamanan GitHub, bukan error kode. Solusinya: owner men-deploy file workflow
> dengan kredensial yang punya scope `workflow` (PAT) atau lewat web UI.

Sumber file workflow tersimpan di repo pada folder **`workflows-payload/`** (copy persis isi
`.github/workflows/`). Pilih salah satu cara di bawah.

---

## Cara 1 — Salin payload → `.github/workflows/` lalu push (PAT scope `workflow`)

```bash
# Dari root repo (sudah ter-clone), salin payload ke lokasi final:
mkdir -p .github/workflows/shared
cp docs/ssot/batch-7-agentic-workflows/workflows-payload/*.md        .github/workflows/
cp docs/ssot/batch-7-agentic-workflows/workflows-payload/shared/*.md .github/workflows/shared/

# Push dengan PAT yang punya scope 'workflow':
#   buat PAT classic: https://github.com/settings/tokens  (centang: repo + workflow)
git add .github/workflows
git commit -m "feat(gh-aw): add Batch 7 agentic workflows"
git push origin main      # gunakan PAT scope workflow saat diminta password
```

## Cara 2 — Upload via web UI GitHub

1. Buka repo di browser → tombol **Add file → Create new file**.
2. Buat path `.github/workflows/daily-sovereign-status.md` (dan 3 file lain), tempel isi dari
   `workflows-payload/`. Web UI memakai sesi login Anda (punya hak `workflow`).

## Cara 3 — Pakai ekstensi `gh aw` (rekomendasi resmi)

```bash
gh extension install github/gh-aw
gh secret set COPILOT_GITHUB_TOKEN          # atau ANTHROPIC_API_KEY / OPENAI_API_KEY / GEMINI_API_KEY
# setelah file .md ada di .github/workflows/ (lewat Cara 1/2):
gh aw compile                               # hasilkan *.lock.yml
git add .github/workflows && git commit -m "chore(gh-aw): compile" && git push
gh aw run daily-sovereign-status            # uji manual
gh aw status                                # lihat status semua workflow
```

---

## Setelah aktif

- `daily-sovereign-status` → membuat issue status harian (continuity boot).
- `sovereign-issue-triage` → triase issue baru / perintah `/triage`.
- `sovereign-ssot-guardian` → draft PR bila ada drift SSOT.

Semua patuh **safe-outputs** (tak pernah push langsung ke `main`) + **HITL** (aksi
payment/legal/customer/secret hanya diberi label `needs-human-approval`).
