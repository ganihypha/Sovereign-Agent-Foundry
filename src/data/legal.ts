// SPARKMIND-OBP — Legal Hub content (enterprise / production / industry-grade)
// Sumber doctrine: SSOT batch 04/05/11 (compliance gate), 4-Layer Hybrid Lock.
// MoR: Oasis BI Pro (OBP) · Gateway: Duitku (PJP terdaftar & diawasi Bank Indonesia).
// Catatan: konten ini bersifat informatif & disusun sebagai dasar kepatuhan;
// untuk kasus spesifik, owner dapat berkonsultasi dengan penasihat hukum.

import { MOR, MOTHER_BRAND } from './brands'

export const LEGAL_META = {
  effectiveDate: '20 Juni 2026',
  version: 'v1.0',
  jurisdiction: 'Republik Indonesia',
  governingLaw:
    'Hukum Negara Republik Indonesia (termasuk UU ITE, UU No. 27/2022 tentang Pelindungan Data Pribadi, dan UU Perlindungan Konsumen).',
  entity: MOR.name,
  entityDomain: MOR.domain,
  brand: MOTHER_BRAND.name,
  brandDomain: MOTHER_BRAND.domain,
  supportEmail: 'support@oasis-bi-pro.web.id',
  legalEmail: 'legal@oasis-bi-pro.web.id',
  privacyEmail: 'privacy@oasis-bi-pro.web.id',
  whatsapp: '+62 811-0000-OBP'
}

export interface LegalSection {
  heading: string
  body: string[] // tiap item = satu paragraf
}

export interface LegalDoc {
  slug: string
  title: string
  subtitle: string
  icon: string
  intro: string
  sections: LegalSection[]
}

const M = LEGAL_META

