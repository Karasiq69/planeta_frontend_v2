import apiClient from '@/lib/auth/client'
import { VAT_RATES_URL } from '@/lib/constants'

import type { VatRate, CreateVatRatePayload, UpdateVatRatePayload } from '../types'

export const getVatRatesFn = async (params?: { active?: boolean }): Promise<VatRate[]> => {
  const response = await apiClient.get<{ data: VatRate[] }>(VAT_RATES_URL, { params })
  return response.data.data
}

export const getVatRateByIdFn = async (id: number): Promise<VatRate> => {
  const response = await apiClient.get<{ data: VatRate }>(`${VAT_RATES_URL}/${id}`)
  return response.data.data
}

export const createVatRateFn = async (data: CreateVatRatePayload): Promise<VatRate> => {
  const response = await apiClient.post<{ data: VatRate }>(VAT_RATES_URL, data)
  return response.data.data
}

export const updateVatRateFn = async (id: number, data: UpdateVatRatePayload): Promise<VatRate> => {
  const response = await apiClient.put<{ data: VatRate }>(`${VAT_RATES_URL}/${id}`, data)
  return response.data.data
}

export const deleteVatRateFn = async (id: number): Promise<void> => {
  await apiClient.delete(`${VAT_RATES_URL}/${id}`)
}
