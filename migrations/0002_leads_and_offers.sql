-- SPARKMIND-OBP D1 Schema v2 (2026-06-20)
-- Tambahan: leads (Done-for-You / Partner / MoR-aaS intake) untuk high-ticket pipeline.

CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT NOT NULL,
  whatsapp TEXT,
  need TEXT NOT NULL,
  kind TEXT NOT NULL DEFAULT 'done-for-you',   -- done-for-you | partner | mor-aas
  status TEXT NOT NULL DEFAULT 'new',           -- new | contacted | won | lost
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_leads_kind ON leads(kind);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
