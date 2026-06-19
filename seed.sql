-- Seed data demo SPARKMIND-OBP
INSERT OR IGNORE INTO customers (email, name) VALUES
  ('demo@sparkmind.web.id', 'Demo Sovereign'),
  ('owner@oasis-bi-pro.web.id', 'OBP Owner');

INSERT OR IGNORE INTO waitlist (email, product_slug) VALUES
  ('early@sparkmind.web.id', 'sovereign-fullstack-cycle');