/* ───────────────────────── Terms of Service ───────────────────────── */
const terms: LegalDoc = {
  slug: 'terms',
  title: 'Syarat & Ketentuan',
  subtitle: 'Terms of Service',
  icon: 'fa-file-contract',
  intro: `Syarat & Ketentuan ("S&K") ini mengatur akses dan penggunaan platform ${M.brand} (Sovereign Agent Foundry) di ${M.brandDomain}, serta pembelian produk digital yang diproses oleh ${M.entity} (${M.entityDomain}) sebagai Merchant-of-Record. Dengan mengakses platform atau melakukan pembelian, Anda menyetujui S&K ini.`,
  sections: [
    {
      heading: '1. Definisi',
      body: [
        '"Platform" berarti situs, aplikasi, API, dan layanan yang dioperasikan di bawah brand SparkMind / Sovereign Agent Foundry.',
        '"Produk Digital" berarti sovereign skill, bundle, paket langganan (Founder Pass), serta aset/dokumen digital lain yang ditawarkan di Platform.',
        `"Merchant-of-Record (MoR)" berarti ${M.entity}, pihak yang bertindak sebagai penjual tercatat, bertanggung jawab atas penagihan, faktur, perpajakan tidak langsung yang berlaku, dan rekonsiliasi settlement.`,
        '"Anda/Pengguna" berarti orang atau badan yang mengakses Platform atau melakukan pembelian.'
      ]
    },
    {
      heading: '2. Kelayakan & Akun',
      body: [
        'Anda menyatakan berusia minimal 18 tahun atau telah cakap hukum, serta memberikan data yang benar, akurat, dan terkini saat checkout.',
        'Anda bertanggung jawab menjaga kerahasiaan tautan unduh / token lisensi yang diterbitkan kepada Anda.'
      ]
    },
    {
      heading: '3. Lisensi Penggunaan Produk',
      body: [
        'Pembelian satu kali (one-time) memberikan lisensi non-eksklusif, dapat dialihkan secara terbatas, untuk menggunakan Produk Digital bagi keperluan internal bisnis atau pribadi Anda.',
        'Kecuali pada SKU white-label/reseller yang dinyatakan tegas, Anda DILARANG: (a) menjual ulang, mendistribusikan, atau mempublikasikan file skill secara publik; (b) menghapus atribusi/lisensi; (c) menggunakan untuk melatih model guna menggantikan/mereplikasi katalog kami.',
        'Paket langganan (Founder Pass) memberikan akses selama langganan aktif; akses berakhir jika langganan dihentikan.'
      ]
    },
    {
      heading: '4. Harga, Pembayaran & Faktur',
      body: [
        `Seluruh harga ditampilkan dalam Rupiah (IDR) dan telah/atau belum termasuk pajak sebagaimana berlaku, yang akan diperjelas pada saat checkout. Pembayaran diproses oleh ${M.entity} melalui PJP Duitku yang terdaftar dan diawasi Bank Indonesia.`,
        'Konfirmasi pembayaran dilakukan melalui callback resmi gateway. Tautan unduh / akses diterbitkan setelah status pembayaran terkonfirmasi "paid".',
        'Faktur/bukti pembayaran dapat diminta melalui ' + M.supportEmail + '.'
      ]
    },
    {
      heading: '5. Pengiriman Produk Digital',
      body: [
        'Produk bersifat digital dan dikirim secara elektronik (tautan unduh dan/atau email lisensi) segera setelah pembayaran terkonfirmasi, umumnya dalam hitungan menit.',
        'Jika Anda tidak menerima akses dalam 1×24 jam setelah pembayaran "paid", hubungi support dengan menyertakan Merchant Order ID Anda.'
      ]
    },
    {
      heading: '6. Hak Kekayaan Intelektual',
      body: [
        'Seluruh doctrine (MASTER-ARCHITECT, 4-Layer Hybrid Lock, 7 Non-Negotiables), kode, konten, merek, dan katalog skill adalah milik SparkMind / pemiliknya dan dilindungi hukum HKI Indonesia dan internasional.',
        'Pembelian tidak mengalihkan kepemilikan HKI, hanya memberikan lisensi penggunaan sesuai Bagian 3.'
      ]
    },
    {
      heading: '7. Penggunaan yang Dilarang',
      body: [
        'Anda dilarang menggunakan Platform untuk aktivitas melanggar hukum, penipuan, pelanggaran HKI pihak ketiga, penyebaran malware, atau upaya membobol keamanan (termasuk prompt-injection terhadap sistem kami).',
        'Kami berhak menangguhkan akses dan membatalkan lisensi atas pelanggaran, tanpa mengurangi hak penagihan.'
      ]
    },
    {
      heading: '8. Penafian & Batasan Tanggung Jawab',
      body: [
        'Produk Digital disediakan "sebagaimana adanya" (as-is). Kami tidak menjamin hasil bisnis tertentu dari penggunaan skill agentik.',
        'Sepanjang diizinkan hukum, total tanggung jawab kami atas klaim apa pun dibatasi pada jumlah yang Anda bayarkan untuk produk terkait dalam 12 bulan terakhir.'
      ]
    },
    {
      heading: '9. Perubahan Layanan & S&K',
      body: [
        'Kami dapat memperbarui Platform dan S&K ini. Versi terbaru berlaku sejak dipublikasikan pada halaman ini. Penggunaan berkelanjutan berarti penerimaan atas perubahan.'
      ]
    },
    {
      heading: '10. Hukum yang Berlaku & Penyelesaian Sengketa',
      body: [
        `S&K ini diatur oleh ${M.governingLaw}`,
        'Sengketa diupayakan diselesaikan secara musyawarah; bila gagal, diselesaikan melalui pengadilan yang berwenang di Indonesia.',
        `Kontak resmi: ${M.legalEmail}.`
      ]
    }
  ]
}

