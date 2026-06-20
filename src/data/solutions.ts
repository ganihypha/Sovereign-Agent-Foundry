// SPARKMIND-OBP — KATALOG SOLUSI (Outcome Foundry)
// Pivot SSOT Batch 4: kita menjual HASIL (outcome) yang dirakit dari 36 sovereign skill,
// bukan file skill mentah. Skill = mesin; Solusi = masakan jadi yang dijual ke pasar.
//
// Doctrine Truth-Lock: hanya jual outcome yang BISA dibangun dari skill yang ada.
// Engine checkout/MoR/Duitku di-reuse penuh (lihat OFFER_AS_PRODUCT di bawah).

import type { BrandKey } from '../types'

export type DeliveryModel = 'diy' | 'dwy' | 'dfy' // do-it-yourself / done-with-you / done-for-you
export type SolutionTier = 'vertical' | 'subscription' | 'high-ticket' | 'education'

export interface SolutionPlan {
  /** label paket, mis. "Setup (sekali bayar)" / "Care Plan (langganan)" */
  name: string
  model: DeliveryModel
  price_idr: number | null // null = harga custom / hubungi
  priceLabel: string
  /** slug checkout yang dipakai engine (harus terdaftar di OFFER_AS_PRODUCT bila one-time) */
  checkoutSlug?: string
  /** href fallback bila bukan checkout langsung (mis. intake) */
  href?: string
  highlight?: boolean
  includes: string[]
}

export interface Solution {
  slug: string
  /** nama outcome dalam bahasa pasar (bukan jargon) */
  name: string
  /** janji satu kalimat (hero) */
  promise: string
  /** masalah nyata yang dirasakan pembeli */
  problem: string
  /** untuk siapa (ICP konkret, bisa disebut namanya) */
  icp: string
  /** ikon FontAwesome */
  icon: string
  brand: BrandKey
  tier: SolutionTier
  featured?: boolean
  /** apa yang pembeli dapat (outcome, bukan fitur teknis) */
  outcomes: string[]
  /** skill "mesin" yang dirakit (transparansi untuk developer/partner) */
  engineSkills: string[]
  /** paket harga (DIY/DWY/DFY) */
  plans: SolutionPlan[]
  /** estimasi waktu kirim */
  eta: string
}

// ── Harga acuan (IDR) ──────────────────────────────────────────────
const P = {
  diyVertical: 490000, // beli template/app vertikal, pasang sendiri (jalur developer)
  setupVertical: 1500000, // kami pasang & deploy app vertikal ke akun klien
  carePlan: 199000, // langganan pemeliharaan + update + support
  aiStaff: 490000, // langganan "AI staff" per fungsi (CS / marketing / admin)
  appCustom: 5000000, // app custom done-for-you (mulai)
  aiCompany: 12000000, // AI Company in a Box (C-Suite + squad)
  canonCourse: 349000 // kursus kanonik (tripwire edukasi)
}

const idr = (n: number) => 'Rp ' + n.toLocaleString('id-ID')

