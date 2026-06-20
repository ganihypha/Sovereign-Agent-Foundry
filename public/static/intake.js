// SPARKMIND-OBP — lead intake client (Done-for-You / Partner / MoR-aaS)
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('intake-form')
  if (!form) return
  const msg = document.getElementById('intake-msg')
  const kind = form.dataset.kind || 'done-for-you'

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const name = (document.getElementById('intake-name') || {}).value?.trim() || ''
    const email = (document.getElementById('intake-email') || {}).value?.trim() || ''
    const wa = (document.getElementById('intake-wa') || {}).value?.trim() || ''
    const need = (document.getElementById('intake-need') || {}).value?.trim() || ''
    if (!email || !need) { msg.textContent = 'Lengkapi email & kebutuhan.'; return }

    msg.textContent = 'Mengirim…'
    const btn = form.querySelector('button[type=submit]')
    btn.disabled = true
    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, wa, need, kind })
      })
      const data = await res.json()
      if (data.ok) {
        form.reset()
        msg.textContent = '✅ Terkirim! Tim kami akan menghubungi Anda.'
      } else {
        msg.textContent = 'Gagal: ' + (data.error || 'coba lagi.')
        btn.disabled = false
      }
    } catch {
      msg.textContent = 'Kesalahan jaringan. Coba lagi.'
      btn.disabled = false
    }
  })
})
