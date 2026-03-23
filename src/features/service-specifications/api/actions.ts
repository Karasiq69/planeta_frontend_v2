import apiClient from '@/lib/auth/client'
import { SERVICE_SPECIFICATIONS_URL } from '@/lib/constants'

import type {
  CreateSpecification,
  CreateSpecProduct,
  CreateSpecService,
  Specification,
  SpecificationDetail,
  SpecificationQueryParams,
} from '@/features/service-specifications/types'
import type { ListResponse } from '@/types/params'

// --- Specifications CRUD ---

export const getAllSpecificationsFn = async (
  params: SpecificationQueryParams
): Promise<ListResponse<Specification>> => {
  const response = await apiClient.get<ListResponse<Specification>>(
    SERVICE_SPECIFICATIONS_URL,
    { params }
  )
  return response.data
}

export const getSpecificationByIdFn = async (id: number): Promise<SpecificationDetail> => {
  const response = await apiClient.get<{ data: SpecificationDetail }>(
    `${SERVICE_SPECIFICATIONS_URL}/${id}`
  )
  return response.data.data
}

export const createSpecificationFn = async (data: CreateSpecification): Promise<Specification> => {
  const response = await apiClient.post<{ data: Specification }>(
    SERVICE_SPECIFICATIONS_URL,
    data
  )
  return response.data.data
}

export const updateSpecificationFn = async (
  id: number,
  data: Partial<CreateSpecification>
): Promise<Specification> => {
  const response = await apiClient.put<{ data: Specification }>(
    `${SERVICE_SPECIFICATIONS_URL}/${id}`,
    data
  )
  return response.data.data
}

export const deleteSpecificationFn = async (id: number): Promise<void> => {
  await apiClient.delete(`${SERVICE_SPECIFICATIONS_URL}/${id}`)
}

// --- Service Items ---

export const addSpecServiceFn = async (specId: number, data: CreateSpecService) => {
  const response = await apiClient.post(`${SERVICE_SPECIFICATIONS_URL}/${specId}/services`, data)
  return response.data.data
}

export const updateSpecServiceFn = async (
  specId: number,
  itemId: number,
  data: { defaultDuration?: number; discountPercent?: number }
) => {
  const response = await apiClient.put(
    `${SERVICE_SPECIFICATIONS_URL}/${specId}/services/${itemId}`,
    data
  )
  return response.data.data
}

export const deleteSpecServiceFn = async (specId: number, itemId: number): Promise<void> => {
  await apiClient.delete(`${SERVICE_SPECIFICATIONS_URL}/${specId}/services/${itemId}`)
}

// --- Product Items ---

export const addSpecProductFn = async (specId: number, data: CreateSpecProduct) => {
  const response = await apiClient.post(`${SERVICE_SPECIFICATIONS_URL}/${specId}/products`, data)
  return response.data.data
}

export const updateSpecProductFn = async (
  specId: number,
  itemId: number,
  data: { quantity?: number; discountPercent?: number }
) => {
  const response = await apiClient.put(
    `${SERVICE_SPECIFICATIONS_URL}/${specId}/products/${itemId}`,
    data
  )
  return response.data.data
}

export const deleteSpecProductFn = async (specId: number, itemId: number): Promise<void> => {
  await apiClient.delete(`${SERVICE_SPECIFICATIONS_URL}/${specId}/products/${itemId}`)
}
