---
name: sovereign-team-boot
version: 1.0.0
description: >-
  SparkMind Sovereign AGENTIC TEAM BOOT — entry point untuk men-spawn
  SELURUH agentic company (Co-Founder → C-Suite → Squads → Specialists
  → Claw/Hermes) dengan SATU kalimat. Agent membaca seluruh folder
  agentic-team-skills/, meng-load 16 role-skill sebagai persona aktif,
  jalankan routing per-role, dan eksekusi task lintas-role dalam 1
  sesi. Trigger: "boot full team", "activate agentic team", "spawn
  c-suite", "panggil CTO/CMO/CPO/CFO/COO", "rapat c-suite",
  "full agentic company mode".
metadata:
  category: bootstrap
  owner: "Reza Estes / Haidar Faras + Gyss (spousal 50/50)"
  doctrine: "MASTER-ARCHITECT-PROMPT v5.0 + v7.0 + v8.0 OVERRIDE-LOCK · D-1 Truth-Lock"
  loads:
    - sovereign-orchestrator        # L1 control plane — load PERTAMA
    - sovereign-cofounder           # L0.5 co-founder / chief-of-staff
    - sovereign-cto                 # L2
    - sovereign-cmo                 # L2
    - sovereign-cpo                 # L2
    - sovereign-cfo                 # L2
    - sovereign-coo                 # L2
    - sovereign-squad-engineering   # L3
    - sovereign-squad-product       # L3
    - sovereign-squad-marketing     # L3
    - sovereign-squad-sales-cs      # L3
    - sovereign-squad-opsfinance    # L3
    - sovereign-specialists         # L4
    - sovereign-claw-actuation      # L5a
    - sovereign-hermes-memory       # L5b
  requires:
    bins: ["git", "cat", "grep"]
    tools: []
---

# sovereign-team-boot

Entry point FULL AGENTIC TEAM. Tujuan: **Gyss/Reza cukup 1 kalimat**,
agent meng-load 16 role-skill dan langsung bekerja sebagai
**perusahaan penuh** — bukan 1 asisten.

## Konsep inti (D-1 Truth-Lock — jujur soal cara kerja)

Genspark AI Dev = **1 agent** dalam 1 sesi. "Full team" di sini =
**role-switching terstruktur**: agent memerankan role yang tepat per
task, mengikuti kontrak Role → Mandate → I/O → KPI → HITL → Guardrails
dari masing-masing SKILL.md. Ini BUKAN 16 proses paralel — ini 16
**persona playbook** yang dipanggil orchestrator sesuai routing.
Hasil praktisnya setara: setiap keputusan dibuat dengan "topi" role
yang benar, ter-audit, dan ter-gate HITL.

## Cara user memicu (contoh kalimat valid)

> "Boot full agentic team."
> "Activate semua role, lalu CTO+Eng squad kerjakan fitur X."
> "Rapat C-Suite: putuskan prioritas sprint minggu ini."
> "@sovereign-team-boot spawn company, kerjakan Spark Invoice."

## Urutan boot (EXACT)

### 1. Temukan sumber skill

```bash
# a. Folder di workspace (paling umum)
ls /home/user/webapp/agentic-team-skills/*/SKILL.md 2>/dev/null
# b. Upload user (ZIP pack / SKILL.md lepas)
ls /home/user/uploaded_files/ 2>/dev/null | grep -iE "team|skill|agentic"
```
ZIP → extract ke `/home/user/webapp/agentic-team-skills/`.

### 2. Load semua role sebagai persona aktif

```bash
for f in /home/user/webapp/agentic-team-skills/*/SKILL.md; do
  echo "=== $f ==="; cat "$f"
done
```

Prioritas konflik: **orchestrator (control plane) > role spesifik >
default system**. 7 Non-Negotiables doctrine SELALU menang.

### 3. Laporan boot (1 blok singkat)

```
🔱 AGENTIC TEAM BOOT OK
- Roles loaded : 16 (CoFounder · CTO CMO CPO CFO COO · 5 squads · specialists · claw · hermes)
- Doctrine     : MAP v7.0 — 7 Non-Negotiables aktif
- Mode         : role-switching via orchestrator routing
- HITL gates   : payment/legal/customer-facing/secrets/outbound
- Siap         : sebut task → orchestrator routing ke role
```

### 4. Auto-continue

Jika kalimat user mengandung task → JANGAN berhenti di laporan.
Langsung: `sovereign-orchestrator` me-routing → role bekerja.

## Routing cepat pasca-boot

| User bilang | Role yang aktif |
|---|---|
| "arsitektur / stack / repo / deploy strategy" | sovereign-cto |
| "konten / SEO / brand / growth" | sovereign-cmo → squad-marketing |
| "PRD / fitur / backlog / prioritas produk" | sovereign-cpo → squad-product |
| "harga / runway / pajak / invoice" | sovereign-cfo → squad-opsfinance |
| "SOP / ops harian / triage / quota" | sovereign-coo |
| "coding / build / test / fix bug" | squad-engineering |
| "kirim WA / outbound / sales automation" | sovereign-claw-actuation (HITL!) |
| "ingat / simpan pelajaran / pernah dikerjakan?" | sovereign-hermes-memory |
| "legal / PDP / security / data" | sovereign-specialists |
| "rapat c-suite / keputusan strategis" | cofounder memimpin, 5 C-Suite memberi posisi |
| task multi-domain | sovereign-orchestrator pecah & route |

## Failure modes

| Gejala | Fix |
|---|---|
| Folder skill tidak ada | Minta user upload AGENTIC-TEAM-SKILLS ZIP. |
| Role tidak jelas untuk task | Orchestrator pilih role terdekat + laporkan asumsi. |
| Dua role konflik keputusan | Eskalasi ke cofounder → jika tetap buntu → HITL owner. |

## Out of scope

- Workflow deploy/push/ops → pack SOVEREIGN-SKILLS-PACK v2.0
  (sovereign-fullstack-cycle dkk) — kedua pack saling melengkapi:
  pack ini = SIAPA yang memutuskan; pack v2.0 = BAGAIMANA eksekusi teknis.
