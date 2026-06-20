// SPARKMIND-OBP — download page handler
(function () {
  var box = document.getElementById('dl-box')
  var btn = document.getElementById('dl-btn')
  var msg = document.getElementById('dl-msg')
  if (!box || !btn) return
  var token = box.getAttribute('data-token')

  btn.addEventListener('click', async function () {
    btn.disabled = true
    msg.textContent = 'Memverifikasi lisensi…'
    msg.className = 'text-sm text-slate-400 mt-4'
    try {
      var res = await fetch('/api/download/' + encodeURIComponent(token))
      var data = await res.json()
      if (res.ok && data.ok) {
        msg.innerHTML =
          '<span class="text-emerald-400 font-semibold">Lisensi valid ✓</span><br/>' +
          'Berkas: <code class="text-indigo-300">' + (data.file || '-') + '</code><br/>' +
          'Sisa unduhan: <b>' + data.downloads_remaining + '</b>'
      } else if (data.error === 'download_limit_reached') {
        msg.innerHTML = '<span class="text-rose-400">Batas unduhan tercapai. Hubungi support.</span>'
      } else if (data.error === 'invalid_token') {
        msg.innerHTML = '<span class="text-rose-400">Token lisensi tidak valid.</span>'
      } else {
        msg.innerHTML = '<span class="text-rose-400">Gagal: ' + (data.error || 'unknown') + '</span>'
        btn.disabled = false
      }
    } catch (e) {
      msg.innerHTML = '<span class="text-rose-400">Kesalahan jaringan. Coba lagi.</span>'
      btn.disabled = false
    }
  })
})()