/* ───────────────────────── Refund Policy ───────────────────────── */
const refund: LegalDoc = {
  slug: 'refund',
  title: 'Kebijakan Pengembalian Dana',
  subtitle: 'Refund Policy',
  icon: 'fa-rotate-left',
  intro: `Kebijakan ini menjelaskan ketentuan pengembalian dana untuk produk digital yang dibeli melalui ${M.brand}, dengan ${M.entity} sebagai Merchant-of-Record. Kami berkomitmen pada perlakuan adil sesuai UU Perlindungan Konsumen.`,
  sections: [
    {
      heading: '1. Sifat Produk Digital',
      body: [
        'Karena produk bersifat digital dan dapat segera diunduh/diakses setelah pembayaran, pembelian pada dasarnya bersifat final. Namun, kami menyediakan perlindungan pembeli di bawah ini.'
      ]
    },
    {
      heading: '2. Pengembalian Dana DIBERIKAN bila',
      body: [
        '(a) Anda dikenai tagihan ganda/duplikat untuk pesanan yang sama;',
        '(b) Produk tidak dapat diakses/diunduh karena kesalahan teknis dari pihak kami dan tidak dapat diperbaiki dalam 3×24 jam;',
        '(c) Produk secara material tidak sesuai dengan deskripsi pada halaman produk (material misrepresentation).'
      ]
    },
    {
      heading: '3. Pengembalian Dana TIDAK DIBERIKAN bila',
      body: [
        '(a) Anda berubah pikiran setelah file berhasil diunduh dan tidak ada cacat produk;',
        '(b) Ketidaksesuaian disebabkan lingkungan/akun pihak ketiga Anda sendiri (mis. konfigurasi Cloudflare/akun Anda);',
        '(c) Pelanggaran lisensi (distribusi ulang tanpa hak).'
      ]
    },
    {
      heading: '4. Langganan (Founder Pass)',
      body: [
        'Langganan dapat dibatalkan kapan saja; akses berlanjut hingga akhir periode tagihan berjalan. Periode yang sudah berjalan tidak dikembalikan kecuali diwajibkan hukum.'
      ]
    },
    {
      heading: '5. Cara Mengajukan',
      body: [
        `Kirim permohonan ke ${M.supportEmail} dalam 7 hari kalender sejak pembelian, sertakan: Merchant Order ID, email pembelian, dan alasan/bukti.`,
        'Kami meninjau dalam 3 hari kerja. Pengembalian yang disetujui diproses ke metode pembayaran asal melalui gateway dalam 7–14 hari kerja (tergantung bank/penyedia).'
      ]
    }
  ]
}

