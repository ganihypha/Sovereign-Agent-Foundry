# B5-01 · OAAS-RESEARCH-DOC — Outcome / Result / Service-as-a-Software
## SparkMind · SSOT Batch 5 · Riset pasar 2025–2026 (deep dive, bersumber)

> v1.0 · 2026-06-20 · Fokus: bukti pasar **dengan angka nyata** bahwa dunia software bergeser
> ke **Outcome-as-a-Service**, dan implikasi konkret untuk SparkMind.
> Dokumen ini **mengisi gap** yang sengaja dikosongkan B4-06 (yang tidak mengutip angka pasti).
>
> **Sumber kanonik:** `docs/ssot/batch-5-outcome-foundry/B5-01-OAAS-RESEARCH-DOC.md`

---

## 1. Definisi keluarga istilah (disambiguasi)

Pasar memakai banyak nama untuk ide yang sama "**bayar untuk hasil, bukan untuk alat/jam**":

| Istilah | Arti | Sumber/indikasi |
|---|---|---|
| **OaaS — Outcome-as-a-Service** | Vendor menjual *hasil terukur* (mis. tiket terselesaikan), bukan akses software. | "Outcomes as a Service" (LinkedIn, Mar 2025); a16z (Des 2024) |
| **RaaS — Results-as-a-Service** | Sama dengan OaaS; mode harga task-based / per-hasil. | Diskusi RaaS/"Results Cloud" 2025–2026 |
| **Service-as-a-Software (SaS)** | AI menggantikan *jasa profesional* yang dulu manual (CS, marketing, admin) → dikirim sebagai software. | Foundation Capital, Workpath (2025) |
| **Outcome-based pricing** | Mekanisme harga: pelanggan bayar saat *outcome tercapai* (mis. per resolusi). | Sierra (Des 2024); Metronome (Mar 2025) |

> **Kesimpulan disambiguasi:** OaaS = RaaS = SaS pada level strategi (jual hasil). Yang berbeda
> hanya **mekanisme harga** (langganan vs usage vs per-outcome). SparkMind memilih **hibrida**
> (lihat B5-03), karena itulah yang dipakai pemenang nyata.

---

## 2. Pergeseran model (peta evolusi)

```
PER-SEAT  ─────►  USAGE-BASED  ─────►  OUTCOME-BASED
(per kursi)       (per pemakaian)      (per hasil tercapai)

SaaS klasik       AI-native awal       OaaS / RaaS / SaS  ◄── arah 2025–2026
```

- **a16z (Des 2024):** perusahaan AI-native condong ke model **usage, outcome, atau hybrid** —
  menjauh dari per-seat. Sumber: *"AI Is Driving A Shift Towards Outcome-Based Pricing"*.
- **Gartner (via Monetizely, Jan 2026):** **>30% solusi SaaS enterprise akan punya komponen
  outcome-based pada 2025** (naik dari ~15% pada 2022). Sumber: *2026 Guide to SaaS, AI, and
  Agentic Pricing Models*.

---

## 3. Bukti angka nyata (pemain & harga) — ter-Truth-Lock

Ini contoh **harga outcome riil** yang sudah hidup di pasar (per resolusi/hasil), bukan teori:

| Pemain | Model & harga outcome | Tanggal/sumber |
|---|---|---|
| **Intercom Fin** | **$0.99 per resolution** — hanya dibayar saat Fin menyelesaikan masalah; 1 outcome per percakapan. | Fin AI / Monetizely / Intercom Help (2025–2026) |
| **Zendesk** | Pindah ke outcome-based: **$1.50 per automated resolution** (atau $2 pay-as-you-go), ada starter tier. Vendor incumbent besar pertama (Agustus 2024). | SaaStr; SoftwareSeni (2024–2026) |
| **HubSpot** | Dari bundle €760/bln → **$0.50 per resolution** (dipotong setengah). | Technova Partners (Mar 2026) |
| **Salesforce Agentforce** | **3+ model** sekaligus: per-conversation (~$2), consumption (Flex Credits), per-user (~$125/user) — *hybrid menang*. | Salesforce; SaaStr; Monetizely (2025–2026) |
| **Fin AI (ROI)** | Rata-rata **$3.50 balik per $1** investasi AI CS; pemimpin hingga **8x ROI**. | Fin AI ROI Benchmarks 2026 |

