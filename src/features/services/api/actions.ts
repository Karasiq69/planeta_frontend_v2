import apiClient from '@/lib/auth/client'
import { SERVICES_URL } from '@/lib/constants'


import type { ServiceFormData } from '@/features/services/components/forms/schema'
import type { IService } from '@/features/services/types'
import type { ListParams, ListResponse } from '@/types/params'

export const getAllServicesFn = async (params: ListParams): Promise<ListResponse<IService>> => {
  const response = await apiClient.get<ListResponse<IService>>(SERVICES_URL, { params })
  return response.data
}

export const createServiceFn = async (data: ServiceFormData): Promise<IService> => {
  const response = await apiClient.post<IService>(SERVICES_URL, data)
  return response.data
}

export const updateServiceFn = async (id: number, data: ServiceFormData): Promise<IService> => {
  const response = await apiClient.put<{ data: IService }>(`${SERVICES_URL}/${id}`, data)
  return response.data.data
}

export const deleteServiceFn = async (id: number): Promise<void> => {
  await apiClient.delete(`${SERVICES_URL}/${id}`)
}
