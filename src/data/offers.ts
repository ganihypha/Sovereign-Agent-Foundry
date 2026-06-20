// SPARKMIND-OBP — Offers / SKU perluasan revenue (SSOT batch 05 Monetization §3.2)
// Anchor offer (All-Access Bundle), continuity (Founder Pass), high-ticket (Done-for-You),
// partner (white-label / MoR-aaS). Monetize EVERY capability.

import { PRODUCTS } from './products'

export const CATALOG_TOTAL_IDR = PRODUCTS.reduce((s, p) => s + p.price_idr, 0)

export interface Offer {
  slug: string
  name: string
  tagline: string
  model: 'one-time' | 'subscription' | 'service' | 'partner'
  price_idr: number | null // null = harga custom / hubungi
  priceLabel: string
  highlight?: boolean
  badge?: string
  features: string[]
  cta: string
  ctaHref: string
  note?: string
}

export const OFFERS: Offer[] = [
  {
    slug: 'all-access-bundle',
    name: 'All-Access Bundle',
    tagline: 'Semua 36 sovereign skill, sekali bayar',
    model: 'one-time',
    price_idr: 990000,
    priceLabel: 'Rp 990.000',
    highlight: true,
    badge: 'PALING HEMAT · ~68% OFF',
    features: [
      `Akses penuh ${PRODUCTS.length} sovereign skill (nilai katalog Rp ${CATALOG_TOTAL_IDR.toLocaleString('id-ID')})`,
      'C-Suite + semua Squad + Orchestration + Memory + Deploy',
      'Akses selamanya (lifetime) untuk versi yang dirilis',
      'Update minor gratis pada skill yang dibeli',
      'Lisensi penggunaan internal/komersial untuk bisnis Anda'
    ],
    cta: 'Beli All-Access',
    ctaHref: '/checkout/all-access-bundle',
    note: 'Anchor offer: harga jauh di bawah total beli satuan.'
  },
  {
    slug: 'founder-pass',
    name: 'Founder Pass',
    tagline: 'Langganan — semua skill + update + prioritas support',
    model: 'subscription',
    price_idr: 149000,
    priceLabel: 'Rp 149.000 / bln',
    badge: 'MRR · HARGA PENDIRI',
    features: [
      'Akses SEMUA skill selama langganan aktif',
      'Update & skill baru otomatis tanpa biaya tambahan',
      'Prioritas support (jalur cepat email/WA)',
      'Akses awal (early access) skill & fitur baru',
      'Bisa dibatalkan kapan saja'
    ],
    cta: 'Gabung Founder Pass',
    ctaHref: '/checkout/founder-pass',
    note: 'Cocok untuk builder/agency yang ingin selalu update.'
  },
  {
    slug: 'done-for-you',
    name: 'Done-for-You Setup',
    tagline: 'Kami pasang & deploy skill ke akun Anda',
    model: 'service',
    price_idr: null,
    priceLabel: 'Mulai Rp 1.500.000',
    badge: 'HIGH-TOUCH',
    features: [
      'Instalasi & kustomisasi skill untuk kebutuhan bisnis Anda',
      'Deploy ke akun Cloudflare Anda (BYOK) + domain',
      'Integrasi pembayaran lokal (Duitku/MoR) bila diperlukan',
      'Sesi handoff + dokumentasi operasional',
      'Garansi perbaikan 14 hari pasca-serah-terima'
    ],
    cta: 'Ajukan Intake',
    ctaHref: '/done-for-you',
    note: 'AI Company in a Box (C-Suite + squad) tersedia: Rp 5–15jt.'
  },
  {
    slug: 'partner-program',
    name: 'Reseller / White-Label & MoR-aaS',
    tagline: 'Jual ulang katalog kami atau pakai rel pembayaran patuh kami',
    model: 'partner',
    price_idr: null,
    priceLabel: 'Rev-share 30–50%',
    badge: 'NETWORK EFFECT',
    features: [
      'White-label / reseller katalog skill (rev-share 30–50%)',
      'MoR-as-a-Service: terima pembayaran lokal patuh via OBP (fee 5–10%)',
      'Akses portal partner & laporan settlement',
      'Co-marketing & onboarding kreator pihak ketiga'
    ],
    cta: 'Jadi Partner',
    ctaHref: '/partner',
    note: 'Membuka marketplace 2-sisi (DOMINATION H2–H3).'
  }
]

export const findOffer = (slug: string) => OFFERS.find((o) => o.slug === slug)

// Pseudo-produk untuk checkout offer one-time/subscription (dipakai engine checkout).
export const OFFER_AS_PRODUCT: Record<string, { name: string; price_idr: number; brand: string }> = {
  'all-access-bundle': { name: 'All-Access Bundle (36 skill)', price_idr: 990000, brand: 'sparkmind' },
  'founder-pass': { name: 'Founder Pass (langganan bulan pertama)', price_idr: 149000, brand: 'sparkmind' }
}
