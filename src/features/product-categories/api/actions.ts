import apiClient from '@/lib/auth/client'
import { PRODUCT_CATEGORIES_URL } from '@/lib/constants'

import type { ProductCategory } from '@/features/products/types'

interface CategoriesResponse {
  data: ProductCategory[]
}

interface CategoryResponse {
  data: ProductCategory
}

export interface CategoryPayload {
  name: string
  description?: string
}

export const getAllCategoriesFn = async (): Promise<ProductCategory[]> => {
  const response = await apiClient.get<CategoriesResponse>(PRODUCT_CATEGORIES_URL, {
    params: { withCount: true },
  })
  return response.data.data
}

export const createCategoryFn = async (data: CategoryPayload): Promise<ProductCategory> => {
  const response = await apiClient.post<CategoryResponse>(PRODUCT_CATEGORIES_URL, data)
  return response.data.data
}

export const updateCategoryFn = async (id: number, data: Partial<CategoryPayload>): Promise<ProductCategory> => {
  const response = await apiClient.put<CategoryResponse>(`${PRODUCT_CATEGORIES_URL}/${id}`, data)
  return response.data.data
}

export const deleteCategoryFn = async (id: number): Promise<void> => {
  await apiClient.delete(`${PRODUCT_CATEGORIES_URL}/${id}`)
}