export const SOLUTIONS: Solution[] = [
  // ───────────────────────── VERTIKAL (kepala-pantai nyata) ─────────────────────────
  {
    slug: 'kas-booking-jasa-lokal',
    name: 'Kasir + Booking untuk Jasa Lokal',
    promise: 'Kasir, jadwal booking, dan reminder WhatsApp — jadi dalam sehari.',
    problem:
      'Pemilik barber/salon/laundry/bengkel masih catat manual, booking lewat chat berantakan, dan sering lupa follow-up pelanggan.',
    icp: 'Barbershop, salon, laundry, bengkel, klinik kecil, studio.',
    icon: 'fa-cash-register',
    brand: 'barberkas',
    tier: 'vertical',
    featured: true,
    eta: '1–3 hari kerja',
    outcomes: [
      'Aplikasi kas online (pemasukan, pengeluaran, laporan harian).',
      'Sistem booking + jadwal yang rapi (tanpa chat berantakan).',
      'Reminder otomatis ke pelanggan (kurangi no-show).',
      'Dashboard ringkas untuk pantau omzet kapan saja.',
      'Bisa diakses dari HP, tanpa instalasi ribet.'
    ],
    engineSkills: ['squad-opsfinance', 'fullstack-cycle', 'cf-byok-deploy', 'workflow-ops', 'credit-aware'],
    plans: [
      {
        name: 'Setup (sekali bayar)',
        model: 'dfy',
        price_idr: P.setupVertical,
        priceLabel: 'Mulai ' + idr(P.setupVertical),
        href: '/solutions/kas-booking-jasa-lokal#intake',
        highlight: true,
        includes: ['Kami bangun & deploy ke domain Anda', 'Setup kas + booking + reminder', 'Sesi handoff + panduan pakai']
      },
      {
        name: 'Care Plan (langganan)',
        model: 'dwy',
        price_idr: P.carePlan,
        priceLabel: idr(P.carePlan) + ' / bln',
        checkoutSlug: 'care-plan',
        includes: ['Pemeliharaan & update', 'Support prioritas (WA/email)', 'Penyesuaian minor tiap bulan']
      }
    ]
  },
  {
    slug: 'toko-online-cs-otomatis',
    name: 'Toko Online + CS Otomatis',
    promise: 'Etalase online yang menerima pesanan & menjawab pelanggan otomatis.',
    problem:
      'Jualan masih lewat DM/chat satu-satu, kewalahan balas pertanyaan yang sama, dan tidak punya etalase profesional.',
    icp: 'UMKM produk, reseller, brand lokal, F&B, fashion.',
    icon: 'fa-store',
    brand: 'sparkmind',
    tier: 'vertical',
    featured: true,
    eta: '2–5 hari kerja',
    outcomes: [
      'Etalase/landing produk yang rapi & cepat.',
      'Terima pesanan + pembayaran QRIS/VA langsung.',
      'CS otomatis (FAQ, status pesanan, rekomendasi).',
      'Rekap order & pelanggan dalam satu tempat.',
      'Siap dipromosikan (SEO dasar + share link).'
    ],
    engineSkills: ['fullstack-cycle', 'squad-sales-cs', 'claw-actuation', 'gtm-engineering', 'cf-byok-deploy'],
    plans: [
      {
        name: 'Setup (sekali bayar)',
        model: 'dfy',
        price_idr: P.setupVertical,
        priceLabel: 'Mulai ' + idr(P.setupVertical),
        href: '/solutions/toko-online-cs-otomatis#intake',
        highlight: true,
        includes: ['Etalase + pembayaran lokal', 'CS otomatis terlatih untuk produk Anda', 'Deploy ke domain Anda']
      },
      {
        name: 'AI Staff — CS (langganan)',
        model: 'dwy',
        price_idr: P.aiStaff,
        priceLabel: idr(P.aiStaff) + ' / bln',
        checkoutSlug: 'ai-staff-cs',
        includes: ['CS otomatis selalu update', 'Tambah skenario/produk baru', 'Laporan interaksi bulanan']
      }
    ]
  },
  {
    slug: 'mesin-konten-promo',
    name: 'Mesin Konten & Promo Bisnis',
    promise: 'Konten sosmed & promo bisnismu, otomatis tiap minggu.',
    problem:
      'Tidak punya waktu/ide bikin konten konsisten, promo dadakan tidak terjadwal, dan engagement stagnan.',
    icp: 'Bisnis lokal, personal brand, agency kecil, F&B, retail.',
    icon: 'fa-bullhorn',
    brand: 'pacelokal',
    tier: 'vertical',
    featured: true,
    eta: '1–3 hari kerja',
    outcomes: [
      'Kalender konten + draft caption otomatis tiap minggu.',
      'Template promo (flash sale, hari besar, peluncuran).',
      'Landing promo siap-share dengan CTA jelas.',
      'Arahan visual & hook yang sesuai brand.',
      'Konsisten tanpa harus mikir tiap hari.'
    ],
    engineSkills: ['cmo', 'squad-marketing', 'gtm-engineering', 'n8n-workflow'],
    plans: [
      {
        name: 'AI Staff — Marketing (langganan)',
        model: 'dwy',
        price_idr: P.aiStaff,
        priceLabel: idr(P.aiStaff) + ' / bln',
        checkoutSlug: 'ai-staff-marketing',
        highlight: true,
        includes: ['Konten & promo rutin tiap minggu', 'Landing promo on-demand', 'Revisi arah konten bulanan']
      },
      {
        name: 'Template (DIY)',
        model: 'diy',
        price_idr: P.diyVertical,
        priceLabel: idr(P.diyVertical),
        checkoutSlug: 'template-konten',
        includes: ['Template kalender + caption', 'Template landing promo', 'Panduan pakai sendiri']
      }
    ]
  },
  {
    slug: 'event-tiket-rsvp',
    name: 'Sistem Event, Tiket & RSVP',
    promise: 'Kelola event, jual tiket, dan kumpulkan RSVP tanpa ribet.',
    problem:
      'Pendaftaran event masih lewat form/spreadsheet manual, pembayaran tiket terpisah, dan absensi sulit dilacak.',
    icp: 'Event organizer, komunitas, kelas/workshop, gereja/masjid, sekolah.',
    icon: 'fa-ticket',
    brand: 'momentkas',
    tier: 'vertical',
    eta: '2–4 hari kerja',
    outcomes: [
      'Halaman event + pendaftaran online.',
      'Jual tiket dengan pembayaran QRIS/VA.',
      'RSVP & daftar hadir otomatis.',
      'Reminder peserta sebelum hari-H.',
      'Rekap peserta & pendapatan.'
    ],
    engineSkills: ['claw-actuation', 'computer-browser-use', 'fullstack-cycle', 'squad-product'],
    plans: [
      {
        name: 'Setup (sekali bayar)',
        model: 'dfy',
        price_idr: P.setupVertical,
        priceLabel: 'Mulai ' + idr(P.setupVertical),
        href: '/solutions/event-tiket-rsvp#intake',
        highlight: true,
        includes: ['Halaman event + tiket', 'RSVP & reminder', 'Deploy ke domain Anda']
      }
    ]
  },
  {
    slug: 'donasi-keanggotaan',
    name: 'Sistem Donasi & Keanggotaan',
    promise: 'Terima donasi & kelola anggota secara aman dan patuh.',
    problem:
      'Donasi masih lewat transfer manual tanpa pencatatan rapi, data anggota tersebar, dan laporan sulit dibuat.',
    icp: 'Yayasan, masjid/gereja, komunitas, UMKM sosial, koperasi.',
    icon: 'fa-hand-holding-heart',
    brand: 'nurani',
    tier: 'vertical',
    eta: '2–5 hari kerja',
    outcomes: [
      'Halaman donasi dengan pembayaran QRIS/VA.',
      'Pencatatan donasi & kuitansi otomatis.',
      'Database anggota + status keanggotaan.',
      'Laporan transparan untuk publik/pengurus.',
      'Keamanan data sesuai praktik baik (UU PDP).'
    ],
    engineSkills: ['zero-trust', 'supabase-vault', 'fullstack-cycle', 'verify-rubric'],
    plans: [
      {
        name: 'Setup (sekali bayar)',
        model: 'dfy',
        price_idr: P.setupVertical,
        priceLabel: 'Mulai ' + idr(P.setupVertical),
        href: '/solutions/donasi-keanggotaan#intake',
        highlight: true,
        includes: ['Halaman donasi + anggota', 'Laporan & kuitansi', 'Deploy ke domain Anda']
      }
    ]
  },
  {
    slug: 'otomasi-admin-dokumen',
    name: 'Otomasi Admin & Dokumen',
    promise: 'Rekap, laporan, FAQ, dan SOP yang mengerjakan dirinya sendiri.',
    problem:
      'Pekerjaan admin repetitif memakan waktu: rekap manual, balas pertanyaan berulang, dokumen tak terstruktur.',
    icp: 'SMB, kantor kecil, klinik, sekolah, agency.',
    icon: 'fa-robot',
    brand: 'kuratorkas',
    tier: 'vertical',
    eta: '2–4 hari kerja',
    outcomes: [
      'Rekap & laporan otomatis dari data Anda.',
      'Knowledge base / FAQ internal yang bisa ditanya.',
      'SOP & dokumen terstandar otomatis.',
      'Hemat jam kerja admin setiap minggu.',
      'Bisa diintegrasikan ke alur kerja yang ada.'
    ],
    engineSkills: ['n8n-workflow', 'hermes-memory', 'verify-rubric', 'cowork-handoff'],
    plans: [
      {
        name: 'AI Staff — Admin (langganan)',
        model: 'dwy',
        price_idr: P.aiStaff,
        priceLabel: idr(P.aiStaff) + ' / bln',
        checkoutSlug: 'ai-staff-admin',
        highlight: true,
        includes: ['Otomasi admin berjalan rutin', 'Tambah alur baru tiap bulan', 'Support prioritas']
      }
    ]
  },

  // ───────────────────────── HIGH-TICKET (jasa) ─────────────────────────
  {
    slug: 'app-custom-done-for-you',
    name: 'Aplikasi Custom (Done-for-You)',
    promise: 'Ceritakan masalahnya — kami bangun aplikasinya sampai jalan.',
    problem:
      'Kebutuhan Anda spesifik dan tidak ada produk jadi yang pas; freelancer lambat, agensi mahal.',
    icp: 'SMB tumbuh, startup, agency, profesional dengan kebutuhan khusus.',
    icon: 'fa-cubes',
    brand: 'sparkmind',
    tier: 'high-ticket',
    featured: true,
    eta: 'Hari–minggu (sesuai cakupan)',
    outcomes: [
      'Aplikasi web custom sesuai kebutuhan, sudah jalan.',
      'Dibangun di edge (cepat & murah dioperasikan).',
      'Integrasi pembayaran lokal bila perlu.',
      'Deploy ke akun/domain Anda (Anda yang punya).',
      'Handoff + dokumentasi + garansi perbaikan.'
    ],
    engineSkills: ['fullstack-cycle', 'orchestrator', 'cf-byok-deploy', 'github-push', 'master-boot'],
    plans: [
      {
        name: 'App Custom',
        model: 'dfy',
        price_idr: P.appCustom,
        priceLabel: 'Mulai ' + idr(P.appCustom),
        href: '/done-for-you',
        highlight: true,
        includes: ['Discovery + scope', 'Build + deploy', 'Handoff + garansi 14 hari']
      }
    ]
  },
  {
    slug: 'ai-company-in-a-box',
    name: 'AI Company in a Box',
    promise: 'Tim C-Suite + squad AI yang menjalankan operasi bisnismu.',
    problem:
      'Anda solo/tim kecil tapi butuh kapasitas selevel perusahaan: strategi, produk, marketing, ops, finance.',
    icp: 'Founder solo, agency, SMB yang ingin skala tanpa tambah headcount besar.',
    icon: 'fa-sitemap',
    brand: 'sparkmind',
    tier: 'high-ticket',
    eta: 'Onboarding 1–2 minggu',
    outcomes: [
      'Set agent C-Suite (CTO/CMO/CFO/COO/CPO) + Orchestrator.',
      'Squad fungsional: engineering, marketing, product, ops-finance, sales-CS.',
      'Alur kerja & handoff terdokumentasi (SSOT).',
      'Disesuaikan dengan model bisnis Anda.',
      'Pendampingan operasi & iterasi.'
    ],
    engineSkills: ['cofounder', 'orchestrator', 'cto', 'cmo', 'cfo', 'coo', 'cpo', 'squad-engineering', 'squad-marketing', 'squad-product', 'squad-opsfinance', 'squad-sales-cs'],
    plans: [
      {
        name: 'AI Company',
        model: 'dfy',
        price_idr: P.aiCompany,
        priceLabel: 'Mulai ' + idr(P.aiCompany),
        href: '/done-for-you',
        highlight: true,
        includes: ['Setup C-Suite + squad', 'SSOT operasi', 'Pendampingan onboarding']
      }
    ]
  },

  // ───────────────────────── EDUKASI (tripwire) ─────────────────────────
  {
    slug: 'canon-course-id',
    name: 'Canon Course (Bahasa Indonesia)',
    promise: 'Kuasai cara membangun bisnis dengan AI agentik — dari kanon nyata.',
    problem:
      'Banyak teori AI berbahasa Inggris & abstrak; Anda butuh jalur praktis berbahasa Indonesia.',
    icp: 'Builder pemula, founder, mahasiswa, profesional yang ingin upskilling.',
    icon: 'fa-graduation-cap',
    brand: 'sparkmind',
    tier: 'education',
    eta: 'Akses instan',
    outcomes: [
      'Kurikulum kanonik (Anthropic + Cloudflare canon) berbahasa Indonesia.',
      'Studi kasus nyata dari ekosistem SparkMind.',
      'Template & checklist yang langsung dipakai.',
      'Jalur menuju jadi partner/builder.',
      'Update materi mengikuti doctrine terbaru.'
    ],
    engineSkills: ['hermes-memory', 'verify-rubric'],
    plans: [
      {
        name: 'Akses Course',
        model: 'diy',
        price_idr: P.canonCourse,
        priceLabel: idr(P.canonCourse),
        checkoutSlug: 'canon-course',
        highlight: true,
        includes: ['Akses penuh materi', 'Update seumur versi', 'Komunitas builder']
      }
    ]
  }
]

