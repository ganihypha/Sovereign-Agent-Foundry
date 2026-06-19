import type { BrandKey } from '../types'

// 4-LAYER HYBRID LOCK (doctrine SPARKMIND-OBP v2.0)
// Layer 1 Brand (mother): SparkMind
// Layer 2 Merchant (MoR):  Oasis BI Pro (OBP)
// Layer 3 Domain:          sub-brand produk
// Layer 4 Compliance:      brand_ledger OBP
export const MOR = {
  name: 'Oasis BI Pro',
  short: 'OBP',
  domain: 'oasis-bi-pro.web.id',
  disclosure:
    'Pembayaran diproses oleh Oasis BI Pro (oasis-bi-pro.web.id) sebagai Merchant-of-Record untuk ekosistem SparkMind. Pemrosesan kartu/bank melalui PJP Duitku yang terdaftar & diawasi Bank Indonesia.'
}

export const MOTHER_BRAND = {
  name: 'SparkMind',
  domain: 'sparkmind.web.id',
  tagline: 'Sovereign Agent Foundry — ekosistem skill agentik siap-pakai.'
}

export const BRANDS: Record<BrandKey, { name: string; color: string; desc: string }> = {
  sparkmind: { name: 'SparkMind Core', color: '#6366f1', desc: 'Skill fondasi & orkestrasi agent.' },
  barberkas: { name: 'BarberKas', color: '#f59e0b', desc: 'Solusi kas & operasional barbershop.' },
  kuratorkas: { name: 'KuratorKas', color: '#10b981', desc: 'Kurasi konten & knowledge ops.' },
  pacelokal: { name: 'PaceLokal', color: '#ef4444', desc: 'Aktivasi bisnis lokal & GTM.' },
  nurani: { name: 'Nurani.OS', color: '#0ea5e9', desc: 'Donasi, sosial & compliance.' },
  momentkas: { name: 'MomentKas', color: '#a855f7', desc: 'Event & moment monetization.' }
}
