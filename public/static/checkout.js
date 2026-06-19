// SPARKMIND-OBP — checkout client
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('checkout-form')
  if (!form) return
  const msg = document.getElementById('checkout-msg')
  const slug = form.dataset.slug

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const name = document.getElementById('buyer-name').value.trim()
    const email = document.getElementById('buyer-email').value.trim()
    if (!name || !email) { msg.textContent = 'Lengkapi nama & email.'; return }

    msg.textContent = 'Memproses pembayaran…'
    const btn = form.querySelector('button[type=submit]')
    btn.disabled = true

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, name, email })
      })
      const data = await res.json()
      if (data.ok && data.paymentUrl) {
        msg.textContent = 'Mengarahkan ke halaman pembayaran Duitku…'
        window.location.href = data.paymentUrl
      } else {
        msg.textContent = 'Gagal: ' + (data.message || data.error || 'coba lagi.')
        btn.disabled = false
      }
    } catch (err) {
      msg.textContent = 'Kesalahan jaringan. Coba lagi.'
      btn.disabled = false
    }
  })
})
