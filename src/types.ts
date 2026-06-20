// SPARKMIND-OBP — tipe & binding Cloudflare

export type Bindings = {
  DB: D1Database
  DUITKU_MERCHANT_CODE: string
  DUITKU_API_KEY: string
  DUITKU_ENV: string // "sandbox" | "production"
  DUITKU_CALLBACK_URL: string
  DUITKU_RETURN_URL: string
  // Opsional — fitur lanjutan (env-gated, aman bila kosong)
  PAYMENT_PROVIDER?: string // "duitku" (default). Abstraksi multi-gateway (T14).
  RESEND_API_KEY?: string   // email lisensi otomatis (T3) — secret
  RESEND_FROM?: string      // alamat pengirim email lisensi
  ADMIN_TOKEN?: string      // proteksi dashboard admin (T10) — secret
  R2?: R2Bucket             // penyimpanan file skill (T2) — opsional
}

export interface Product {
  slug: string
  name: string
  tagline: string
  description: string
  brand: BrandKey
  price_idr: number
  file_key: string
}

export type BrandKey =
  | 'sparkmind'
  | 'barberkas'
  | 'kuratorkas'
  | 'pacelokal'
  | 'nurani'
  | 'momentkas'

export interface OrderRow {
  id: number
  customer_email: string
  product_slug: string
  status: string
  duitku_merchant_order_id: string
  duitku_reference: string | null
  payment_amount_idr: number
  payment_url: string | null
  created_at: string
}
