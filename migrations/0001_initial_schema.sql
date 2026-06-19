-- SPARKMIND-OBP D1 Schema v1 (2026-06-19)
-- MoR: Oasis BI Pro · Gateway: Duitku

CREATE TABLE IF NOT EXISTS customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_email TEXT NOT NULL,
  product_slug TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',          -- pending | paid | failed | expired
  duitku_merchant_order_id TEXT UNIQUE NOT NULL,
  duitku_reference TEXT,
  payment_amount_idr INTEGER NOT NULL,
  payment_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS licenses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL,
  product_slug TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  download_count INTEGER NOT NULL DEFAULT 0,
  max_downloads INTEGER NOT NULL DEFAULT 5,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE IF NOT EXISTS webhook_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  provider TEXT NOT NULL DEFAULT 'duitku',
  merchant_order_id TEXT,
  payload TEXT,
  processed INTEGER NOT NULL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS waitlist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  product_slug TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Layer 4 Compliance: pencatatan settlement MoR (OBP)
CREATE TABLE IF NOT EXISTS brand_ledger (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER,
  brand TEXT,
  gross_idr INTEGER,
  note TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_orders_moid ON orders(duitku_merchant_order_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_licenses_token ON licenses(token);