/* ───────────────────────── Privacy Policy (UU PDP) ───────────────────────── */
const privacy: LegalDoc = {
  slug: 'privacy',
  title: 'Kebijakan Privasi',
  subtitle: 'Privacy Policy · UU PDP No. 27/2022',
  icon: 'fa-user-shield',
  intro: `Kebijakan Privasi ini menjelaskan bagaimana ${M.entity} (selaku Pengendali Data) dan ${M.brand} mengumpulkan, menggunakan, dan melindungi data pribadi Anda sesuai UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP).`,
  sections: [
    {
      heading: '1. Data yang Kami Kumpulkan',
      body: [
        'Data identitas & kontak: nama dan alamat email yang Anda berikan saat checkout/waitlist.',
        'Data transaksi: produk yang dibeli, jumlah, status pembayaran, Merchant Order ID, dan referensi gateway.',
        'Data teknis terbatas: log permintaan untuk keamanan dan pencegahan penipuan. Kami TIDAK menyimpan data kartu/kredensial pembayaran Anda — diproses langsung oleh PJP Duitku.'
      ]
    },
    {
      heading: '2. Dasar & Tujuan Pemrosesan',
      body: [
        'Pelaksanaan kontrak: memproses pesanan, menerbitkan lisensi/tautan unduh, dan dukungan pelanggan.',
        'Kewajiban hukum: pencatatan settlement (brand ledger) untuk audit dan perpajakan.',
        'Kepentingan sah: keamanan platform, pencegahan fraud, dan peningkatan layanan.',
        'Persetujuan: pengiriman informasi/penawaran (dapat ditarik kapan saja).'
      ]
    },
    {
      heading: '3. Berbagi Data dengan Pihak Ketiga',
      body: [
        'PJP/Gateway pembayaran (Duitku) untuk memproses transaksi; tunduk pada pengawasan Bank Indonesia.',
        'Penyedia infrastruktur (Cloudflare) untuk hosting/edge; serta penyedia email (mis. Resend/Mailgun) untuk mengirim lisensi.',
        'Kami TIDAK menjual data pribadi Anda kepada pihak ketiga.'
      ]
    },
    {
      heading: '4. Penyimpanan & Keamanan',
      body: [
        'Data disimpan pada Cloudflare D1 (edge) dengan kontrol akses. Secret/kunci disimpan terenkripsi.',
        'Kami menerapkan langkah teknis & organisasi yang wajar (least-privilege, signature verification, audit trail) untuk melindungi data.'
      ]
    },
    {
      heading: '5. Retensi',
      body: [
        'Data transaksi disimpan selama diperlukan untuk tujuan hukum/akuntansi (umumnya sampai 10 tahun untuk catatan keuangan), lalu dihapus/dianonimkan.'
      ]
    },
    {
      heading: '6. Hak Subjek Data (UU PDP)',
      body: [
        'Anda berhak: mengakses, memperbaiki, memperbarui, menghapus, membatasi/menolak pemrosesan, menarik persetujuan, dan meminta portabilitas data Anda.',
        `Untuk menggunakan hak ini, hubungi ${M.privacyEmail}. Kami menanggapi dalam jangka waktu yang wajar sesuai UU PDP.`
      ]
    },
    {
      heading: '7. Anak di Bawah Umur',
      body: [
        'Layanan ditujukan untuk pengguna dewasa/cakap hukum. Kami tidak dengan sengaja mengumpulkan data anak di bawah umur tanpa persetujuan yang sah.'
      ]
    },
    {
      heading: '8. Kontak Pengendali Data',
      body: [
        `${M.entity} · ${M.entityDomain} · email privasi: ${M.privacyEmail}.`
      ]
    }
  ]
}

/* ───────────────────────── Compliance / MoR Disclosure ───────────────────────── */
const compliance: LegalDoc = {
  slug: 'compliance',
  title: 'Kepatuhan & Merchant-of-Record',
  subtitle: 'Compliance & MoR Disclosure',
  icon: 'fa-shield-halved',
  intro: `Halaman ini menjelaskan struktur kepatuhan 4-Layer Hybrid Lock yang menjadikan ${M.brand} aman dan legal untuk bertransaksi.`,
  sections: [
    {
      heading: '1. Struktur 4-Layer Hybrid Lock',
      body: [
        'Layer 1 — Brand: SparkMind (identitas ekosistem).',
        `Layer 2 — Merchant-of-Record: ${M.entity} (settlement, faktur, pajak, legal).`,
        'Layer 3 — Domain: sub-brand vertikal (BarberKas, KuratorKas, PaceLokal, Nurani.OS, MomentKas).',
        'Layer 4 — Compliance: brand ledger (audit trail settlement per pesanan).'
      ]
    },
    {
      heading: '2. Pemrosesan Pembayaran',
      body: [
        'Seluruh pembayaran diproses melalui PJP Duitku yang terdaftar dan diawasi Bank Indonesia. Kami tidak menyimpan kredensial pembayaran Anda.',
        'Setiap transaksi terverifikasi dengan tanda tangan kriptografis (HMAC-SHA256) untuk integritas callback.'
      ]
    },
    {
      heading: '3. Audit & Rekonsiliasi',
      body: [
        'brand_ledger mencatat setiap settlement (gross per brand) sebagai dasar rekonsiliasi & pelaporan pajak, dikelola sesuai doctrine sovereign-cfo.'
      ]
    },
    {
      heading: '4. Kontak Kepatuhan',
      body: [`Pertanyaan kepatuhan/legal: ${M.legalEmail}.`]
    }
  ]
}

export const LEGAL_DOCS: LegalDoc[] = [terms, refund, privacy, compliance]
export const findLegal = (slug: string) => LEGAL_DOCS.find((d) => d.slug === slug)
