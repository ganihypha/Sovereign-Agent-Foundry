// SPARKMIND-OBP — Admin dashboard & Download page (T10, T2 UX)
// Admin: ringkasan orders / revenue / licenses / leads. Diproteksi ADMIN_TOKEN
// (querystring ?token= atau header x-admin-token) — server-side gate di index.tsx.
import { formatIDR } from '../data/products'

export interface AdminStats {
  orders: { total: number; paid: number; pending: number; failed: number }
  revenue_idr: number
  licenses: number
  leads: { total: number; new: number }
  recentOrders: Array<{
    duitku_merchant_order_id: string
    product_slug: string
    status: string
    payment_amount_idr: number
    customer_email: string
    created_at: string
  }>
  recentLeads: Array<{
    name: string | null
    email: string
    kind: string
    status: string
    created_at: string
  }>
  ledgerByBrand: Array<{ brand: string; gross_idr: number; n: number }>
}

const Stat = ({ label, value, accent }: { label: string; value: string; accent?: string }) => (
  <div class="bg-slate-900 border border-slate-800 rounded-xl p-5">
    <p class="text-xs text-slate-500 uppercase tracking-wide">{label}</p>
    <p class={`text-2xl font-extrabold mt-1 ${accent ?? 'text-slate-100'}`}>{value}</p>
  </div>
)

const badge = (status: string) => {
  const map: Record<string, string> = {
    paid: 'bg-emerald-500/15 text-emerald-300',
    pending: 'bg-amber-500/15 text-amber-300',
    failed: 'bg-rose-500/15 text-rose-300',
    new: 'bg-indigo-500/15 text-indigo-300',
    contacted: 'bg-sky-500/15 text-sky-300',
    won: 'bg-emerald-500/15 text-emerald-300',
    lost: 'bg-slate-700 text-slate-400'
  }
  return map[status] ?? 'bg-slate-800 text-slate-300'
}

export const AdminDashboard = (s: AdminStats) => (
  <div class="max-w-6xl mx-auto px-5 py-12">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold">
        <i class="fas fa-gauge-high text-indigo-400 mr-2"></i>Admin Dashboard
      </h1>
      <span class="text-xs text-slate-500">SPARKMIND-OBP · internal</span>
    </div>

    <section id="admin-stats" class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Stat label="Revenue (paid)" value={formatIDR(s.revenue_idr)} accent="text-emerald-300" />
      <Stat label="Orders (paid / total)" value={`${s.orders.paid} / ${s.orders.total}`} />
      <Stat label="Lisensi diterbitkan" value={String(s.licenses)} accent="text-indigo-300" />
      <Stat label="Leads (baru / total)" value={`${s.leads.new} / ${s.leads.total}`} accent="text-amber-300" />
    </section>

    <section class="grid lg:grid-cols-2 gap-6">
      <article class="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h2 class="font-bold text-indigo-300 mb-3">Pesanan terbaru</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="text-slate-500 text-left">
              <tr><th class="py-1 pr-3">Order</th><th class="pr-3">Produk</th><th class="pr-3">Nominal</th><th>Status</th></tr>
            </thead>
            <tbody>
              {s.recentOrders.map((o) => (
                <tr class="border-t border-slate-800">
                  <td class="py-2 pr-3 font-mono text-[11px]">{o.duitku_merchant_order_id}</td>
                  <td class="pr-3 text-slate-300">{o.product_slug}</td>
                  <td class="pr-3">{formatIDR(o.payment_amount_idr)}</td>
                  <td><span class={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${badge(o.status)}`}>{o.status}</span></td>
                </tr>
              ))}
              {s.recentOrders.length === 0 && (
                <tr><td colspan={4} class="py-4 text-slate-500 text-center">Belum ada pesanan.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </article>

      <article class="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h2 class="font-bold text-indigo-300 mb-3">Leads terbaru</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="text-slate-500 text-left">
              <tr><th class="py-1 pr-3">Email</th><th class="pr-3">Jenis</th><th>Status</th></tr>
            </thead>
            <tbody>
              {s.recentLeads.map((l) => (
                <tr class="border-t border-slate-800">
                  <td class="py-2 pr-3 text-slate-300">{l.email}</td>
                  <td class="pr-3 text-slate-400">{l.kind}</td>
                  <td><span class={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${badge(l.status)}`}>{l.status}</span></td>
                </tr>
              ))}
              {s.recentLeads.length === 0 && (
                <tr><td colspan={3} class="py-4 text-slate-500 text-center">Belum ada leads.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </article>
    </section>

    <section class="bg-slate-900 border border-slate-800 rounded-xl p-5 mt-6">
      <h2 class="font-bold text-indigo-300 mb-3">Settlement per sub-brand (brand ledger)</h2>
      <div class="grid sm:grid-cols-3 gap-4">
        {s.ledgerByBrand.map((b) => (
          <div class="bg-slate-950 border border-slate-800 rounded-lg p-4">
            <p class="text-xs text-slate-500 uppercase">{b.brand}</p>
            <p class="text-lg font-bold text-emerald-300">{formatIDR(b.gross_idr)}</p>
            <p class="text-[11px] text-slate-500">{b.n} transaksi</p>
          </div>
        ))}
        {s.ledgerByBrand.length === 0 && (
          <p class="text-slate-500 text-sm">Belum ada settlement tercatat.</p>
        )}
      </div>
    </section>
  </div>
)

export const AdminLogin = () => (
  <div class="max-w-md mx-auto px-5 py-24 text-center">
    <i class="fas fa-lock text-indigo-400 text-3xl mb-4"></i>
    <h1 class="text-2xl font-bold mb-2">Admin Login</h1>
    <p class="text-slate-400 text-sm mb-6">Masukkan token admin untuk mengakses dashboard.</p>
    <form method="get" action="/admin" class="flex gap-2">
      <input name="token" type="password" required placeholder="Admin token"
        class="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 focus:border-indigo-500 outline-none" />
      <button class="bg-indigo-600 hover:bg-indigo-500 transition rounded-lg px-5 font-semibold">Masuk</button>
    </form>
  </div>
)

/* ── Download page (UX untuk /download/:token) ── */
export const DownloadPage = ({ token }: { token: string }) => (
  <div class="max-w-xl mx-auto px-5 py-20 text-center">
    <i class="fas fa-cloud-arrow-down text-indigo-400 text-4xl mb-4"></i>
    <h1 class="text-2xl font-bold mb-2">Unduh Skill Anda</h1>
    <p class="text-slate-400 text-sm mb-6">Klik tombol di bawah untuk memverifikasi lisensi & mengunduh.</p>
    <div id="dl-box" class="bg-slate-900 border border-slate-800 rounded-xl p-6" data-token={token}>
      <button id="dl-btn" class="w-full bg-indigo-600 hover:bg-indigo-500 transition rounded-lg py-3 font-semibold">
        <i class="fas fa-download mr-1"></i> Verifikasi & Unduh
      </button>
      <p id="dl-msg" class="text-sm text-slate-400 mt-4"></p>
    </div>
    <p class="text-xs text-slate-500 mt-6">Masalah unduhan? Hubungi support@sparkmind-obp.pages.dev.</p>
    <script src="/static/download.js"></script>
  </div>
)
