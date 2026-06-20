---
name: sovereign-enterprise-patterns
version: 2.0.0
description: >-
  Hardening produksi: rate limiting, security headers, audit log D1,
  error handling tanpa leak, UU PDP compliance, CORS, input validation.
  Gate wajib sebelum deploy ke production. Trigger: "hardening", "security",
  "rate limit", "audit log", "UU PDP", "CORS", "enterprise", "secure API",
  "error handling", "validasi input", "hardening gate", "sebelum deploy prod".
metadata:
  category: code-quality
  skill_category: "6-code-quality-review"
  version_pack: "SOVEREIGN-SKILLS-PACK-v5.0"
  owner: "Reza Estes / Haidar Faras + Gyss (spousal 50/50)"
  doctrine: "MASTER-ARCHITECT-PROMPT v8.0 · D-1 Truth-Lock · UU PDP 27/2022"
  generated: "2026-06-12"
  supersedes: "sovereign-enterprise-patterns v1.0.0 (v4.0)"
  inspiration: "building AI agents for the enterprise — Anthropic + Zero Trust framework"
---

# sovereign-enterprise-patterns v2.0.0 — HARDENING GATE

> **Gate wajib sebelum deploy production.** Semua item harus PASS.

## 🔐 HARDENING CHECKLIST — PASS semua sebelum deploy

```
SECURITY:
□ Secret scan clear (tidak ada token/key exposed di source)
□ Environment variables via wrangler secret (bukan hardcode)
□ CORS dikonfigurasi benar (bukan '*' untuk endpoint sensitif)
□ Rate limiting ada di endpoint publik
□ Input validation di semua POST/PUT endpoint

ERROR HANDLING:
□ Error response tidak expose stack trace ke client
□ Error response format konsisten: { error: "pesan", code: "ERR_CODE" }
□ Logging server-side ada (bukan console.error ke client)
□ 404 handler ada

DATA & PRIVACY (UU PDP):
□ Data user (email, nama, telp) tidak disimpan plaintext tanpa enkripsi
□ Privacy notice ada di form yang mengumpulkan data
□ Tidak ada data user di log yang bisa dibaca publik
□ Retention policy jelas (kapan data dihapus)
□ Tidak ada data Gyss / internal di endpoint publik

PERFORMANCE:
□ Query D1 pakai LIMIT (tidak SELECT * tanpa batas)
□ Index ada untuk kolom yang sering di-query (WHERE, ORDER BY)
□ Static asset di-cache dengan proper Cache-Control header
```

## ⚡ RATE LIMITING — Hono Middleware

```typescript
// Rate limiter sederhana dengan KV
const rateLimiter = async (c: Context, next: Next) => {
  const ip = c.req.header('CF-Connecting-IP') || 'unknown';
  const key = `ratelimit:${ip}:${Math.floor(Date.now() / 60000)}`; // per menit
  
  const count = parseInt(await c.env.KV.get(key) || '0');
  const limit = 30; // 30 request per menit
  
  if (count >= limit) {
    return c.json({ 
      error: 'Too many requests. Coba lagi dalam 1 menit.', 
      code: 'ERR_RATE_LIMIT' 
    }, 429);
  }
  
  await c.env.KV.put(key, String(count + 1), { expirationTtl: 60 });
  return next();
};

// Terapkan ke endpoint publik
app.post('/api/waitlist', rateLimiter, waitlistHandler);
app.post('/api/contact', rateLimiter, contactHandler);
```

## 🔒 SECURITY HEADERS — Middleware

```typescript
app.use('*', async (c, next) => {
  await next();
  c.res.headers.set('X-Content-Type-Options', 'nosniff');
  c.res.headers.set('X-Frame-Options', 'DENY');
  c.res.headers.set('X-XSS-Protection', '1; mode=block');
  c.res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  c.res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
});
```

## 🌐 CORS — Konfigurasi Benar

