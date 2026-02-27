import apiClient from '@/lib/auth/client'
import { PAYROLLS_URL } from '@/lib/constants'

import type {
  CreatePayrollDto,
  GenerateResult,
  PayrollDetail,
  PayrollItem,
  PayrollListItem,
  PayrollQuery,
} from '@/features/payrolls/types'

export const getPayrolls = async (params: PayrollQuery): Promise<{ data: PayrollListItem[] }> => {
  const response = await apiClient.get<{ data: PayrollListItem[] }>(PAYROLLS_URL, { params })
  return response.data
}

export const getPayrollById = async (id: number): Promise<PayrollDetail> => {
  const response = await apiClient.get<PayrollDetail>(`${PAYROLLS_URL}/${id}`)
  return response.data
}

export const getPayrollItems = async (id: number): Promise<{ data: PayrollItem[] }> => {
  const response = await apiClient.get<{ data: PayrollItem[] }>(`${PAYROLLS_URL}/${id}/items`)
  return response.data
}

export const createPayroll = async (data: CreatePayrollDto): Promise<PayrollListItem> => {
  const response = await apiClient.post<PayrollListItem>(PAYROLLS_URL, data)
  return response.data
}

export const generatePayroll = async (id: number): Promise<GenerateResult> => {
  const response = await apiClient.post<GenerateResult>(`${PAYROLLS_URL}/${id}/generate`)
  return response.data
}

export const confirmPayroll = async (id: number): Promise<PayrollListItem> => {
  const response = await apiClient.patch<PayrollListItem>(`${PAYROLLS_URL}/${id}/confirm`)
  return response.data
}

export const payPayroll = async (id: number): Promise<PayrollListItem> => {
  const response = await apiClient.patch<PayrollListItem>(`${PAYROLLS_URL}/${id}/pay`)
  return response.data
}

export const revertPayroll = async (id: number): Promise<PayrollListItem> => {
  const response = await apiClient.patch<PayrollListItem>(`${PAYROLLS_URL}/${id}/revert`)
  return response.data
}

export const deletePayroll = async (id: number): Promise<void> => {
  await apiClient.delete(`${PAYROLLS_URL}/${id}`)
}