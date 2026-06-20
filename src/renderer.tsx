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
          content="SparkMind — Sovereign Agent Foundry: marketplace 36 skill agentik siap-pakai berbahasa Indonesia. Pembayaran lokal patuh (Duitku) via Oasis BI Pro sebagai Merchant-of-Record."
        />
        <meta name="keywords" content="skill agentik, AI agent Indonesia, sovereign agent foundry, marketplace AI, Cloudflare, Duitku, SparkMind" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://sparkmind-obp.pages.dev" />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SparkMind · Sovereign Agent Foundry" />
        <meta property="og:title" content={title ?? 'SparkMind · Sovereign Agent Foundry'} />
        <meta property="og:description" content="Marketplace 36 skill agentik siap-pakai. Dari 1 perintah → app live & ter-deploy. Payment lokal patuh." />
        <meta property="og:url" content="https://sparkmind-obp.pages.dev" />
        <meta property="og:image" content="https://sparkmind-obp.pages.dev/static/og.svg" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title ?? 'SparkMind · Sovereign Agent Foundry'} />
        <meta name="twitter:description" content="Marketplace skill agentik Indonesia-first. Bayar aman via MoR (Oasis BI Pro) lewat Duitku." />
        <meta name="twitter:image" content="https://sparkmind-obp.pages.dev/static/og.svg" />
        {/* Structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'SparkMind — Sovereign Agent Foundry',
          url: 'https://sparkmind-obp.pages.dev',
          description: 'Marketplace skill agentik siap-pakai berbahasa Indonesia dengan payment lokal patuh.',
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
                Sovereign Agent Foundry
              </span>
            </a>
            <div class="flex items-center gap-5 text-sm">
              <a href="/catalog" class="hover:text-indigo-400 transition">Katalog</a>
              <a href="/pricing" class="hover:text-indigo-400 transition hidden sm:inline">Harga</a>
              <a href="/about" class="hover:text-indigo-400 transition hidden sm:inline">Tentang</a>
              <a
                href="/catalog"
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
                  <p class="text-slate-500 font-semibold mb-1">Produk</p>
                  <a href="/catalog" class="block hover:text-indigo-400">Katalog</a>
                  <a href="/pricing" class="block hover:text-indigo-400">Harga & Bundle</a>
                  <a href="/done-for-you" class="block hover:text-indigo-400">Done-for-You</a>
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
