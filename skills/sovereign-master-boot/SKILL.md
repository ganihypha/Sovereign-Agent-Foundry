---
name: sovereign-master-boot
version: 2.0.0
description: >-
  SparkMind Sovereign BOOT — entry point sesi baru dengan minimal
  prompting: satu perintah "activate semua skill" → agent membaca
  seluruh folder skills/, meng-load 15 skill SOVEREIGN-SKILLS v5.0 +
  (jika ada) pack agentic-team v2.0, jalankan context+memory ingest,
  lalu standby/eksekusi full cycle. Skill yang Gyss/Reza panggil
  PERTAMA di tiap sesi. Trigger: "activate semua skill", "boot",
  "load skills", "mulai sesi", "aktifkan playbook", "sovereign mode",
  "boot sovereign".
metadata:
  category: bootstrap
  skill_category: "business-process-automation"   # Anthropic cat #4
  owner: "Reza Estes / Haidar Faras + Gyss (spousal 50/50)"
  doctrine: "MASTER-ARCHITECT-PROMPT v5.0 + v7.0 + v8.0 OVERRIDE-LOCK · D-1 Truth-Lock"
  loads:
    - sovereign-credit-aware              # guard — load PERTAMA
    - sovereign-context-injection         # fase 0
    - sovereign-memory-dreaming           # 🆕 baca LESSONS saat boot
    - sovereign-orchestration-patterns    # 🆕 pecah tugas besar
    - sovereign-verify-rubric             # 🆕 DoD/verifikasi
    - sovereign-zero-trust                # 🆕 keamanan
    - sovereign-workflow-ops              # operate harian
    - sovereign-cf-byok-deploy            # deploy production
    - sovereign-github-push               # vcs
    - sovereign-fullstack-cycle           # orkestrator
  also_loads_if_present:
    pack: agentic-team-skills             # C-Suite/Squad (SIAPA memutuskan)
  requires:
    bins: ["git", "gsk", "cat", "grep"]
    tools: []
---

# sovereign-master-boot

Entry point sesi. Tujuan: **Gyss/Reza cukup 1 kalimat**, agent
nge-load semua playbook sendiri dan langsung kerja.

## Cara user memicu (contoh kalimat valid)

> "Boot sovereign mode."
> "Activate semua skill di skills/, resume project, lanjut."
> "@sovereign-master-boot lanjutkan full cycle."

## Urutan boot (EXACT)

### 1. Temukan sumber skill (cek berurutan, pakai yang pertama ada)

```bash
# a. Folder skills/ di workspace (paling umum — auto-restore dari repo)
ls /home/user/webapp/skills/*/SKILL.md 2>/dev/null

# b. File upload user (ZIP pack / SKILL.md lepas)
ls /home/user/uploaded_files/ 2>/dev/null | grep -iE "skill|pack"

# c. SB-Git repo project (persisten)
gsk sb-git ls -r <project-repo> 2>/dev/null | grep -i skill
```
ZIP → extract dulu ke `/home/user/webapp/skills/` (struktur
`<nama-skill>/SKILL.md`).

### 2. Load SEMUA skill sebagai playbook aktif

```bash
# Pack utama (SOVEREIGN-SKILLS v5.0 = BAGAIMANA eksekusi teknis)
for f in /home/user/webapp/skills/*/SKILL.md; do
  echo "=== $f ==="; cat "$f"
done
# Pack team (agentic-team v2.0 = SIAPA yang memutuskan) — JIKA ada
for f in /home/user/webapp/agentic-team-skills/*/SKILL.md; do
  [ -f "$f" ] && { echo "=== TEAM: $f ==="; cat "$f"; }
done
```
Baca dan PEGANG seluruh isi sebagai instruksi aktif sesi ini.
Urutan prioritas jika ada konflik antar skill:
**credit-aware (guard) > zero-trust (keamanan) > skill spesifik fase >
fullstack-cycle (orkestrator) > team C-Suite/squad > default system**.

> 2 pack saling melengkapi (composing skills, ala Anthropic):
> **SOVEREIGN-SKILLS v5.0** = BAGAIMANA eksekusi (code→deploy→verify);
> **agentic-team v2.0** = SIAPA yang memutuskan (CTO/CFO/CMO/squad).

### 3. Status laporan boot (1 blok singkat ke user)

```
🔱 SOVEREIGN BOOT OK
- Skills loaded : <n> (<daftar nama>)
- Plan akun     : <hasil gsk me — free/plus/pro> → mode <hemat>
- Workspace     : <ada/kosong> · last commit: <oneline>
- Siap          : sebut perintah ("full cycle" / "deploy" / "push" / ...)
```

### 4. Auto-continue (jika user sudah kasih perintah kerja)

Jika kalimat user mengandung perintah kerja (mis. "...lalu lanjut full
cycle" / "resume dan deploy") → JANGAN berhenti di laporan boot.
Langsung eksekusi:
1. `sovereign-context-injection` (ingest + scope lock)
2. `sovereign-fullstack-cycle` dari fase yang relevan / tersisa.

## Routing perintah pasca-boot

| User bilang | Skill yang dijalankan |
|---|---|
| "full cycle" / "kerjakan semua" / "selesaikan" | sovereign-fullstack-cycle (fase 0-7) |
| "jalankan" / "restart" / "log" / "reset db" | sovereign-workflow-ops |
| "deploy" / "production" / "BYOK" | sovereign-cf-byok-deploy (atau tanya BYOK vs hosted jika ambigu) |
| "push github" / "buat repo" | sovereign-github-push |
| "resume" / "baca context" / "lanjutkan kemarin" | sovereign-context-injection lalu tanya/lanjut |
| "hemat kredit" / "budget" | sovereign-credit-aware (perketat mode) |
| "pecah tugas" / "paralel" / "tugas besar" / "tournament" | sovereign-orchestration-patterns |
| "verifikasi" / "review" / "DoD" / "sudah benar?" | sovereign-verify-rubric |
| "aman?" / "secret" / "zero trust" / "scan" | sovereign-zero-trust |
| "review pelajaran" / "dreaming" / "kenapa salah lagi" | sovereign-memory-dreaming |
| "keputusan strategis" / "CTO/CFO/CMO" / "squad" | pack agentic-team (jika ada) |

## Aturan instalasi skill update (maintenance)

User upload pack versi baru → bandingkan `version` frontmatter:
versi lebih tinggi → replace folder skill + commit
`chore: skills pack v<X>` → repo auto-push Second Brain →
sesi berikutnya boot otomatis pakai versi baru.

## D-1 Truth-Lock: batas platform

- Skill custom ini TIDAK terdaftar otomatis di `<available_skills>`
  sistem (registry dikontrol platform). Boot harus dipicu user 1x per
  sesi — itulah fungsi skill ini: menekan biaya prompting jadi
  1 kalimat.
- Folder `skills/` di repo project = jalur persistensi paling andal
  (auto-push tiap turn). ZIP upload = jalur portabel antar-project.

## Failure modes

| Gejala | Fix |
|---|---|
| skills/ tidak ada di mana pun | Minta user upload SOVEREIGN-SKILLS-PACK ZIP, atau rebuild dari Second Brain repo. |
| Versi skill konflik (duplikat beda versi) | Pakai `version` tertinggi; laporkan ke user. |
| User perintah ambigu pasca-boot | Tawarkan routing table di atas sebagai menu 1 baris. |

## Out of scope

- Isi playbook tiap skill → file SKILL.md masing-masing.
- Pembuatan skill baru → edit manual + bump version + re-zip
  (lihat `00-DEEP-DIVE-SKILLS-GENSPARK-AIDEV.md`).
