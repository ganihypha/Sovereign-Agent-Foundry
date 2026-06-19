// SPARKMIND-OBP — tipe & binding Cloudflare

export type Bindings = {
  DB: D1Database
  DUITKU_MERCHANT_CODE: string
  DUITKU_API_KEY: string
  DUITKU_ENV: string // "sandbox" | "production"
  DUITKU_CALLBACK_URL: string
  DUITKU_RETURN_URL: string
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
