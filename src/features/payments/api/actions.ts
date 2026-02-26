import apiClient from '@/lib/auth/client'
import { CASH_REGISTERS_URL, PAYMENTS_URL } from '@/lib/constants'

import type {
  CashRegister,
  CreateCashRegisterDto,
  CreatePaymentDto,
  Payment,
  PaymentSummary,
  PaymentsQueryParams,
  UpdateCashRegisterDto,
} from '@/features/payments/types'
import type { ListResponse } from '@/types/params'

// ── Cash Registers ──────────────────────────────────────────

export const getCashRegisters = async (): Promise<CashRegister[]> => {
  const response = await apiClient.get<CashRegister[]>(CASH_REGISTERS_URL)
  return response.data
}

export const getCashRegisterById = async (id: number): Promise<CashRegister> => {
  const response = await apiClient.get<CashRegister>(`${CASH_REGISTERS_URL}/${id}`)
  return response.data
}

export const createCashRegister = async (data: CreateCashRegisterDto): Promise<CashRegister> => {
  const response = await apiClient.post<CashRegister>(CASH_REGISTERS_URL, data)
  return response.data
}

export const updateCashRegister = async (
  id: number,
  data: UpdateCashRegisterDto
): Promise<CashRegister> => {
  const response = await apiClient.patch<CashRegister>(`${CASH_REGISTERS_URL}/${id}`, data)
  return response.data
}

export const deactivateCashRegister = async (id: number): Promise<CashRegister> => {
  const response = await apiClient.patch<CashRegister>(`${CASH_REGISTERS_URL}/${id}/deactivate`)
  return response.data
}

// ── Payments ────────────────────────────────────────────────

export const getPayments = async (params: PaymentsQueryParams): Promise<ListResponse<Payment>> => {
  const response = await apiClient.get<ListResponse<Payment>>(PAYMENTS_URL, { params })
  return response.data
}

export const getPaymentById = async (id: number): Promise<Payment> => {
  const response = await apiClient.get<Payment>(`${PAYMENTS_URL}/${id}`)
  return response.data
}

export const createPayment = async (data: CreatePaymentDto): Promise<Payment> => {
  const response = await apiClient.post<Payment>(PAYMENTS_URL, data)
  return response.data
}

export const cancelPayment = async (id: number): Promise<Payment> => {
  const response = await apiClient.patch<Payment>(`${PAYMENTS_URL}/${id}/cancel`)
  return response.data
}

export const getOrderPayments = async (orderId: number): Promise<Payment[]> => {
  const response = await apiClient.get<Payment[]>(`${PAYMENTS_URL}/order/${orderId}`)
  return response.data
}

export const getOrderPaymentSummary = async (orderId: number): Promise<PaymentSummary> => {
  const response = await apiClient.get<PaymentSummary>(`${PAYMENTS_URL}/order/${orderId}/summary`)
  return response.data
}
