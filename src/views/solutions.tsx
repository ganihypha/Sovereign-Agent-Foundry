// SPARKMIND-OBP — VIEWS Outcome Foundry (katalog solusi + detail)
// Pivot SSOT Batch 4: halaman publik berbicara HASIL (outcome), bukan jargon skill.
import { SOLUTIONS, SOLUTION_TIERS, featuredSolutions, type Solution, type SolutionPlan } from '../data/solutions'
import { BRANDS, MOR } from '../data/brands'

const planCard = (sol: Solution, plan: SolutionPlan) => {
  const href = plan.checkoutSlug ? `/checkout/${plan.checkoutSlug}` : (plan.href ?? '/done-for-you')
  const modelBadge =
    plan.model === 'dfy' ? 'Done-for-You' : plan.model === 'dwy' ? 'Langganan' : 'Pasang sendiri'
  return (
    <div
      class={`rounded-xl p-5 border flex flex-col ${
        plan.highlight ? 'border-indigo-500 bg-indigo-500/5' : 'border-slate-800 bg-slate-900'
      }`}
    >
      <div class="flex items-center justify-between mb-2">
        <span class="text-[10px] uppercase tracking-wide font-semibold text-slate-400">{modelBadge}</span>
        {plan.highlight && (
          <span class="text-[10px] font-bold bg-indigo-600 text-white px-2 py-0.5 rounded-full">REKOMENDASI</span>
        )}
      </div>
      <p class="font-semibold text-slate-100">{plan.name}</p>
      <p class="text-2xl font-extrabold text-indigo-300 my-2">{plan.priceLabel}</p>
      <ul class="text-sm text-slate-400 space-y-1.5 flex-1 mb-4">
        {plan.includes.map((i) => (
          <li>
            <i class="fas fa-check text-emerald-400 mr-2 text-xs"></i>
            {i}
          </li>
        ))}
      </ul>
      <a
        href={href}
        class={`text-center rounded-lg py-2.5 text-sm font-semibold transition ${
          plan.highlight ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-slate-800 hover:bg-slate-700'
        }`}
      >
        {plan.checkoutSlug ? 'Pilih & Bayar' : 'Ajukan / Konsultasi'}
      </a>
    </div>
  )
}

const SolutionCard = (s: Solution) => (
  <article class="solution-card group bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-indigo-500/60 transition flex flex-col">
    <div class="flex items-center gap-3 mb-3">
      <span
        class="w-11 h-11 rounded-lg grid place-items-center text-lg"
        style={`background:${BRANDS[s.brand].color}22;color:${BRANDS[s.brand].color}`}
      >
        <i class={`fas ${s.icon}`}></i>
      </span>
      <span class="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full font-semibold" style={`background:${BRANDS[s.brand].color}22;color:${BRANDS[s.brand].color}`}>
        {BRANDS[s.brand].name}
      </span>
    </div>
    <h3 class="font-bold text-slate-100 text-lg">{s.name}</h3>
    <p class="text-sm text-indigo-300 mb-2">{s.promise}</p>
    <p class="text-sm text-slate-400 flex-1 mb-3">{s.problem}</p>
    <div class="flex items-center justify-between text-xs text-slate-500 mb-4">
      <span><i class="fas fa-clock mr-1"></i>{s.eta}</span>
      <span class="text-indigo-300 font-semibold">{s.plans[0].priceLabel}</span>
    </div>
    <a
      href={`/solutions/${s.slug}`}
      class="text-center bg-slate-800 group-hover:bg-indigo-600 transition rounded-lg py-2.5 text-sm font-medium"
    >
      Lihat Solusi →
    </a>
  </article>
)

export const SolutionsCatalog = () => (
  <div class="max-w-6xl mx-auto px-5 py-16">
    <div class="text-center max-w-2xl mx-auto mb-12">
      <h1 class="text-3xl sm:text-4xl font-extrabold mb-3">Pilih hasil yang kamu butuhkan</h1>
      <p class="text-slate-400">
        Bukan software ribet, bukan jasa lambat. Ceritakan masalah bisnismu — kami kirim solusinya
        sudah jadi & jalan, bayar pakai QRIS/VA.
      </p>
    </div>

    {SOLUTION_TIERS.map((tier) => {
      const items = SOLUTIONS.filter((s) => s.tier === tier.key)
      // tier subscription tidak punya solusi tersendiri; langganan tampil di vertikal
      if (!items.length) return null
      return (
        <section class="mb-14">
          <h2 class="text-xl font-bold mb-1">{tier.label}</h2>
          <p class="text-sm text-slate-400 mb-6">{tier.desc}</p>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{items.map(SolutionCard)}</div>
        </section>
      )
    })}

    <section class="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 text-center">
      <h2 class="text-2xl font-bold mb-2">Belum ketemu yang pas?</h2>
      <p class="text-slate-400 mb-5 max-w-xl mx-auto">
        Kami bangun aplikasi custom sesuai kebutuhanmu — sampai jalan. Atau, kalau kamu builder,
        beli mesinnya langsung di jalur developer.
      </p>
      <div class="flex gap-3 justify-center flex-wrap">
        <a href="/done-for-you" class="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-lg font-semibold transition">
          Konsultasi App Custom
        </a>
        <a href="/developers" class="border border-slate-700 hover:border-slate-500 px-6 py-3 rounded-lg font-semibold transition">
          Jalur Developer (beli skill)
        </a>
      </div>
    </section>
  </div>
)