```typescript
import { cors } from 'hono/cors';

// CORS untuk API (hanya domain sendiri)
app.use('/api/*', cors({
  origin: [
    'https://[project].pages.dev',
    'https://[custom-domain].com',
    'http://localhost:3000', // dev saja
  ],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'x-admin-token'],
  maxAge: 86400,
}));

// JANGAN: cors({ origin: '*' }) untuk endpoint yang handle data sensitif
```

## ✅ INPUT VALIDATION — Pattern

```typescript
// Validator sederhana
const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePayload = (body: any, required: string[]): string | null => {
  for (const field of required) {
    if (!body[field] || typeof body[field] !== 'string' || body[field].trim().length === 0) {
      return `Field '${field}' wajib diisi`;
    }
  }
  return null; // valid
};

// Penggunaan
app.post('/api/register', async (c) => {
  const body = await c.req.json().catch(() => null);
  if (!body) return c.json({ error: 'Request body tidak valid', code: 'ERR_BAD_REQUEST' }, 400);
  
  const err = validatePayload(body, ['email', 'name']);
  if (err) return c.json({ error: err, code: 'ERR_VALIDATION' }, 400);
  
  if (!validateEmail(body.email)) {
    return c.json({ error: 'Format email tidak valid', code: 'ERR_EMAIL' }, 400);
  }
  // ... lanjut proses
});
```

## 📋 AUDIT LOG — D1 Pattern

```typescript
// Tabel audit_log (migration)
// CREATE TABLE audit_log (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   action TEXT NOT NULL,
//   user_id TEXT,
//   ip TEXT,
//   resource TEXT,
//   status INTEGER,
//   created_at DATETIME DEFAULT CURRENT_TIMESTAMP
// );

const logAudit = async (db: D1Database, action: string, details: object) => {
  await db.prepare(
    'INSERT INTO audit_log (action, user_id, ip, resource, status) VALUES (?, ?, ?, ?, ?)'
  ).bind(
    action,
    (details as any).user_id || null,
    (details as any).ip || null,
    (details as any).resource || null,
    (details as any).status || 200
  ).run().catch(() => {}); // audit log gagal = jangan gagalkan request utama
};
```

## 🇮🇩 UU PDP COMPLIANCE — Checklist Minimal

```
□ Form dengan data pribadi punya privacy notice:
  "Data kamu aman. Kami tidak jual ke pihak ketiga. [Link Privacy Policy]"
□ Checkbox "Saya setuju dengan syarat & ketentuan" sebelum submit
□ Admin tidak bisa lihat data user tanpa audit trail
□ Hapus data user kalau diminta (right to erasure)
□ Tidak kirim data ke service luar negeri tanpa notif user
```

## 🚨 ERROR RESPONSE FORMAT — Standar

```typescript
// BENAR: error tanpa detail internal
return c.json({ 
  error: 'Terjadi kesalahan internal. Coba lagi.',
  code: 'ERR_INTERNAL'
}, 500);

// SALAH: jangan expose detail
// return c.json({ error: err.message, stack: err.stack }, 500);  // ❌

// Error codes standar:
// ERR_VALIDATION    — input tidak valid
// ERR_AUTH          — tidak terautentikasi
// ERR_FORBIDDEN     — tidak punya akses
// ERR_NOT_FOUND     — resource tidak ada
// ERR_RATE_LIMIT    — terlalu banyak request
// ERR_INTERNAL      — error server
```

## Gotchas

- Cloudflare Workers tidak punya `process.env` — pakai `c.env.VARIABLE_NAME`
- KV untuk rate limiting = eventually consistent (ok untuk rate limit, jangan untuk counting kritis)
- D1 tidak ada trigger/stored procedure — implementasi audit log di application layer
- UU PDP 27/2022 berlaku untuk data WNI, termasuk startup kecil
- "Stack trace di production" = celah keamanan + pengalaman buruk user
