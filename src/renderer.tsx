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
          content="SparkMind — marketplace skill agentik. Pembayaran oleh Oasis BI Pro (MoR) via Duitku."
        />
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
                  <a href="/catalog" class="block hover:text-indigo-400">Katalog</a>
                  <a href="/pricing" class="block hover:text-indigo-400">Harga</a>
                </div>
                <div class="space-y-1">
                  <a href="/about" class="block hover:text-indigo-400">Tentang</a>
                  <a href="/docs" class="block hover:text-indigo-400">Dokumentasi</a>
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