export const SolutionDetail = (s: Solution) => (
  <div class="max-w-4xl mx-auto px-5 py-16">
    <a href="/solutions" class="text-sm text-slate-400 hover:text-indigo-400">← Semua solusi</a>

    <div class="mt-4 flex items-center gap-3">
      <span
        class="w-12 h-12 rounded-lg grid place-items-center text-xl"
        style={`background:${BRANDS[s.brand].color}22;color:${BRANDS[s.brand].color}`}
      >
        <i class={`fas ${s.icon}`}></i>
      </span>
      <span class="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full font-semibold" style={`background:${BRANDS[s.brand].color}22;color:${BRANDS[s.brand].color}`}>
        {BRANDS[s.brand].name}
      </span>
    </div>

    <h1 class="text-3xl sm:text-4xl font-extrabold mt-4">{s.name}</h1>
    <p class="text-lg text-indigo-300 mt-2">{s.promise}</p>

    <div class="grid sm:grid-cols-2 gap-4 mt-8">
      <div class="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <p class="font-semibold text-slate-200 mb-2"><i class="fas fa-circle-exclamation text-amber-400 mr-2"></i>Masalah</p>
        <p class="text-sm text-slate-400">{s.problem}</p>
      </div>
      <div class="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <p class="font-semibold text-slate-200 mb-2"><i class="fas fa-user-group text-sky-400 mr-2"></i>Untuk siapa</p>
        <p class="text-sm text-slate-400">{s.icp}</p>
        <p class="text-xs text-slate-500 mt-3"><i class="fas fa-clock mr-1"></i>Estimasi kirim: {s.eta}</p>
      </div>
    </div>

    <section class="mt-8">
      <h2 class="text-xl font-bold mb-4">Yang kamu dapat</h2>
      <ul class="grid sm:grid-cols-2 gap-3">
        {s.outcomes.map((o) => (
          <li class="flex gap-3 bg-slate-900 border border-slate-800 rounded-lg p-4">
            <i class="fas fa-check text-emerald-400 mt-0.5"></i>
            <span class="text-sm text-slate-300">{o}</span>
          </li>
        ))}
      </ul>
    </section>

    <section id="intake" class="mt-10">
      <h2 class="text-xl font-bold mb-1">Pilih paket</h2>
      <p class="text-sm text-slate-400 mb-5">Mulai sendiri (DIY), didampingi (langganan), atau kami yang kerjakan (Done-for-You).</p>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{s.plans.map((p) => planCard(s, p))}</div>
    </section>

    <section class="mt-10 bg-slate-900 border border-slate-800 rounded-xl p-5">
      <p class="font-semibold text-slate-300 mb-2">
        <i class="fas fa-gears text-slate-500 mr-2"></i>Mesin di baliknya (untuk developer/partner)
      </p>
      <div class="flex flex-wrap gap-2">
        {s.engineSkills.map((sk) => (
          <a href="/developers" class="text-[11px] font-mono px-2 py-1 rounded bg-slate-800 text-slate-400 hover:text-indigo-300">
            {sk}
          </a>
        ))}
      </div>
      <p class="text-xs text-slate-500 mt-3">
        Solusi ini dirakit dari sovereign skill di atas. Mau bangun sendiri? Lihat{' '}
        <a href="/developers" class="text-indigo-400 hover:underline">jalur developer</a>.
      </p>
    </section>

    <p class="text-[11px] text-slate-500 mt-8">{MOR.disclosure}</p>
  </div>
)

