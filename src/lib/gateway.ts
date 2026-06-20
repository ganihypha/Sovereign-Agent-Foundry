// SPARKMIND-OBP — Payment Gateway Abstraction (T14, SSOT batch 03 §gateway)
// Tujuan: decouple core checkout dari implementasi Duitku → siap multi-provider
// (Duitku sekarang; Midtrans/Xendit/iPaymu di masa depan) tanpa mengubah index.tsx.
//
// Kontrak: setiap gateway mengimplementasi PaymentGateway.
//   - createInvoice(): buat transaksi → kembalikan { ok, reference, paymentUrl }
//   - verifyCallback(): verifikasi signature callback provider
//
// Pemilihan provider via env.PAYMENT_PROVIDER ("duitku" default).

import type { Bindings } from '../types'
import {
  createInquiry as duitkuCreateInquiry,
  verifyCallbackSignature as duitkuVerify,
  type InquiryParams,
  type InquiryResult
} from './duitku'

export type GatewayId = 'duitku'

export interface CallbackVerifyParams {
  merchantCode: string
  amount: string
  merchantOrderId: string
  signature: string
}

export interface PaymentGateway {
  id: GatewayId
  createInvoice(env: Bindings, p: InquiryParams): Promise<InquiryResult>
  verifyCallback(env: Bindings, p: CallbackVerifyParams): Promise<boolean>
}

// ── Adapter: Duitku POP ──────────────────────────────────────────────
const DuitkuGateway: PaymentGateway = {
  id: 'duitku',
  createInvoice: (env, p) => duitkuCreateInquiry(env, p),
  verifyCallback: (env, p) =>
    duitkuVerify(env, p.merchantCode, p.amount, p.merchantOrderId, p.signature)
}

const REGISTRY: Record<GatewayId, PaymentGateway> = {
  duitku: DuitkuGateway
}

// Resolusi gateway aktif. Default & fallback: Duitku (provider live saat ini).
export function getGateway(env: Bindings): PaymentGateway {
  const id = (env.PAYMENT_PROVIDER as GatewayId) || 'duitku'
  return REGISTRY[id] ?? DuitkuGateway
}

export type { InquiryParams, InquiryResult }