export const findSolution = (slug: string) => SOLUTIONS.find((s) => s.slug === slug)
export const featuredSolutions = () => SOLUTIONS.filter((s) => s.featured)

export const SOLUTION_TIERS: { key: SolutionTier; label: string; desc: string }[] = [
  { key: 'vertical', label: 'Solusi Vertikal', desc: 'Produk jadi per jenis bisnis — pasang cepat.' },
  { key: 'subscription', label: 'AI Staff & Care Plan', desc: 'Langganan: sistem yang terus bekerja & terawat.' },
  { key: 'high-ticket', label: 'Done-for-You', desc: 'App custom & AI Company in a Box.' },
  { key: 'education', label: 'Edukasi', desc: 'Belajar membangun sendiri (jalur builder).' }
]

// Pseudo-produk checkout untuk SKU solusi one-time/subscription (di-reuse engine checkout).
// Disatukan dengan OFFER_AS_PRODUCT di index.tsx.
export const SOLUTION_AS_PRODUCT: Record<string, { name: string; price_idr: number; brand: string }> = {
  'care-plan': { name: 'Care Plan (langganan — bulan pertama)', price_idr: P.carePlan, brand: 'sparkmind' },
  'ai-staff-cs': { name: 'AI Staff — CS (bulan pertama)', price_idr: P.aiStaff, brand: 'sparkmind' },
  'ai-staff-marketing': { name: 'AI Staff — Marketing (bulan pertama)', price_idr: P.aiStaff, brand: 'pacelokal' },
  'ai-staff-admin': { name: 'AI Staff — Admin (bulan pertama)', price_idr: P.aiStaff, brand: 'kuratorkas' },
  'template-konten': { name: 'Template Mesin Konten (DIY)', price_idr: P.diyVertical, brand: 'pacelokal' },
  'canon-course': { name: 'Canon Course (Bahasa Indonesia)', price_idr: P.canonCourse, brand: 'sparkmind' }
}
