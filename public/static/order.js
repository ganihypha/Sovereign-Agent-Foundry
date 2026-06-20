// SPARKMIND-OBP — order lookup / buyer dashboard client
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('order-form')
  if (!form) return
  const result = document.getElementById('order-result')

  const fmtIDR = (n) => 'Rp ' + Number(n || 0).toLocaleString('id-ID')
  const badge = (status) => {
    const map = {
      paid: ['Lunas', 'bg-emerald-500/15 text-emerald-300'],
      pending: ['Menunggu Pembayaran', 'bg-amber-500/15 text-amber-300'],
      failed: ['Gagal', 'bg-red-500/15 text-red-300'],
      expired: ['Kedaluwarsa', 'bg-slate-500/15 text-slate-300']
    }
    const [label, cls] = map[status] || [status, 'bg-slate-700 text-slate-200']
    return `<span class="text-xs font-semibold px-2 py-0.5 rounded-full ${cls}">${label}</span>`
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const moid = document.getElementById('order-moid').value.trim()
    if (!moid) return
    result.innerHTML = '<p class="text-slate-400">Mencari…</p>'
    try {
      const res = await fetch('/api/order/' + encodeURIComponent(moid))
      if (!res.ok) {
        result.innerHTML = '<p class="text-red-300">Pesanan tidak ditemukan. Periksa Order ID Anda.</p>'
        return
      }
      const o = await res.json()
      let dl = ''
      if (o.status === 'paid' && o.license_token) {
        dl = `<a href="/api/download/${o.license_token}" class="inline-block mt-3 bg-indigo-600 hover:bg-indigo-500 transition rounded-lg px-4 py-2 text-sm font-semibold"><i class="fas fa-download mr-1"></i> Unduh Skill</a>
              <p class="text-[11px] text-slate-500 mt-1">Sisa unduhan: ${o.downloads_remaining ?? '—'}</p>`
      } else if (o.status === 'pending' && o.payment_url) {
        dl = `<a href="${o.payment_url}" class="inline-block mt-3 bg-amber-600 hover:bg-amber-500 transition rounded-lg px-4 py-2 text-sm font-semibold">Lanjutkan Pembayaran</a>`
      }
      result.innerHTML = `
        <div class="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div class="flex items-center justify-between mb-2">
            <p class="font-bold text-slate-100">${o.product_slug}</p>
            ${badge(o.status)}
          </div>
          <p class="text-sm text-slate-400">Order ID: <code class="bg-slate-800 px-1.5 py-0.5 rounded">${o.duitku_merchant_order_id}</code></p>
          <p class="text-sm text-slate-400">Email: ${o.customer_email}</p>
          <p class="text-sm text-slate-400">Jumlah: ${fmtIDR(o.payment_amount_idr)}</p>
          ${dl}
        </div>`
    } catch {
      result.innerHTML = '<p class="text-red-300">Kesalahan jaringan. Coba lagi.</p>'
    }
  })
})
