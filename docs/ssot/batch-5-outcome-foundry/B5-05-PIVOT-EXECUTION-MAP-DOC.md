# B5-05 · PIVOT-EXECUTION-MAP-DOC — Status Kode, Gap Tertutup, Roadmap
## SparkMind · SSOT Batch 5 · Eksekusi pivot ke Outcome Foundry

> v1.0 · 2026-06-20 · Fokus: **apa yang sudah live di kode**, gap apa yang sudah tertutup vs masih
> terbuka, dan roadmap R2–R5. Mengikat B4-07 (execution log Sprint R1) ke depan.
>
> **Sumber kanonik:** `docs/ssot/batch-5-outcome-foundry/B5-05-PIVOT-EXECUTION-MAP-DOC.md`

---

## 1. Status kode (LIVE & build hijau)

Verifikasi B4-07 + commit `7950fe5`. Yang sudah berjalan di production code:

| Kapabilitas | Route / file | Status |
|---|---|---|
| Landing outcome (bahasa awam) | `/` → `OutcomeHome` (`src/views/solutions.tsx`) | ✅ live |
| Katalog solusi (9 SKU, 4 tier) | `/solutions` → `SolutionsCatalog` | ✅ live |
| Detail solusi (masalah→outcome→plan→mesin) | `/solutions/:slug` → `SolutionDetail` | ✅ live |
| Jalur developer (skill mentah, proof) | `/developers`, `/foundry` | ✅ live |
| Backlink lama dijaga | `/catalog` → 302 `/developers` | ✅ live |
| Checkout SKU solusi via MoR | `/checkout/:slug` (CHECKOUT_PRODUCTS) | ✅ live |
| Pembayaran QRIS/VA | Duitku + webhook (`src/lib/duitku.ts`, `gateway.ts`) | ✅ live (PRODUCTION) |
| Buyer dashboard | `/orders`, `/api/order/:moid` | ✅ live |
| Lead capture DFY/partner | `/api/intake` → tabel `leads` | ✅ live |
| SEO bahasa outcome | `renderer.tsx` (meta/OG/JSON-LD), `sitemap.xml` | ✅ live |
| Data katalog | `src/data/solutions.ts` (9 SKU + pricing ladder) | ✅ live |

> **Zero perubahan merusak:** stack, MoR, Duitku, skema D1 (`0001`/`0002`) tidak berubah.

---

## 2. Gap yang DITUTUP oleh Batch 5 (dokumentasi)

| Gap sebelum B5 | Ditutup oleh |
|---|---|
| Riset OaaS tanpa angka (B4-06 sengaja kosong) | **B5-01** — angka nyata bersumber (Fin $0.99, Zendesk $1.50, Gartner 30%, dst.) |
| Tidak ada definisi sistem "Outcome Foundry" | **B5-02** — 3-lapis, 7 prinsip, taksonomi, DoO |
| Model uang OaaS belum terperinci | **B5-03** — hibrida, value-metric, unit-economics, gating |
| Mesin delivery + proof belum terdokumentasi | **B5-04** — pipeline F0–F7, SLA/TTO, proof-of-outcome |
| Sintesis lintas batch + supersede belum ada | **B5-06** |

---

## 3. Gap yang MASIH terbuka (butuh kode/konten) → roadmap

| Gap | Sprint | Aksi |
|---|---|---|
| Otomasi langganan (renewal MRR) | **R2** | Tabel `subscriptions` + reminder + status di buyer dashboard |
| DoO per-SKU diisi lengkap (9 solusi) | **R2** | Tambah field DoO terstruktur ke `solutions.ts` + tampil di `SolutionDetail` |
| Proof/case study riil (2–3) | **R3** | Halaman `/proof` atau bagian di `/solutions`; rakit dari delivery nyata |
| Perkaya `/partner` (reseller/white-label/MoR-aaS) | **R3** | Konten + intake partner + komisi |
| Canon Course materi penuh + SEO lokal per vertikal | **R4** | Landing course lengkap; halaman SEO per kota/vertikal |
| Pilot outcome-based pricing (1 vertikal terukur) | **R5** | Setelah lulus 5 gerbang B5-03 §5 (measurement+proof+kontrak) |

---

## 4. Definition of Done — PIVOT (level sistem)

- [x] Permukaan produk = outcome (landing, katalog, detail) — Sprint R1.
- [x] Jalur developer terpisah & utuh (proof/funnel).
- [x] Engine MoR melayani SKU solusi tanpa regresi.
- [x] **Doc kanonik sistem OaaS lengkap (B5-00..06).**
- [x] Index + README menunjuk Batch 5.
- [ ] Renewal langganan otomatis (R2).
- [ ] ≥2 proof/case study riil (R3).
- [ ] Pilot outcome-based (R5, ber-gating).

> **Status pivot:** **SELESAI di level sistem & dokumentasi**; sisa = pendalaman fitur (R2–R5).

---

## 5. Risiko eksekusi & mitigasi

| Risiko | Mitigasi |
|---|---|
| Over-promise outcome | DoO + Truth-Lock + garansi (B5-03 §6) |
| Beban delivery 1-operator | Agent squad + cap slot DFY/bulan |
| Delivery tak konsisten | verify-rubric gate + DoO (B5-04 §3) |
| Klaim palsu | Truth-Lock di setiap gate |
| Pemain global masuk ID | Perdalam moat lokal (MoR + bahasa + proof + IDR) |

> Lanjut: sintesis menyeluruh lintas batch + apa yang masih open → **B5-06**.
