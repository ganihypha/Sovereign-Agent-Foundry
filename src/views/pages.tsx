import { PRODUCTS, formatIDR } from '../data/products'
import { BRANDS, MOTHER_BRAND, MOR } from '../data/brands'
import { OffersSection } from './extra'
import type { Product } from '../types'

const brandPill = (b: Product['brand']) => (
  <span
    class="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full font-semibold"
    style={`background:${BRANDS[b].color}22;color:${BRANDS[b].color}`}
  >
    {BRANDS[b].name}
  </span>
)

const ProductCard = (p: Product) => (
  <article class="product-card group bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-indigo-500/60 transition flex flex-col">
    <div class="flex items-center justify-between mb-3">
      {brandPill(p.brand)}
      <span class="text-indigo-300 font-bold">{formatIDR(p.price_idr)}</span>
    </div>
    <h3 class="font-bold text-slate-100">{p.name}</h3>
    <p class="text-xs text-slate-400 mb-1">{p.tagline}</p>
    <p class="text-sm text-slate-400 flex-1 mb-4">{p.description}</p>
    <a
      href={`/product/${p.slug}`}
      class="text-center bg-slate-800 group-hover:bg-indigo-600 transition rounded-lg py-2 text-sm font-medium"
    >
      Lihat & Beli
    </a>
  </article>
)

export const Home = () => (
  <div>
    <section id="hero-section" class="max-w-6xl mx-auto px-5 pt-20 pb-16 text-center">
      <span class="inline-block text-xs font-semibold text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-full mb-5">
        SPARKMIND-OBP-HYBRID v2.0
      </span>
      <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight mb-5">
        Sovereign Agent <span class="text-indigo-400">Foundry</span>
      </h1>
      <p class="text-slate-400 max-w-2xl mx-auto text-lg mb-8">
        {MOTHER_BRAND.tagline} {PRODUCTS.length} skill agentik siap-pakai — dibayar aman via{' '}
        {MOR.name} (Merchant-of-Record) lewat Duitku.
      </p>
      <div class="flex gap-3 justify-center">
        <a href="/catalog" class="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-lg font-semibold transition">
          Jelajahi Katalog
        </a>
        <a href="/about" class="border border-slate-700 hover:border-slate-500 px-6 py-3 rounded-lg font-semibold transition">
          Pelajari Doctrine
        </a>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-5 pb-16">
      <div class="grid sm:grid-cols-3 gap-4 text-center">
        <div class="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <p class="text-3xl font-extrabold text-indigo-400">{PRODUCTS.length}</p>
          <p class="text-sm text-slate-400">Sovereign Skills</p>
        </div>
        <div class="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <p class="text-3xl font-extrabold text-indigo-400">6</p>
          <p class="text-sm text-slate-400">Sub-Brand</p>
        </div>
        <div class="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <p class="text-3xl font-extrabold text-indigo-400">100%</p>
          <p class="text-sm text-slate-400">Cloudflare-Native</p>
        </div>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-5 pb-12">
      <a href="/checkout/all-access-bundle" class="block rounded-2xl border border-indigo-500 bg-gradient-to-r from-indigo-600/20 to-slate-900 p-6 sm:p-8 hover:border-indigo-400 transition">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wide bg-indigo-500 text-white px-2 py-1 rounded-full">Paling Hemat · ~68% OFF</span>
            <h2 class="text-2xl font-bold mt-3">All-Access Bundle — semua {PRODUCTS.length} skill</h2>
            <p class="text-slate-400 text-sm mt-1">Sekali bayar, akses selamanya. Nilai katalog Rp 3.124.000.</p>
          </div>
          <div class="text-right">
            <p class="text-3xl font-extrabold text-indigo-300">Rp 990.000</p>
            <span class="inline-block mt-2 bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 rounded-lg font-semibold text-sm">Beli Sekarang →</span>
          </div>
        </div>
      </a>
    </section>

    <section class="max-w-6xl mx-auto px-5 pb-20">
      <h2 class="text-2xl font-bold mb-6">Skill Unggulan</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {PRODUCTS.slice(0, 6).map(ProductCard)}
      </div>
      <div class="text-center mt-8">
        <a href="/catalog" class="text-indigo-400 hover:underline font-medium">
          Lihat semua {PRODUCTS.length} skill →
        </a>
      </div>
    </section>
  </div>
)

export const Catalog = () => {
  const brands = Object.keys(BRANDS) as Product['brand'][]
  return (
    <div class="max-w-6xl mx-auto px-5 py-16">
      <h1 class="text-3xl font-bold mb-2">Katalog Skill</h1>
      <p class="text-slate-400 mb-8">{PRODUCTS.length} sovereign skills, dikelompokkan per sub-brand.</p>
      {brands.map((b) => {
        const items = PRODUCTS.filter((p) => p.brand === b)
        if (!items.length) return null
        return (
          <section class="mb-12">
            <h2 class="text-xl font-bold mb-1" style={`color:${BRANDS[b].color}`}>
              {BRANDS[b].name}
            </h2>
            <p class="text-sm text-slate-400 mb-5">{BRANDS[b].desc}</p>
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{items.map(ProductCard)}</div>
          </section>
        )
      })}
    </div>
  )
}

