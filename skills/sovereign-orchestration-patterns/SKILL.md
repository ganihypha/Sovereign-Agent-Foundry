---
name: sovereign-orchestration-patterns
version: 2.0.0
description: >-
  SparkMind Sovereign task-decomposition patterns — pecah tugas besar
  jadi sub-task yang dapat dieksekusi 1 agent secara berurutan
  (D-1 Truth-Lock: bukan paralel multi-proses). Pola: sequential
  pipeline, role-switching, tournament/best-of-N, map-reduce manual,
  guardrail-first. Memilih pola termurah yang memadai. Trigger:
  "pecah tugas", "tugas besar", "paralel", "tournament", "decompose",
  "orchestrate langkah", "best of N".
metadata:
  category: orchestration
  skill_category: "infrastructure-operations"
  owner: "Reza Estes / Haidar Faras + Gyss (spousal 50/50)"
  doctrine: "MASTER-ARCHITECT-PROMPT v5.0 + v7.0 + v8.0 OVERRIDE-LOCK · D-1 Truth-Lock"
  requires:
    bins: []
    tools: ["TodoWrite"]
---

# sovereign-orchestration-patterns

Cara memecah & mengeksekusi tugas besar di lingkungan **1 agent/sesi**.
D-1 Truth-Lock: tidak ada 16 proses paralel — yang ada adalah
**dekomposisi terstruktur + role-switching berurutan** yang hasilnya
setara, ter-audit, dan credit-aware.

## Pola yang tersedia (pilih termurah yang memadai)

### 1. Sequential Pipeline (default)
Pecah jadi langkah berurutan dengan kontrak I/O jelas; output langkah
N = input langkah N+1. Buat 1 TodoWrite per langkah.
> Dipakai `sovereign-fullstack-cycle` (FASE 0→7).

### 2. Role-Switching (siapa memutuskan)
Satu task disentuh beberapa "topi" role berurutan (mis. Writer →
Tester → Reviewer; atau CTO → Eng squad → Brutal-Verifier). Tulis
eksplisit "sekarang aku berperan sebagai X".
> JANGAN tulis "tim X & Y bekerja paralel" (melanggar truth-lock).

### 3. Tournament / Best-of-N
Hasilkan beberapa kandidat solusi (N kecil, 2-3), nilai dengan rubrik,
pilih terbaik. Pakai HANYA untuk keputusan high-impact (mahal kredit).

### 4. Map-Reduce manual
Map: proses tiap item homogen dengan langkah seragam (mis. 36 produk).
Reduce: agregasi hasil. Batasi map agar hemat kredit (batch).

### 5. Guardrail-First
Sebelum eksekusi: jalankan guard (`credit-aware` → `zero-trust`),
cek HITL, baru kerja. Guard menang atas semua pola.

## Memilih pola

```
Tugas → klasifikasi:
  linear & jelas        → Sequential Pipeline
  butuh sudut pandang   → Role-Switching
  high-stakes & mahal   → Tournament (N=2-3) + verify-rubric
  banyak item seragam   → Map-Reduce (batch)
selalu dibungkus        → Guardrail-First
```

## Format rencana (emit di awal tugas besar)

```
🧩 DECOMPOSE — <tugas>
Pola    : <sequential/role-switch/tournament/map-reduce>
Langkah : 1) <role/aksi> 2) ... 3) ...
Verify  : <gate per langkah / di akhir>
Budget  : <ringan/sedang/mahal — alasan>
HITL    : <ya/tidak di langkah mana>
```

## Prioritas konflik (LOCKED)

credit-aware (guard) > zero-trust > skill fase spesifik >
fullstack-cycle (orkestrator) > team C-Suite/squad > default system.

## Aturan

- Sebut jumlah langkah & buat TodoWrite — progress real-time.
- Hindari over-decomposition (tiap langkah = biaya); gabungkan langkah
  trivial.
- D-1 Truth-Lock: jelaskan eksekusi sebagai berurutan, bukan paralel.

## Out of scope

- Routing layer/role perusahaan → `sovereign-orchestrator` (L1).
- Verifikasi hasil → `sovereign-verify-rubric`.
