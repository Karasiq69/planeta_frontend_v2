import apiClient from '@/lib/auth/client'
import { SERVICES_URL } from '@/lib/constants'


import type { ServiceFormData } from '@/features/services/components/forms/schema'
import type { IService } from '@/features/services/types'
import type { ListParams, ListResponse } from '@/types/params'

export const getAllServicesFn = async (params: ListParams): Promise<ListResponse<IService>> => {
  const response = await apiClient.get<ListResponse<IService>>(`${SERVICES_URL}`, {
    params,
  })
  return response.data
}

export const createServiceFn = async (data: ServiceFormData) => {
  const response = await apiClient.post(`${SERVICES_URL}`, data)
  return response.data
}