// Hero landing baru — bahasa outcome (menggantikan Home lama yang jargon-heavy).
export const OutcomeHome = () => {
  const feats = featuredSolutions()
  return (
    <div>
      <section id="hero-section" class="max-w-5xl mx-auto px-5 pt-20 pb-12 text-center">
        <span class="inline-block text-xs font-semibold text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-full mb-5">
          SparkMind · Outcome Foundry
        </span>
        <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight mb-5 leading-tight">
          Bikin bisnismu <span class="text-indigo-400">otomatis &amp; online</span>
          <br class="hidden sm:block" /> — bayar pakai QRIS.
        </h1>
        <p class="text-slate-400 max-w-2xl mx-auto text-lg mb-8">
          Kamu tak perlu paham AI. Ceritakan masalah bisnismu, kami kirim aplikasinya — sudah jalan,
          dalam Bahasa Indonesia, harga IDR, cepat (hari, bukan bulan).
        </p>
        <div class="flex gap-3 justify-center flex-wrap">
          <a href="/solutions" class="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-lg font-semibold transition">
            Lihat Solusi
          </a>
          <a href="/done-for-you" class="border border-slate-700 hover:border-slate-500 px-6 py-3 rounded-lg font-semibold transition">
            Konsultasi Gratis
          </a>
        </div>
        <p class="text-xs text-slate-500 mt-5">
          QRIS · Virtual Account · e-wallet — via Duitku (PJP diawasi Bank Indonesia).
        </p>
      </section>

      <section class="max-w-5xl mx-auto px-5 pb-12">
        <div class="grid sm:grid-cols-3 gap-4">
          {[
            ['fa-bolt', 'HASIL, bukan PR', 'Kamu dapat aplikasi yang sudah berfungsi — bukan tutorial.'],
            ['fa-flag', 'Cepat & Indonesia', 'Hari, bukan bulan. Bahasa Indonesia, harga IDR, bayar QRIS.'],
            ['fa-shield-halved', 'Patuh & aman', 'Pembayaran via Merchant-of-Record (OBP) lewat PJP diawasi BI.']
          ].map(([ic, t, d]) => (
            <div class="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <i class={`fas ${ic} text-indigo-400 text-xl mb-3`}></i>
              <p class="font-bold text-slate-100">{t}</p>
              <p class="text-sm text-slate-400 mt-1">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section class="max-w-6xl mx-auto px-5 pb-8">
        <div class="flex items-end justify-between mb-6">
          <h2 class="text-2xl font-bold">Solusi populer</h2>
          <a href="/solutions" class="text-indigo-400 hover:underline text-sm font-medium">Semua solusi →</a>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{feats.map(SolutionCard)}</div>
      </section>

      <section class="max-w-5xl mx-auto px-5 py-16">
        <h2 class="text-2xl font-bold text-center mb-10">Cara kerjanya — 3 langkah</h2>
        <div class="grid sm:grid-cols-3 gap-5">
          {[
            ['1', 'Ceritakan masalah', 'Pilih solusi yang cocok atau ajukan kebutuhan custom.'],
            ['2', 'Kami rakit', 'Tim agent + pipeline kami membangun & deploy ke domainmu.'],
            ['3', 'Pulang bawa hasil', 'Aplikasi jalan, kamu bayar pakai QRIS/VA. Bisa langganan perawatan.']
          ].map(([n, t, d]) => (
            <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">
              <p class="w-10 h-10 mx-auto rounded-full bg-indigo-600 grid place-items-center font-bold mb-3">{n}</p>
              <p class="font-bold text-slate-100">{t}</p>
              <p class="text-sm text-slate-400 mt-1">{d}</p>
            </div>
          ))}
        </div>
        <div class="text-center mt-10">
          <a href="/solutions" class="bg-indigo-600 hover:bg-indigo-500 px-7 py-3 rounded-lg font-semibold transition">
            Mulai dari Solusi
          </a>
        </div>
      </section>

      <section class="max-w-5xl mx-auto px-5 pb-20">
        <div class="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wide">Untuk builder &amp; partner</p>
            <h3 class="text-xl font-bold mt-1">Mau bangun sendiri atau jual ulang?</h3>
            <p class="text-slate-400 text-sm mt-1">Akses 36 sovereign skill (mesinnya) atau jadi reseller/white-label.</p>
          </div>
          <div class="flex gap-3">
            <a href="/developers" class="border border-slate-700 hover:border-slate-500 px-5 py-2.5 rounded-lg font-semibold text-sm transition">Jalur Developer</a>
            <a href="/partner" class="bg-slate-800 hover:bg-slate-700 px-5 py-2.5 rounded-lg font-semibold text-sm transition">Jadi Partner</a>
          </div>
        </div>
      </section>
    </div>
  )
}