> **Pelajaran #1:** outcome riil yang laku adalah outcome yang **mudah didefinisikan & diukur**
> (resolusi tiket, lead, konversi). Itu sebabnya CS/marketing/admin = titik masuk terbaik —
> persis tier **AI Staff** kita (`solutions.ts`).

---

## 4. Batas struktural pure-outcome pricing (kenapa hibrida menang)

Riset pricing 2025–2026 konsisten: **pure outcome pricing sulit di-scale** karena:

1. **Atribusi.** Sulit membuktikan *outcome* murni karena produk vendor (vs faktor lain).
2. **Prediktabilitas pendapatan.** Vendor butuh cashflow stabil; 100% outcome = volatil.
3. **Adopsi pembeli.** Pembeli juga ingin biaya yang bisa dianggarkan.
4. **Kepercayaan/proof.** Tanpa track record, pembeli ragu pada klaim "pay-per-result".

→ **Konsensus pasar = HIBRIDA:** *base/platform fee* + komponen *usage/outcome*. Contoh:
Salesforce (3 model paralel), Zendesk (starter tier + per-resolution). Bahkan Monetizely
menegaskan: hanya minoritas vendor yang berani **pure** outcome; mayoritas **hybrid**.

> **Pelajaran #2 (langsung jadi pagar):** SparkMind **default hibrida** —
> *Setup (sekali bayar) + Care Plan/AI Staff (langganan) + Done-for-You (jasa)* — dan baru
> pilot per-outcome di vertikal yang **terukur** + setelah **proof** ada. (B5-03 §5.)

---

## 5. Trust & proof = pembeda utama (moat)

Tema berulang di semua sumber: di outcome economy, **kepercayaan dan bukti** mengalahkan
fitur. Vendor yang bisa **membuktikan hasil** (case study, dashboard outcome, garansi) menang.

| Implikasi | Aksi SparkMind |
|---|---|
| Pembeli bayar untuk *hasil terbukti*, bukan janji | **Proof-of-outcome** wajib di tiap delivery (B5-04 §5) |
| Lokal = trust berlipat | Bahasa ID + harga IDR + QRIS/VA + MoR patuh (UU PDP) |
| Atribusi sulit | Definition-of-Outcome (DoO) jelas per SKU sebelum jual (B5-02 §6) |

---

## 6. Implikasi untuk SparkMind (ringkas)

1. **Pivot ke outcome = sejalan arah pasar terkuat 2025–2026** (bukan tebakan). ✅ tervalidasi.
2. **Model uang = hibrida** (sudah hidup: DIY + langganan + DFY). ✅ sesuai pemenang.
3. **Titik masuk outcome-based = CS/marketing/admin** (mudah diukur) → tier **AI Staff**.
4. **Moat = delivery engine nyata + MoR lokal + proof berbahasa Indonesia.**
5. **Ruang kosong:** belum ada pemain OaaS lokal Indonesia berskala → **first-mover**.

---

> **Sumber utama (untuk cross-check):**
> Sierra *Outcome-based pricing for AI Agents* (Des 2024);
> a16z *AI Is Driving A Shift Towards Outcome-Based Pricing* (Des 2024);
> Monetizely *2026 Guide to SaaS, AI, and Agentic Pricing Models* (Jan 2026) & *Doomed Evolution
> of Agentforce Pricing* (Jan 2026);
> SaaStr *Salesforce Now Has 3+ Pricing Models for Agentforce*;
> SoftwareSeni *SaaS Pricing Is Shifting from Per-Seat to Usage and Outcome* (2024);
> Technova Partners *Best AI Agents 2026*; Fin AI *ROI Benchmarks 2026* & *Fin vs Agentforce*;
> Intercom Help *Fin AI Agent outcomes*; Metronome *What is Outcome-Based Pricing* (Mar 2025);
> LinkedIn *Outcomes as a Service* (Mar 2025).
>
> Truth-Lock: angka di §3 adalah **harga publik yang dikutip sumber bertanggal**; dipakai sebagai
> *bukti arah pasar*, bukan klaim performa SparkMind.

> Lanjut: definisi sistem "Outcome Foundry" → **B5-02**.
