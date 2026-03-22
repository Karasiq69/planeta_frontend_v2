import apiClient from '@/lib/auth/client'
import { CASH_REGISTERS_URL, CASH_TRANSACTIONS_URL, PAYMENT_CATEGORIES_URL } from '@/lib/constants'

import type {
  CashRegisterBalance,
  CashTransaction,
  CashTransactionFilters,
  CreateCashTransactionPayload,
  CreatePaymentCategoryPayload,
  PaymentCategory,
  UpdatePaymentCategoryPayload,
} from '@/features/payments/types'
import type { ListResponse } from '@/types/params'

export const getCashTransactions = async (params: CashTransactionFilters): Promise<ListResponse<CashTransaction>> => {
  const response = await apiClient.get<ListResponse<CashTransaction>>(CASH_TRANSACTIONS_URL, { params })
  return response.data
}

export const getCashRegisterBalance = async (cashRegisterId: number): Promise<CashRegisterBalance> => {
  const response = await apiClient.get<CashRegisterBalance>(`${CASH_REGISTERS_URL}/${cashRegisterId}/balance`)
  return response.data
}

export const createCashTransaction = async (data: CreateCashTransactionPayload): Promise<CashTransaction> => {
  const response = await apiClient.post<CashTransaction>(CASH_TRANSACTIONS_URL, data)
  return response.data
}

export const getPaymentCategories = async (params?: { type?: string; isActive?: boolean }): Promise<PaymentCategory[]> => {
  const response = await apiClient.get<{ data: PaymentCategory[] }>(PAYMENT_CATEGORIES_URL, { params })
  return response.data.data
}

export const createPaymentCategory = async (data: CreatePaymentCategoryPayload): Promise<PaymentCategory> => {
  const response = await apiClient.post<{ data: PaymentCategory }>(PAYMENT_CATEGORIES_URL, data)
  return response.data.data
}

export const updatePaymentCategory = async (id: number, data: UpdatePaymentCategoryPayload): Promise<PaymentCategory> => {
  const response = await apiClient.patch<{ data: PaymentCategory }>(`${PAYMENT_CATEGORIES_URL}/${id}`, data)
  return response.data.data
}

export const deletePaymentCategory = async (id: number): Promise<void> => {
  await apiClient.delete(`${PAYMENT_CATEGORIES_URL}/${id}`)
}
