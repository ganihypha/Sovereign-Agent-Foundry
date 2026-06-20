# B5-03 · OUTCOME-BUSINESS-MODEL-DOC — Model Bisnis OaaS
## SparkMind · SSOT Batch 5 · Pricing hibrida, value-metric, unit-economics

> v1.0 · 2026-06-20 · Fokus: bagaimana Outcome Foundry **menghasilkan uang** secara
> berkelanjutan — mengikat riset (B5-01) ke harga live (`solutions.ts`).
>
> **Sumber kanonik:** `docs/ssot/batch-5-outcome-foundry/B5-03-OUTCOME-BUSINESS-MODEL-DOC.md`

---

## 1. Prinsip model: HIBRIDA (terbukti menang)

Riset B5-01 §4 menyimpulkan: pemenang OaaS pakai **hibrida** (base + langganan + outcome/usage),
bukan pure-outcome. SparkMind mengadopsi persis pola itu:

```
PENDAPATAN = Setup (sekali bayar)  +  Langganan (MRR)  +  Jasa (proyek)  [+ Outcome pilot]
             ───────────────────     ─────────────────    ──────────────   ───────────────
             cashflow cepat           pendapatan stabil    margin tinggi    masa depan terukur
```

---

## 2. Tiga aliran pendapatan (live di kode)

| Aliran | SKU live | Harga (IDR) | Peran ekonomi |
|---|---|---|---|
| **Setup / one-time** | Setup Vertical · Template DIY · Canon Course | Rp1.5jt · Rp490k · Rp349k | Akuisisi + cashflow cepat |
| **Langganan (MRR)** | Care Plan · AI Staff (CS/Marketing/Admin) | Rp199k/bln · Rp490k/bln | **Mesin nilai jangka panjang (LTV)** |
| **Jasa (high-ticket)** | App Custom · AI Company in a Box | mulai Rp5jt · mulai Rp12jt | Margin tinggi, sedikit slot |

> **Tangga harga (price ladder):** Rp349k (tripwire) → Rp490k (DIY/AI Staff) → Rp1.5jt (Setup)
> → Rp5jt (App) → Rp12jt (AI Company). Tripwire menarik, langganan menahan, high-ticket
> mengangkat ARPU.

---

## 3. Value-metric (apa yang "dihitung")

Value-metric = unit yang membuat harga terasa adil bagi pelanggan & skalabel bagi kita.

| SKU | Value-metric | Catatan |
|---|---|---|
| Setup Vertical | **per sistem terpasang** | satu app live = satu nilai jelas |
| Care Plan | **per bulan terlayani** | retensi = kesehatan bisnis |
| AI Staff | **per fungsi per bulan** (CS/marketing/admin) | tiap "staff" = 1 unit langganan |
| App Custom / AI Company | **per proyek** | scope di-DoO-kan dulu |
| Canon Course | **per akses** | tripwire edukasi |

> **Calon value-metric outcome-based (pilot, B5-01 §3):** per-resolusi CS, per-lead, per-event
> terjual. Hanya diaktifkan setelah measurement + proof + kontrak matang (§5).

---

## 4. Unit-economics (model, bukan klaim)

Karena edge-native (Cloudflare, tanpa VPS idle), **biaya marjinal per pelanggan rendah**.
Kerangka (angka harga = live; biaya = asumsi internal, bukan klaim publik):

```
Contoh kohort UMKM (ilustratif):
  Setup Vertical (Rp1.5jt sekali)  +  Care Plan (Rp199k × 12)  =  Rp3.888.000 / tahun / klien
  AI Staff CS (Rp490k × 12)                                     =  Rp5.880.000 / tahun / klien
Biaya marjinal (infra CF + delivery agentik) ditekan rendah → margin kontribusi sehat.
```

**Pendorong LTV:** langganan (Care Plan + AI Staff) = MRR yang menumpuk. **Pendorong CAC rendah:**
funnel developer (proof) + SEO lokal per vertikal (B4-04). **Aturan:** jaga refund-rate rendah
lewat DoO + proof (B5-04).

---

## 5. Kapan boleh pindah ke outcome-based pricing (gating)

Pure/per-outcome menggoda tapi berisiko (B5-01 §4). Gerbang wajib **semua** terpenuhi:

1. **Measurement nyata** — outcome bisa diukur otomatis (mis. resolusi CS tercatat di sistem).
2. **Proof ≥ 2–3 case study** — track record di vertikal target.
3. **Kontrak & SLA jelas** — definisi outcome + batas tanggung jawab + cap biaya.
4. **Atribusi disepakati** — pelanggan setuju cara menghitung "hasil karena kami".
5. **Cashflow aman** — tetap ada base fee/langganan sebagai bantalan (hibrida).

> **Aturan emas:** jangan pindah ke metered/outcome-bonus sebelum measurement + proof + kontrak
> matang. Hingga itu: **hibrida deterministik** (Setup + langganan + jasa).

---

## 6. Garansi & risiko (membangun trust = jual outcome)

| Mekanisme | Isi |
|---|---|
| **Garansi DoO** | Jika kriteria DoO tidak tercapai pada delivery → revisi/refund sesuai kebijakan `/legal`. |
| **Refund terbatas** | Mengikuti dokumen Refund di Legal Hub (UU PDP & MoR). |
| **Cap delivery** | Batasi slot DFY/bulan agar kualitas terjaga (1-operator + agent squad). |
| **Truth-Lock harga** | Tidak ada harga "hasil" tanpa mesin & DoO nyata. |

---

## 7. Ringkasan model (satu tabel)

| Pertanyaan | Jawaban kanonik |
|---|---|
| Apa yang dijual? | **Outcome** (hasil bisnis jalan), bukan skill mentah. |
| Bagaimana dihargai? | **Hibrida:** Setup + langganan + jasa (outcome-based = pilot). |
| Dari mana MRR? | **Care Plan + AI Staff** (langganan). |
| Apa moat-nya? | Delivery engine nyata + MoR lokal + proof berbahasa ID. |
| Kapan pure-outcome? | Hanya setelah lulus 5 gerbang §5 (Truth-Lock). |

> Lanjut: bagaimana outcome benar-benar dikirim & dibuktikan → **B5-04**.
