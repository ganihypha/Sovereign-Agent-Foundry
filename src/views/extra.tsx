import { LEGAL_DOCS, LEGAL_META, type LegalDoc } from '../data/legal'
import { OFFERS, CATALOG_TOTAL_IDR, type Offer } from '../data/offers'
import { MOR } from '../data/brands'

const M = LEGAL_META

/* ───────────────────────── Legal: single doc ───────────────────────── */
export const LegalPage = (doc: LegalDoc) => (
  <div class="max-w-3xl mx-auto px-5 py-16">
    <a href="/legal" class="text-sm text-slate-400 hover:text-indigo-400">← Legal Hub</a>
    <div class="mt-4 flex items-center gap-3">
      <i class={`fas ${doc.icon} text-indigo-400 text-2xl`}></i>
      <div>
        <h1 class="text-3xl font-bold leading-tight">{doc.title}</h1>
        <p class="text-slate-400 text-sm">{doc.subtitle}</p>
      </div>
    </div>
    <p class="text-xs text-slate-500 mt-3">
      Berlaku sejak {M.effectiveDate} · Versi {doc.slug === 'compliance' ? M.version : M.version} ·
      Yurisdiksi: {M.jurisdiction}
    </p>

    <p class="text-slate-300 mt-6 leading-relaxed">{doc.intro}</p>

    <div class="mt-8 space-y-6">
      {doc.sections.map((s) => (
        <section class="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h2 class="font-bold text-indigo-300 mb-2">{s.heading}</h2>
          <div class="space-y-2">
            {s.body.map((p) => (
              <p class="text-sm text-slate-300 leading-relaxed">{p}</p>
            ))}
          </div>
        </section>
      ))}
    </div>

    <div class="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-5 text-sm text-slate-400">
      <p class="font-semibold text-slate-200 mb-1">Kontak</p>
      <p>Support: {M.supportEmail} · Legal: {M.legalEmail} · Privasi: {M.privacyEmail}</p>
      <p class="mt-1">{M.entity} ({M.entityDomain}) — Merchant-of-Record.</p>
    </div>
  </div>
)

/* ───────────────────────── Legal Hub index ───────────────────────── */
export const LegalHub = () => (
  <div class="max-w-4xl mx-auto px-5 py-16">
    <span class="inline-block text-xs font-semibold text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full mb-4">
      <i class="fas fa-scale-balanced mr-1"></i> Enterprise-grade · UU PDP & Perlindungan Konsumen
    </span>
    <h1 class="text-3xl font-bold mb-2">Legal Hub</h1>
    <p class="text-slate-400 mb-8">
      Kebijakan lengkap & transparan — disusun setara standar industri untuk melindungi pembeli,
      kreator, dan ekosistem. {M.entity} bertindak sebagai Merchant-of-Record.
    </p>
    <div class="grid sm:grid-cols-2 gap-4">
      {LEGAL_DOCS.map((d) => (
        <a
          href={`/legal/${d.slug}`}
          class="legal-card bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-indigo-500/60 transition flex items-start gap-4"
        >
          <i class={`fas ${d.icon} text-indigo-400 text-xl mt-1`}></i>
          <div>
            <p class="font-bold text-slate-100">{d.title}</p>
            <p class="text-xs text-slate-400">{d.subtitle}</p>
          </div>
        </a>
      ))}
    </div>
    <div class="mt-8 text-sm text-slate-400 bg-slate-900 border border-slate-800 rounded-xl p-5">
      <p class="font-semibold text-slate-200 mb-1">Hukum yang berlaku</p>
      <p>{M.governingLaw}</p>
    </div>
  </div>
)

/* ───────────────────────── Offer card ───────────────────────── */
const OfferCard = (o: Offer) => (
  <article
    class={`offer-card rounded-2xl p-6 flex flex-col border ${
      o.highlight
        ? 'border-indigo-500 bg-gradient-to-b from-indigo-600/15 to-slate-900'
        : 'border-slate-800 bg-slate-900'
    }`}
  >
    {o.badge && (
      <span
        class={`self-start text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full mb-3 ${
          o.highlight ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-indigo-300'
        }`}
      >
        {o.badge}
      </span>
    )}
    <h3 class="text-xl font-bold text-slate-100">{o.name}</h3>
    <p class="text-sm text-slate-400 mb-4">{o.tagline}</p>
    <p class="text-3xl font-extrabold text-indigo-300 mb-1">{o.priceLabel}</p>
    {o.note && <p class="text-[11px] text-slate-500 mb-4">{o.note}</p>}
    <ul class="space-y-2 text-sm text-slate-300 flex-1 mb-6 mt-2">
      {o.features.map((f) => (
        <li class="flex gap-2">
          <i class="fas fa-check text-emerald-400 mt-1 text-xs"></i>
          <span>{f}</span>
        </li>
      ))}
    </ul>
    <a
      href={o.ctaHref}
      class={`text-center rounded-lg py-3 font-semibold transition ${
        o.highlight ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-slate-800 hover:bg-indigo-600'
      }`}
    >
      {o.cta}
    </a>
  </article>
)

/* ───────────────────────── Offers section (untuk Pricing) ───────────────────────── */
export const OffersSection = () => (
  <section class="mt-14">
    <h2 class="text-2xl font-bold mb-2">Bundle, Langganan & Jasa</h2>
    <p class="text-slate-400 mb-6">
      Monetisasi setiap kapabilitas — dari sekali bayar hingga langganan, jasa, dan kemitraan.
      Nilai katalog penuh: <span class="text-indigo-300 font-semibold">Rp {CATALOG_TOTAL_IDR.toLocaleString('id-ID')}</span>.
    </p>
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5">{OFFERS.map(OfferCard)}</div>
  </section>
)

