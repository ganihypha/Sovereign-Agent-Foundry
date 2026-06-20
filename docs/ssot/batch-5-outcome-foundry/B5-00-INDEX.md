# SSOT BATCH 5 — OUTCOME FOUNDRY (Index)
## SparkMind · Full Pivot: dari "Skill Marketplace" → **Outcome Foundry** (Outcome-as-a-Service)

> v1.0 · 2026-06-20 · **Kanonik & terbaru.** Batch 4 *memutuskan* arah pivot (skill mart →
> Outcome Foundry) dan mengeksekusi Sprint R1 (kode `/solutions` + `/developers` live).
> **Batch 5 menuntaskan pivot menjadi SISTEM & MODEL BISNIS kanonik**: riset OaaS/RaaS/SaS
> dengan angka nyata, definisi sistem, model uang hibrida, mesin delivery + proof, peta
> eksekusi, dan sintesis lintas batch.
>
> **Sumber kanonik:** `docs/ssot/batch-5-outcome-foundry/`

---

## 0. Mengapa Batch 5 ada

Batch 4 menjawab *"haruskah kita pivot?"* → **ya**, dan memindahkan permukaan produk ke
bahasa outcome (B4-07 EXECUTION-LOG). Tapi pivot belum **lengkap sebagai sistem**:

- B4-06 (tesis) sengaja **tidak mengutip angka pasti** ("Truth-Lock: tidak klaim statistik tak
  terverifikasi"). Batch 5 mengisi gap itu dengan **riset bersumber** (Sierra, a16z, Monetizely,
  Zendesk, Intercom Fin, Salesforce, Gartner, Fin AI) — angka nyata, terverifikasi tanggal.
- Belum ada **definisi sistem kanonik** "apa itu Outcome Foundry" (lapisan, prinsip, taksonomi,
  Definition-of-Outcome).
- Belum ada **model bisnis OaaS** terperinci (value-metric, unit-economics, kapan boleh
  pindah ke outcome-based pricing).
- Belum ada **mesin delivery + proof-of-outcome** terdokumentasi end-to-end (pipeline, SLA/TTO,
  gate kualitas).

Batch 5 = lapisan **pendalaman & penuntasan** di atas B4. Ia **tidak menghapus** B4; ia
**menyerap & menyempurnakannya**.

---

## 1. Peta dokumen Batch 5

| # | Dokumen | Isi |
|---|---|---|
| **B5-00** | **[INDEX](B5-00-INDEX.md)** (dok ini) | Peta Batch 5, tesis pivot, non-negotiables, status |
| **B5-01** | **[OAAS-RESEARCH](B5-01-OAAS-RESEARCH-DOC.md)** | Riset OaaS/RaaS/Service-as-a-Software 2025–2026 — definisi, tren, **angka nyata bersumber**, pesaing, batas struktural |
| **B5-02** | **[OUTCOME-FOUNDRY-CONCEPT](B5-02-OUTCOME-FOUNDRY-CONCEPT-DOC.md)** | Definisi sistem 3-lapis, 7 prinsip kanonik, mesin→outcome, taksonomi outcome, **Definition-of-Outcome (DoO)** |
| **B5-03** | **[OUTCOME-BUSINESS-MODEL](B5-03-OUTCOME-BUSINESS-MODEL-DOC.md)** | Pricing hibrida, value-metric, unit-economics, garansi, kapan boleh pindah ke outcome-based |
| **B5-04** | **[OUTCOME-DELIVERY-ENGINE](B5-04-OUTCOME-DELIVERY-ENGINE-DOC.md)** | Pipeline skill→app (F0–F7), SLA/TTO, **proof-of-outcome**, gate kualitas, HITL |
| **B5-05** | **[PIVOT-EXECUTION-MAP](B5-05-PIVOT-EXECUTION-MAP-DOC.md)** | Status kode live, gap tertutup vs terbuka, roadmap R2–R5, Definition-of-Done pivot |
| **B5-06** | **[GAP-CLOSURE-AND-SYNTHESIS](B5-06-GAP-CLOSURE-AND-SYNTHESIS-DOC.md)** | Sintesis Batch 1–5, peta supersede, gap masih terbuka, satu kalimat kanonik |

---

## 2. Tesis pivot (satu paragraf kanonik)

> **SparkMind adalah Outcome Foundry untuk UMKM/SMB Indonesia.** Kami tidak menjual *bahan*
> (file skill, akses tool, jam kerja) — kami menjual **hasil bisnis yang sudah jadi & jalan**
> (aplikasi, otomasi, sistem) sebagai **Outcome-as-a-Service (OaaS)**. **36 sovereign skill =
> mesin** di belakang layar; yang dibeli pasar = **outcome**, dikemas sebagai paket **hibrida**
> (Setup sekali bayar + langganan Care Plan/AI Staff + jasa Done-for-You). Pembayaran lokal
> **QRIS/VA** lewat **Oasis BI Pro (OBP)** sebagai **Merchant-of-Record (MoR)** via **Duitku**
> (PRODUCTION, uang riil). Jalur developer (skill mentah) tetap ada sebagai **proof &
> top-of-funnel** di `/developers`.

---

## 3. Non-negotiables (pagar Batch 5)

1. **Truth-Lock di setiap janji.** Outcome hanya boleh dijanjikan jika ada **mesin nyata** yang
   mendukungnya (lihat peta 9 solusi → skill di B4-07 §4). Tidak ada outcome "kosong".
2. **Hibrida dulu, pure-outcome belakangan.** Riset (B5-01) membuktikan *pure outcome pricing*
   punya batas struktural (atribusi & prediktabilitas). Default kita = **deterministik hibrida**;
   outcome-based pricing hanya **pilot** setelah measurement + proof + kontrak matang.
3. **Indonesia-first.** Bahasa Indonesia, harga IDR, QRIS/VA, kepatuhan lokal (UU PDP, MoR).
4. **Zero perubahan merusak.** Stack (Hono + CF Pages + D1), MoR (OBP), Duitku, skema DB **tidak
   berubah** — pivot = kemasan, pasar, bahasa, harga. (Sesuai B4-05/B4-07.)
5. **Dual-front.** Pintu mainstream (UMKM/SMB) = mesin uang utama; pintu developer = proof &
   funnel. Keduanya hidup berdampingan.

---

## 4. Status Batch 5

- [x] Riset OaaS/RaaS/SaS bersumber & ber-angka (B5-01).
- [x] Definisi sistem "Outcome Foundry" kanonik (B5-02).
- [x] Model bisnis OaaS + unit-economics (B5-03).
- [x] Mesin delivery + proof-of-outcome (B5-04).
- [x] Peta eksekusi + roadmap R2–R5 (B5-05).
- [x] Sintesis lintas batch + peta supersede (B5-06).
- [x] `00-SSOT-CANONICAL-INDEX.md` + `README.md` menunjuk Batch 5.
- [x] Build hijau, smoke test route live, **commit & push** ke `Sovereign-Agent-Foundry`.

> Detail riset → **B5-01**. Definisi sistem → **B5-02**. Uang → **B5-03**.
> Delivery & proof → **B5-04**. Eksekusi → **B5-05**. Sintesis → **B5-06**.
