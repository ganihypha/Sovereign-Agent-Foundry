# B5-04 · OUTCOME-DELIVERY-ENGINE-DOC — Cara Outcome Di-deliver
## SparkMind · SSOT Batch 5 · Pipeline skill→app, SLA/TTO, proof-of-outcome

> v1.0 · 2026-06-20 · Fokus: **mesin pengiriman** — bagaimana 36 skill dirakit menjadi outcome
> jadi, dengan SLA, gate kualitas, dan bukti hasil. Ini "Lapis 2" dari B5-02 secara operasional.
>
> **Sumber kanonik:** `docs/ssot/batch-5-outcome-foundry/B5-04-OUTCOME-DELIVERY-ENGINE-DOC.md`

---

## 1. Pipeline F0–F7 (masalah → outcome terbukti)

| Fase | Nama | Aktivitas | Skill mesin |
|---|---|---|---|
| **F0** | **Intake** | Pelanggan pilih Outcome SKU (`/solutions/:slug`) atau isi intake DFY (`/api/intake`). | — |
| **F1** | **Scope & DoO** | Tetapkan Definition-of-Outcome (B5-02 §6): kriteria selesai + bukti + non-scope. | verify-rubric, cofounder |
| **F2** | **Bayar (MoR)** | Checkout → Duitku (QRIS/VA) → webhook → order PAID di D1. | duitku, gateway (live) |
| **F3** | **Rakit** | Orchestrator memanggil skill sesuai `engineSkills` SKU → bangun app/otomasi. | orchestrator, fullstack-cycle, squad-* |
| **F4** | **Deploy** | Pasang ke akun/domain klien (BYOK Cloudflare). | cf-byok-deploy, github-push |
| **F5** | **Verifikasi (gate)** | Cek DoO terpenuhi; Truth-Lock; HITL untuk hal berisiko. | verify-rubric, zero-trust |
| **F6** | **Proof-of-outcome** | Serahkan bukti hasil (URL live, data, akses, ringkasan). | hermes-memory |
| **F7** | **Care (langganan)** | Care Plan/AI Staff jalan terus + monitoring + update. | workflow-ops, n8n-workflow, credit-aware |

> Pemetaan 9 solusi → skill spesifik = **B4-07 §4** (Truth-Lock). Tidak diulang di sini.

---

## 2. SLA & Time-to-Outcome (TTO)

- **TTO** = waktu dari F2 (bayar) → F6 (proof diserahkan). Ditargetkan per tier:
  - **Vertical (Setup):** cepat (template + deploy) — sesuai field `eta` di `solutions.ts`.
  - **High-ticket (DFY):** lebih lama (scope custom) — disepakati di DoO.
- **Langganan (Care Plan/AI Staff):** SLA respons & uptime mengikuti `/legal` + B3 (operasional).
- **KPI:** TTO median, % order lulus DoO percobaan pertama, refund-rate, retensi langganan.

---

## 3. Gate kualitas (apa yang menahan rilis)

Tidak ada outcome dikirim sebelum lolos gate:

1. **DoO gate (F5):** semua kriteria "selesai" terpenuhi & terukur.
2. **Truth-Lock gate:** klaim = kenyataan; tidak ada fitur "diakui" yang tak ada.
3. **HITL gate:** keputusan tak-bisa-dibatalkan (deploy produksi, kirim uang, hapus data)
   butuh persetujuan manusia.
4. **Compliance gate:** sesuai brand_ledger + UU PDP + MoR (data pelanggan aman).

---

## 4. Proof-of-outcome (bukti yang diserahkan)

Inti diferensiasi OaaS (B5-01 §5). Setiap delivery menghasilkan **paket bukti**:

| Komponen bukti | Contoh |
|---|---|
| **URL live** | `https://<klien>.pages.dev` berfungsi |
| **Snapshot data** | screenshot/record di D1 (mis. 1 booking, 1 transaksi) |
| **Akses** | kredensial admin diserahkan ke klien |
| **Ringkasan setup** | apa yang dibangun, skill yang dipakai (transparansi mesin) |
| **Metrik awal** (jika ada) | mis. waktu respons CS, jumlah lead |

> Proof = aset pemasaran juga: dengan izin klien → **case study** (bahan trust untuk
> calon pembeli berikutnya). Memenuhi DoD B4-06 §7 ("rakit 2–3 case study").

---

## 5. Peran agentik (siapa mengerjakan apa)

| Aktor | Tugas | Skill |
|---|---|---|
| **Orchestrator** | Pecah outcome → tugas → panggil skill | orchestrator, master-boot |
| **C-Suite agents** | Keputusan strategis (untuk AI Company) | cofounder, cto, cmo, cfo, coo, cpo |
| **Squads** | Eksekusi domain (eng/marketing/product/sales-cs/opsfinance) | squad-* |
| **Verifier** | Gate DoO & Truth-Lock | verify-rubric, zero-trust |
| **Memory** | Konteks lintas sesi & proof | hermes-memory, memory-dreaming |
| **Operator manusia (HITL)** | Setujui hal berisiko, jaga kualitas | — |

---

## 6. Definition of Done (mesin delivery)

- [x] Pipeline F0–F7 terdokumentasi & terikat ke skill nyata (Truth-Lock).
- [x] Gate kualitas (DoO/Truth-Lock/HITL/Compliance) didefinisikan.
- [x] Format proof-of-outcome baku.
- [ ] Template DoO per-SKU diisi lengkap untuk 9 solusi (R2 — B5-05).
- [ ] 2–3 proof/case study riil dirakit (R3 — B5-05).

> Lanjut: status kode saat ini + gap tertutup + roadmap eksekusi → **B5-05**.
