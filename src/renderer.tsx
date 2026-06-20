import { jsxRenderer } from 'hono/jsx-renderer'
import { MOR } from './data/brands'

export const renderer = jsxRenderer(({ children, title }) => {
  return (
    <html lang="id">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title ?? 'SparkMind · Sovereign Agent Foundry'}</title>
        <meta
          name="description"
          content="SparkMind — Outcome Foundry: bikin bisnismu otomatis & online. Aplikasi kasir, toko online, CS otomatis, konten, event, donasi & app custom — sudah jalan, Bahasa Indonesia, bayar QRIS/VA via Merchant-of-Record (Oasis BI Pro)."
        />
        <meta name="keywords" content="aplikasi UMKM, otomasi bisnis, AI untuk bisnis Indonesia, toko online, kasir online, CS otomatis, app custom, QRIS, SparkMind, Outcome Foundry" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://sparkmind-obp.pages.dev" />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SparkMind · Sovereign Agent Foundry" />
        <meta property="og:title" content={title ?? 'SparkMind — Bikin bisnismu otomatis & online'} />
        <meta property="og:description" content="Ceritakan masalah bisnismu. Pulang bawa aplikasinya — sudah jalan, bayar pakai QRIS. Cepat, Bahasa Indonesia, harga IDR." />
        <meta property="og:url" content="https://sparkmind-obp.pages.dev" />
        <meta property="og:image" content="https://sparkmind-obp.pages.dev/static/og.svg" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title ?? 'SparkMind — Bikin bisnismu otomatis & online'} />
        <meta name="twitter:description" content="Aplikasi bisnis yang sudah jadi & jalan. Bahasa Indonesia, bayar QRIS/VA via MoR (Oasis BI Pro)." />
        <meta name="twitter:image" content="https://sparkmind-obp.pages.dev/static/og.svg" />
        {/* Structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'SparkMind — Outcome Foundry',
          url: 'https://sparkmind-obp.pages.dev',
          description: 'Outcome Foundry: mengubah kebutuhan bisnis jadi aplikasi & sistem yang langsung jalan. Bahasa Indonesia, harga IDR, bayar QRIS/VA via Merchant-of-Record.',
          brand: 'SparkMind',
          sameAs: ['https://github.com/ganihypha/Sovereign-Agent-Foundry']
        }) }} />
        <script src="https://cdn.tailwindcss.com"></script>
        <link
          href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css"
          rel="stylesheet"
        />
        <link href="/static/style.css" rel="stylesheet" />
      </head>
      <body class="bg-slate-950 text-slate-100 antialiased">
        <header class="sticky top-0 z-50 backdrop-blur bg-slate-950/80 border-b border-slate-800">
          <nav class="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
            <a href="/" class="flex items-center gap-2 font-bold text-lg">
              <i class="fas fa-bolt text-indigo-400"></i>
              <span>SparkMind</span>
              <span class="text-xs font-normal text-slate-500 hidden sm:inline">
                Outcome Foundry
              </span>
            </a>
            <div class="flex items-center gap-5 text-sm">
              <a href="/solutions" class="hover:text-indigo-400 transition">Solusi</a>
              <a href="/done-for-you" class="hover:text-indigo-400 transition hidden sm:inline">Done-for-You</a>
              <a href="/developers" class="hover:text-indigo-400 transition hidden sm:inline">Developer</a>
              <a
                href="/solutions"
                class="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg font-medium transition"
              >
                Mulai
              </a>
            </div>
          </nav>
        </header>

        <main>{children}</main>

        <footer class="border-t border-slate-800 mt-20">
          <div class="max-w-6xl mx-auto px-5 py-10 text-sm text-slate-400 space-y-4">
            <div class="flex flex-wrap gap-6 justify-between">
              <div>
                <p class="font-bold text-slate-200 mb-1">
                  <i class="fas fa-bolt text-indigo-400 mr-1"></i> SparkMind
                </p>
                <p class="text-xs max-w-sm">{MOR.name} bertindak sebagai Merchant-of-Record.</p>
              </div>
              <div class="flex gap-8 text-xs">
                <div class="space-y-1">
                  <p class="text-slate-500 font-semibold mb-1">Solusi</p>
                  <a href="/solutions" class="block hover:text-indigo-400">Katalog Solusi</a>
                  <a href="/done-for-you" class="block hover:text-indigo-400">Done-for-You</a>
                  <a href="/developers" class="block hover:text-indigo-400">Jalur Developer</a>
                  <a href="/partner" class="block hover:text-indigo-400">Partner</a>
                </div>
                <div class="space-y-1">
                  <p class="text-slate-500 font-semibold mb-1">Akun</p>
                  <a href="/orders" class="block hover:text-indigo-400">Cek Pesanan</a>
                  <a href="/setup" class="block hover:text-indigo-400">Panduan Setup</a>
                  <a href="/about" class="block hover:text-indigo-400">Tentang</a>
                  <a href="/admin" class="block hover:text-indigo-400">Admin</a>
                </div>
                <div class="space-y-1">
                  <p class="text-slate-500 font-semibold mb-1">Legal</p>
                  <a href="/legal/terms" class="block hover:text-indigo-400">Syarat & Ketentuan</a>
                  <a href="/legal/refund" class="block hover:text-indigo-400">Refund</a>
                  <a href="/legal/privacy" class="block hover:text-indigo-400">Privasi (PDP)</a>
                  <a href="/legal" class="block hover:text-indigo-400">Legal Hub</a>
                </div>
              </div>
            </div>
            <p class="text-xs text-slate-500 border-t border-slate-800 pt-4 leading-relaxed">
              <i class="fas fa-shield-halved mr-1"></i>
              {MOR.disclosure}
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
})
