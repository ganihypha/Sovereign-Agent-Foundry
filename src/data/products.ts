import type { Product } from '../types'

// Tiering harga IDR (doctrine SPARKMIND-OBP v2.0): 49k,59k,69k,79k,89k,99k,149k,499k
// 36 sovereign skills — sumber: bundle skill yang diupload (sovereign-*.zip)
export const PRODUCTS: Product[] = [
  // ── C-Suite (tier 99k) ──────────────────────────────────────────
  { slug: 'sovereign-cofounder', name: 'Sovereign Co-Founder', tagline: 'Chief-of-Staff agent (L0.5)', description: 'Tangan kanan owner: sintesis keputusan lintas C-Suite, jaga north star & doctrine, siapkan opsi keputusan.', brand: 'sparkmind', price_idr: 99000, file_key: 'sovereign-cofounder.zip' },
  { slug: 'sovereign-cto', name: 'Sovereign CTO', tagline: 'Chief Technology Officer agent', description: 'Arsitektur teknis, tech-debt, decision record engineering.', brand: 'sparkmind', price_idr: 99000, file_key: 'sovereign-cto.zip' },
  { slug: 'sovereign-cfo', name: 'Sovereign CFO', tagline: 'Chief Financial Officer agent', description: 'Unit economics, runway, settlement MoR & cashflow.', brand: 'sparkmind', price_idr: 99000, file_key: 'sovereign-cfo.zip' },
  { slug: 'sovereign-cmo', name: 'Sovereign CMO', tagline: 'Chief Marketing Officer agent', description: 'Positioning, kampanye, funnel & brand voice.', brand: 'pacelokal', price_idr: 99000, file_key: 'sovereign-cmo.zip' },
  { slug: 'sovereign-coo', name: 'Sovereign COO', tagline: 'Chief Operating Officer agent', description: 'SOP, eksekusi harian, koordinasi squad.', brand: 'sparkmind', price_idr: 99000, file_key: 'sovereign-coo.zip' },
  { slug: 'sovereign-cpo', name: 'Sovereign CPO', tagline: 'Chief Product Officer agent', description: 'Roadmap, prioritisasi, discovery & spec produk.', brand: 'sparkmind', price_idr: 99000, file_key: 'sovereign-cpo.zip' },

  // ── Squads (tier 79k) ───────────────────────────────────────────
  { slug: 'sovereign-squad-engineering', name: 'Squad Engineering', tagline: 'Tim engineering otonom', description: 'Squad multi-agent untuk delivery engineering.', brand: 'sparkmind', price_idr: 79000, file_key: 'sovereign-squad-engineering.zip' },
  { slug: 'sovereign-squad-marketing', name: 'Squad Marketing', tagline: 'Tim marketing otonom', description: 'Squad konten, kampanye & growth.', brand: 'pacelokal', price_idr: 79000, file_key: 'sovereign-squad-marketing.zip' },
  { slug: 'sovereign-squad-product', name: 'Squad Product', tagline: 'Tim product otonom', description: 'Squad discovery → spec → validation.', brand: 'sparkmind', price_idr: 79000, file_key: 'sovereign-squad-product.zip' },
  { slug: 'sovereign-squad-opsfinance', name: 'Squad Ops & Finance', tagline: 'Tim operasi & keuangan', description: 'Squad finance ops, rekonsiliasi & pelaporan.', brand: 'barberkas', price_idr: 79000, file_key: 'sovereign-squad-opsfinance.zip' },
  { slug: 'sovereign-squad-sales-cs', name: 'Squad Sales & CS', tagline: 'Tim sales & customer success', description: 'Squad pipeline sales & support pelanggan.', brand: 'pacelokal', price_idr: 79000, file_key: 'sovereign-squad-sales-cs.zip' },

  // ── Orchestration & Boot (tier 89k) ─────────────────────────────
  { slug: 'sovereign-orchestrator', name: 'Sovereign Orchestrator', tagline: 'Master orchestrator', description: 'Routing tugas lintas agent & squad.', brand: 'sparkmind', price_idr: 89000, file_key: 'sovereign-orchestrator.zip' },
  { slug: 'sovereign-orchestration-patterns', name: 'Orchestration Patterns', tagline: 'Pola orkestrasi', description: 'Library pola koordinasi multi-agent.', brand: 'sparkmind', price_idr: 89000, file_key: 'sovereign-orchestration-patterns.zip' },
  { slug: 'sovereign-master-boot', name: 'Master Boot', tagline: 'Bootstrap ekosistem', description: 'Booting konstelasi agent dari nol.', brand: 'sparkmind', price_idr: 89000, file_key: 'sovereign-master-boot.zip' },
  { slug: 'sovereign-team-boot', name: 'Team Boot', tagline: 'Bootstrap tim', description: 'Inisialisasi squad lengkap.', brand: 'sparkmind', price_idr: 79000, file_key: 'sovereign-team-boot.zip' },

  // ── Memory & Cognition (tier 69k) ───────────────────────────────
  { slug: 'sovereign-hermes-memory', name: 'Hermes Memory', tagline: 'Long-term memory', description: 'Sistem memori persisten antar sesi.', brand: 'sparkmind', price_idr: 69000, file_key: 'sovereign-hermes-memory.zip' },
  { slug: 'sovereign-memory-dreaming', name: 'Memory Dreaming', tagline: 'Konsolidasi memori', description: 'Replay & konsolidasi memori ala "dreaming".', brand: 'sparkmind', price_idr: 69000, file_key: 'sovereign-memory-dreaming.zip' },

  // ── Frameworks (tier 69k) ───────────────────────────────────────
  { slug: 'sovereign-langchain-tools', name: 'LangChain Tools', tagline: 'Integrasi LangChain', description: 'Tool & adapter LangChain siap-pakai.', brand: 'sparkmind', price_idr: 69000, file_key: 'sovereign-langchain-tools.zip' },
  { slug: 'sovereign-langgraph-statemachine', name: 'LangGraph State Machine', tagline: 'State machine LangGraph', description: 'Pola state machine untuk agent.', brand: 'sparkmind', price_idr: 69000, file_key: 'sovereign-langgraph-statemachine.zip' },
  { slug: 'sovereign-crewai-swarm', name: 'CrewAI Swarm', tagline: 'Swarm CrewAI', description: 'Konfigurasi swarm multi-agent CrewAI.', brand: 'sparkmind', price_idr: 69000, file_key: 'sovereign-crewai-swarm.zip' },
  { slug: 'sovereign-n8n-workflow', name: 'n8n Workflow', tagline: 'Otomasi n8n', description: 'Template workflow otomasi n8n.', brand: 'kuratorkas', price_idr: 69000, file_key: 'sovereign-n8n-workflow.zip' },

  // ── Deploy & Infra (tier 89k) ───────────────────────────────────
  { slug: 'sovereign-cf-byok-deploy', name: 'CF BYOK Deploy', tagline: 'Deploy Cloudflare BYOK', description: 'Playbook deploy Hono/Pages ke akun CF sendiri.', brand: 'sparkmind', price_idr: 89000, file_key: 'sovereign-cf-byok-deploy.zip' },
  { slug: 'sovereign-github-push', name: 'GitHub Push', tagline: 'Push otomatis GitHub', description: 'Setup auth & push kode ke repo GitHub.', brand: 'sparkmind', price_idr: 59000, file_key: 'sovereign-github-push.zip' },
  { slug: 'sovereign-hf-spaces-deploy', name: 'HF Spaces Deploy', tagline: 'Deploy Hugging Face', description: 'Playbook deploy ke Hugging Face Spaces.', brand: 'sparkmind', price_idr: 89000, file_key: 'sovereign-hf-spaces-deploy.zip' },
  { slug: 'sovereign-fullstack-cycle', name: 'Fullstack Cycle', tagline: 'Orchestrator end-to-end', description: 'Pipeline fullstack nol → production.', brand: 'sparkmind', price_idr: 149000, file_key: 'sovereign-fullstack-cycle.zip' },
  { slug: 'sovereign-workflow-ops', name: 'Workflow Ops', tagline: 'SOP operate harian', description: 'Build → PM2 → test → backup → README.', brand: 'sparkmind', price_idr: 79000, file_key: 'sovereign-workflow-ops.zip' },

  // ── Patterns & Enterprise (tier 99k) ────────────────────────────
  { slug: 'sovereign-enterprise-patterns', name: 'Enterprise Patterns', tagline: 'Pola enterprise', description: 'Pola arsitektur skala enterprise.', brand: 'sparkmind', price_idr: 99000, file_key: 'sovereign-enterprise-patterns.zip' },
  { slug: 'sovereign-gtm-engineering', name: 'GTM Engineering', tagline: 'Go-to-market engineering', description: 'Engineering funnel & growth GTM.', brand: 'pacelokal', price_idr: 99000, file_key: 'sovereign-gtm-engineering.zip' },
  { slug: 'sovereign-specialists', name: 'Specialists Pack', tagline: 'Paket spesialis', description: 'Kumpulan agent spesialis domain.', brand: 'sparkmind', price_idr: 89000, file_key: 'sovereign-specialists.zip' },

  // ── Security & Governance (tier 99k / 149k) ─────────────────────
  { slug: 'sovereign-zero-trust', name: 'Zero Trust', tagline: 'Framework keamanan agent', description: 'Quarantine pattern, least-privilege, anti prompt-injection.', brand: 'nurani', price_idr: 149000, file_key: 'sovereign-zero-trust.zip' },
  { slug: 'sovereign-credit-aware', name: 'Credit Aware', tagline: 'Manajemen kredit/biaya', description: 'Agent sadar biaya & kuota kredit.', brand: 'barberkas', price_idr: 69000, file_key: 'sovereign-credit-aware.zip' },
  { slug: 'sovereign-supabase-vault', name: 'Supabase Vault', tagline: 'Secret vault Supabase', description: 'Manajemen secret aman via Supabase Vault.', brand: 'nurani', price_idr: 89000, file_key: 'sovereign-supabase-vault.zip' },
  { slug: 'sovereign-verify-rubric', name: 'Verify Rubric', tagline: 'Rubrik verifikasi', description: 'Rubrik QA & verifikasi output agent.', brand: 'kuratorkas', price_idr: 59000, file_key: 'sovereign-verify-rubric.zip' },

  // ── Actuation & Interaction (tier 99k) ──────────────────────────
  { slug: 'sovereign-claw-actuation', name: 'Claw Actuation', tagline: 'Aktuasi/eksekusi nyata', description: 'Jembatan agent ke aksi dunia nyata.', brand: 'momentkas', price_idr: 99000, file_key: 'sovereign-claw-actuation.zip' },
  { slug: 'sovereign-computer-browser-use', name: 'Computer & Browser Use', tagline: 'Kendali komputer/browser', description: 'Agent operasikan komputer & browser.', brand: 'momentkas', price_idr: 99000, file_key: 'sovereign-computer-browser-use.zip' },
  { slug: 'sovereign-cowork-handoff', name: 'Cowork Handoff', tagline: 'Handoff antar agent/manusia', description: 'Pola serah-terima tugas mulus.', brand: 'kuratorkas', price_idr: 59000, file_key: 'sovereign-cowork-handoff.zip' }
]

export const findProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug)
export const formatIDR = (n: number) =>
  'Rp ' + n.toLocaleString('id-ID')
