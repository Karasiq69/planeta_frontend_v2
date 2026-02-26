import type { ListParams } from '@/types/params'

export interface CashRegister {
  id: number
  name: string
  type: 'physical' | 'online' | 'api'
  isActive: boolean
  balance: number
  createdAt: string
  updatedAt: string
}

export interface Payment {
  id: number
  orderId: number
  clientId: number | null
  cashRegisterId: number
  amount: number
  paymentMethod: 'cash' | 'card' | 'transfer' | 'online'
  status: 'pending' | 'completed' | 'cancelled' | 'refunded'
  paidAt: string | null
  comment: string | null
  createdById: number
  createdAt: string
  updatedAt: string
  cashRegister?: CashRegister
}

export interface PaymentTransaction {
  id: number
  paymentId: number
  type: 'charge' | 'refund' | 'cancel'
  amount: number
  status: 'success' | 'failed'
  metadata: Record<string, unknown> | null
  createdAt: string
}

export interface PaymentSummary {
  totalCost: number
  totalPaid: number
  remaining: number
}

export interface PaymentsQueryParams extends ListParams {
  status?: Payment['status']
  orderId?: number
  clientId?: number
  cashRegisterId?: number
  dateFrom?: string
  dateTo?: string
}

export interface CreatePaymentDto {
  orderId: number
  cashRegisterId: number
  amount: number
  paymentMethod?: Payment['paymentMethod']
  comment?: string
}

export interface CreateCashRegisterDto {
  name: string
  type: CashRegister['type']
}

export interface UpdateCashRegisterDto {
  name?: string
  type?: CashRegister['type']
}