export const Pricing = () => {
  const tiers = [...new Set(PRODUCTS.map((p) => p.price_idr))].sort((a, b) => a - b)
  return (
    <div class="max-w-4xl mx-auto px-5 py-16">
      <h1 class="text-3xl font-bold mb-2">Harga</h1>
      <p class="text-slate-400 mb-8">Tiering transparan dalam Rupiah. Sekali bayar, akses selamanya.</p>
      <div class="grid sm:grid-cols-2 gap-4">
        {tiers.map((t) => (
          <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 flex items-center justify-between">
            <div>
              <p class="text-2xl font-extrabold text-indigo-400">{formatIDR(t)}</p>
              <p class="text-sm text-slate-400">
                {PRODUCTS.filter((p) => p.price_idr === t).length} skill di tier ini
              </p>
            </div>
            <i class="fas fa-tag text-slate-600 text-2xl"></i>
          </div>
        ))}
      </div>

      <OffersSection />
    </div>
  )
}

export const ProductDetail = (p: Product) => (
  <div class="max-w-3xl mx-auto px-5 py-16">
    <a href="/catalog" class="text-sm text-slate-400 hover:text-indigo-400">← Kembali ke katalog</a>
    <div class="mt-4 flex items-center gap-3">{brandPill(p.brand)}</div>
    <h1 class="text-3xl font-bold mt-3">{p.name}</h1>
    <p class="text-slate-400 mt-1">{p.tagline}</p>
    <p class="text-slate-300 mt-6 leading-relaxed">{p.description}</p>

    <div class="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-6">
      <p class="text-3xl font-extrabold text-indigo-400 mb-4">{formatIDR(p.price_idr)}</p>
      <form id="checkout-form" class="space-y-3" data-slug={p.slug}>
        <input
          id="buyer-name" name="name" required placeholder="Nama lengkap"
          class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 focus:border-indigo-500 outline-none"
        />
        <input
          id="buyer-email" name="email" type="email" required placeholder="Email"
          class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 focus:border-indigo-500 outline-none"
        />
        <button
          type="submit"
          class="w-full bg-indigo-600 hover:bg-indigo-500 transition rounded-lg py-3 font-semibold"
        >
          <i class="fas fa-lock mr-1"></i> Bayar via Duitku
        </button>
        <p id="checkout-msg" class="text-sm text-center text-slate-400"></p>
      </form>
      <p class="text-[11px] text-slate-500 mt-4">{MOR.disclosure}</p>
    </div>
    <script src="/static/checkout.js"></script>
  </div>
)

export const ThankYou = () => (
  <div class="max-w-xl mx-auto px-5 py-24 text-center">
    <i class="fas fa-circle-check text-emerald-400 text-5xl mb-5"></i>
    <h1 class="text-3xl font-bold mb-3">Terima kasih!</h1>
    <p class="text-slate-400 mb-2">
      Pembayaran sedang diproses oleh {MOR.name}. Status & tautan unduhan dikirim ke email Anda
      setelah pembayaran terkonfirmasi.
    </p>
    <p class="text-sm text-slate-500 mb-8">
      Cek status: <code class="bg-slate-800 px-2 py-0.5 rounded">/api/order/&lt;merchantOrderId&gt;</code>
    </p>
    <a href="/catalog" class="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-lg font-semibold">
      Kembali ke Katalog
    </a>
  </div>
)

export const About = () => (
  <div class="max-w-3xl mx-auto px-5 py-16 prose-invert">
    <h1 class="text-3xl font-bold mb-6">Doctrine: 4-Layer Hybrid Lock</h1>
    <div class="space-y-4">
      {[
        ['Layer 1 — Brand', `${MOTHER_BRAND.name} (${MOTHER_BRAND.domain})`, 'Mother brand & identitas ekosistem.'],
        ['Layer 2 — Merchant (MoR)', `${MOR.name} (${MOR.domain})`, 'Merchant-of-Record: settlement, legal, compliance, pajak.'],
        ['Layer 3 — Domain', 'BarberKas · KuratorKas · PaceLokal · Nurani.OS · MomentKas', 'Sub-brand produk per vertikal.'],
        ['Layer 4 — Compliance', 'Brand Ledger OBP', 'Audit, risk & pencatatan settlement.']
      ].map(([t, s, d]) => (
        <div class="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p class="font-bold text-indigo-400">{t}</p>
          <p class="text-slate-200">{s}</p>
          <p class="text-sm text-slate-400">{d}</p>
        </div>
      ))}
    </div>
    <div class="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-5">
      <p class="font-bold mb-2">Stack 100% Cloudflare-Native</p>
      <p class="text-sm text-slate-400">
        Hono · Cloudflare Pages · D1 (SQLite) · Workers · R2 · KV. Gateway pembayaran: Duitku V2
        (PJP terdaftar Bank Indonesia).
      </p>
    </div>
  </div>
)
