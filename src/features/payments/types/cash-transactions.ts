import type { ListParams } from '@/types/params'

export type TransactionType = 'income' | 'expense'

export interface CashTransaction {
  id: number
  cashRegisterId: number
  cashRegisterName: string
  categoryId: number
  categoryName: string
  type: TransactionType
  amount: number
  description: string | null
  paymentId: number | null
  payrollId: number | null
  payrollItemId: number | null
  createdById: number
  createdByName: string
  createdAt: string
}

export interface CashTransactionFilters extends ListParams {
  cashRegisterId?: number
  categoryId?: number
  type?: TransactionType
  dateFrom?: string
  dateTo?: string
}

export interface CreateCashTransactionPayload {
  cashRegisterId: number
  categoryId: number
  type: TransactionType
  amount: number
  description?: string
}

export interface CashRegisterBalance {
  cashRegisterId: number
  balance: number
}

export type CategoryType = 'income' | 'expense' | 'both'

export interface PaymentCategory {
  id: number
  name: string
  type: CategoryType
  isSystem: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
}
