# B5-02 · OUTCOME-FOUNDRY-CONCEPT-DOC — Definisi Sistem & Konsep
## SparkMind · SSOT Batch 5 · "Outcome Foundry" sebagai sistem kanonik

> v1.0 · 2026-06-20 · Fokus: mendefinisikan **apa itu Outcome Foundry** sebagai sistem —
> lapisan, prinsip, alur mesin→outcome, taksonomi, dan **Definition-of-Outcome (DoO)**.
>
> **Sumber kanonik:** `docs/ssot/batch-5-outcome-foundry/B5-02-OUTCOME-FOUNDRY-CONCEPT-DOC.md`

---

## 1. Definisi kanonik

> **Outcome Foundry** = *pabrik (foundry) yang mengubah masalah bisnis nyata menjadi hasil yang
> sudah jadi & jalan (outcome), dirakit otomatis dari mesin 36 sovereign skill, dikirim sebagai
> layanan (OaaS) dengan pembayaran lokal yang patuh.*

Analogi: **foundry** = pengecoran logam — bahan mentah (skill) dilebur & dicetak menjadi
**produk jadi** (outcome) sesuai cetakan (Definition-of-Outcome). Pembeli tidak melihat logam
mentah; ia menerima **barang jadi yang berfungsi**.

---

## 2. Sistem 3-lapis (arsitektur konsep)

```
┌─────────────────────────────────────────────────────────────┐
│ LAPIS 3 — PASAR (yang dilihat & dibeli pelanggan)            │
│ Outcome: "Kasir+Booking jalan", "CS otomatis", "Mesin Konten"│
│ Bahasa Indonesia · harga IDR · QRIS/VA · /solutions          │
├─────────────────────────────────────────────────────────────┤
│ LAPIS 2 — FOUNDRY (perakitan & delivery)                     │
│ Pipeline skill→app · DoO · proof-of-outcome · MoR (OBP/Duitku)│
│ Gate kualitas (verify-rubric, Truth-Lock, HITL)              │
├─────────────────────────────────────────────────────────────┤
│ LAPIS 1 — MESIN (tak terlihat pasar)                         │
│ 36 sovereign skill · fullstack-cycle · orchestrator · C-Suite│
│ Cloudflare-native (Hono+Pages+D1) · /developers (proof)      │
└─────────────────────────────────────────────────────────────┘
```

- **Lapis 1 (Mesin):** aset teknis. Dijual mentah hanya di `/developers` (proof & funnel).
- **Lapis 2 (Foundry):** tempat skill **dirakit** jadi outcome + dikirim + dibuktikan + dibayar.
- **Lapis 3 (Pasar):** kemasan outcome berbahasa awam untuk UMKM/SMB. Inilah mesin uang utama.

---

## 3. Tujuh prinsip kanonik

1. **Jual hasil, bukan bahan.** Yang dijual ke pasar = outcome (Lapis 3); skill = mesin (Lapis 1).
2. **Truth-Lock.** Tidak ada outcome dijanjikan tanpa skill nyata pendukungnya.
3. **Hibrida by default.** Setup + langganan + jasa; outcome-based hanya pilot terukur (B5-03).
4. **Indonesia-first.** Bahasa, harga, rel pembayaran, kepatuhan = lokal.
5. **Proof-of-outcome wajib.** Setiap delivery menghasilkan bukti hasil (B5-04 §5).
6. **HITL pada keputusan berisiko.** Manusia menyetujui sebelum hal yang tak bisa dibatalkan.
7. **Credit-aware & edge-native murah.** Margin sehat di harga lokal (Cloudflare, tanpa VPS idle).

---

## 4. Alur mesin → outcome (ringkas)

```
Masalah bisnis  →  pilih Outcome SKU  →  Foundry merakit (skill)  →
  →  deploy ke akun klien  →  proof-of-outcome  →  Care Plan (terus jalan)
```

Detail teknis pipeline (F0–F7) ada di **B5-04**. Di sini cukup ditegaskan: **pelanggan masuk
lewat masalah** (bukan lewat daftar skill), dan **keluar dengan sistem yang jalan + bukti**.

---

## 5. Taksonomi outcome (yang dijual SparkMind)

Mengikat ke `src/data/solutions.ts` (live). 4 tier:

| Tier | Apa yang dibeli | Contoh SKU live | Model harga |
|---|---|---|---|
| **Vertical** | Produk jadi per jenis bisnis | Kasir+Booking, Toko Online+CS, Mesin Konten, Event/Tiket, Donasi/Keanggotaan, Otomasi Admin | Setup (Rp1.5jt) + DIY (Rp490k) |
| **Subscription** | Sistem yang terus bekerja & terawat | Care Plan (Rp199k/bln), AI Staff CS/Marketing/Admin (Rp490k/bln) | Langganan (MRR) |
| **High-ticket** | Done-for-You penuh | Aplikasi Custom (mulai Rp5jt), AI Company in a Box (mulai Rp12jt) | Proyek (jasa) |
| **Education** | Belajar membangun sendiri | Canon Course ID (Rp349k) | One-time (tripwire) |

> Outcome ≠ acak: tiap SKU punya **promise → problem → ICP → outcomes → engineSkills → plan →
> ETA** (struktur `Solution` di `solutions.ts`). Inilah "cetakan" foundry.

---

## 6. Definition of Outcome (DoO) — kontrak hasil

Sebelum sebuah outcome dijual, ia **wajib** punya DoO: definisi *kapan hasil dianggap tercapai*.
DoO = jembatan antara janji (Lapis 3) dan bukti (Lapis 2).

**Template DoO (per SKU):**

| Field | Contoh (Kasir+Booking) |
|---|---|
| **Outcome statement** | "Bisnis bisa menerima booking & catat transaksi online." |
| **Kriteria selesai (terukur)** | App live di domain klien; ≥1 booking & ≥1 transaksi tercatat di D1. |
| **Bukti yang diserahkan** | URL live + screenshot data + akses admin + ringkasan setup. |
| **Bukan termasuk** | Iklan berbayar, isi konten harian (itu Care Plan/AI Staff). |
| **SLA / ETA** | Sesuai field `eta` di `solutions.ts`. |
| **Skill mesin** | Sesuai `engineSkills` (Truth-Lock, lihat B4-07 §4). |

> **Aturan emas:** *No DoO, no sale.* Outcome tanpa DoO = janji kosong → dilarang (Truth-Lock).

---

## 7. Pemetaan ke doktrin lama (kompatibel, bukan reset)

| Konsep lama | Diserap menjadi (Outcome Foundry) |
|---|---|
| Marketplace skill (`.zip`) | **Lapis 1 (mesin)** + `/developers` (proof) |
| 4-Layer Hybrid Lock (Brand/Merchant/Domain/Compliance) | Tetap berlaku; jadi **fondasi Lapis 2** (MoR/kepatuhan) |
| Sub-brand (SparkMind/PaceLokal/KuratorKas/dll) | **Domain** outcome per vertikal (Lapis 3) |
| "Build hijau" (kualitas) | Naik level → **Definition-of-Outcome (DoO)** |
| Jargon teknis | Diterjemahkan → **bahasa outcome awam** (Lapis 3) |

> Lanjut: model uang (pricing hibrida + unit-economics) → **B5-03**; cara deliver & proof →
> **B5-04**; status & roadmap → **B5-05**.