/* ───────────────────────── Checkout offer (bundle / founder pass) ───────────────────────── */
export const CheckoutOffer = (o: Offer) => (
  <div class="max-w-2xl mx-auto px-5 py-16">
    <a href="/pricing" class="text-sm text-slate-400 hover:text-indigo-400">← Kembali ke Harga</a>
    <h1 class="text-3xl font-bold mt-4">{o.name}</h1>
    <p class="text-slate-400 mt-1">{o.tagline}</p>
    <div class="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-6">
      <p class="text-3xl font-extrabold text-indigo-400 mb-4">{o.priceLabel}</p>
      <form id="checkout-form" class="space-y-3" data-slug={o.slug}>
        <input id="buyer-name" name="name" required placeholder="Nama lengkap"
          class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 focus:border-indigo-500 outline-none" />
        <input id="buyer-email" name="email" type="email" required placeholder="Email"
          class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 focus:border-indigo-500 outline-none" />
        <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-500 transition rounded-lg py-3 font-semibold">
          <i class="fas fa-lock mr-1"></i> Bayar via Duitku
        </button>
        <p id="checkout-msg" class="text-sm text-center text-slate-400"></p>
      </form>
      <p class="text-[11px] text-slate-500 mt-4">{MOR.disclosure}</p>
    </div>
    <script src="/static/checkout.js"></script>
  </div>
)

/* ───────────────────────── Done-for-You intake ───────────────────────── */
export const DoneForYou = () => (
  <div class="max-w-2xl mx-auto px-5 py-16">
    <span class="inline-block text-xs font-semibold text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-full mb-4">
      High-touch · Done-for-You
    </span>
    <h1 class="text-3xl font-bold mb-2">Done-for-You & AI Company in a Box</h1>
    <p class="text-slate-400 mb-6">
      Kami pasang, kustomisasi, dan deploy skill ke akun Anda. Cocok untuk UMKM/agency yang ingin
      hasil jadi tanpa repot. Mulai Rp 1.500.000 (setup) — AI Company in a Box Rp 5–15jt.
    </p>
    <form id="intake-form" class="space-y-3 bg-slate-900 border border-slate-800 rounded-xl p-6">
      <input id="intake-name" name="name" required placeholder="Nama / Bisnis"
        class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 focus:border-indigo-500 outline-none" />
      <input id="intake-email" name="email" type="email" required placeholder="Email"
        class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 focus:border-indigo-500 outline-none" />
      <input id="intake-wa" name="wa" placeholder="WhatsApp (opsional)"
        class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 focus:border-indigo-500 outline-none" />
      <textarea id="intake-need" name="need" required rows={4} placeholder="Ceritakan kebutuhan Anda (skill apa, target bisnis, timeline)"
        class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 focus:border-indigo-500 outline-none"></textarea>
      <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-500 transition rounded-lg py-3 font-semibold">
        Kirim Intake
      </button>
      <p id="intake-msg" class="text-sm text-center text-slate-400"></p>
    </form>
    <script src="/static/intake.js"></script>
  </div>
)

/* ───────────────────────── Partner program ───────────────────────── */
export const Partner = () => (
  <div class="max-w-2xl mx-auto px-5 py-16">
    <span class="inline-block text-xs font-semibold text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full mb-4">
      Network Effect · Partner
    </span>
    <h1 class="text-3xl font-bold mb-2">Reseller / White-Label & MoR-as-a-Service</h1>
    <p class="text-slate-400 mb-6">
      Jual ulang katalog kami (rev-share 30–50%), atau gunakan rel pembayaran patuh kami
      (MoR-aaS, fee 5–10%) untuk produk digital Anda sendiri. Mari membangun marketplace 2-sisi.
    </p>
    <form id="intake-form" class="space-y-3 bg-slate-900 border border-slate-800 rounded-xl p-6" data-kind="partner">
      <input id="intake-name" name="name" required placeholder="Nama / Perusahaan"
        class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 focus:border-indigo-500 outline-none" />
      <input id="intake-email" name="email" type="email" required placeholder="Email"
        class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 focus:border-indigo-500 outline-none" />
      <textarea id="intake-need" name="need" required rows={4} placeholder="Model kemitraan yang diminati (reseller / white-label / MoR-aaS) & profil bisnis Anda"
        class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 focus:border-indigo-500 outline-none"></textarea>
      <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-500 transition rounded-lg py-3 font-semibold">
        Ajukan Kemitraan
      </button>
      <p id="intake-msg" class="text-sm text-center text-slate-400"></p>
    </form>
    <script src="/static/intake.js"></script>
  </div>
)

/* ───────────────────────── Buyer dashboard / order lookup ───────────────────────── */
export const OrderLookup = () => (
  <div class="max-w-xl mx-auto px-5 py-16">
    <h1 class="text-3xl font-bold mb-2">Cek Pesanan & Unduh Ulang</h1>
    <p class="text-slate-400 mb-6">
      Masukkan Merchant Order ID Anda untuk melihat status & mengakses tautan unduh.
    </p>
    <form id="order-form" class="flex gap-2 mb-6">
      <input id="order-moid" placeholder="OBP-..." required
        class="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 focus:border-indigo-500 outline-none" />
      <button type="submit" class="bg-indigo-600 hover:bg-indigo-500 transition rounded-lg px-5 font-semibold">
        Cek
      </button>
    </form>
    <div id="order-result" class="text-sm"></div>
    <p class="text-xs text-slate-500 mt-6">
      Tidak menemukan Order ID? Hubungi {M.supportEmail}.
    </p>
    <script src="/static/order.js"></script>
  </div>
)
