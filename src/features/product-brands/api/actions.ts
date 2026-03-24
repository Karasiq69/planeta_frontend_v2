import apiClient from '@/lib/auth/client'
import { PRODUCT_BRANDS_URL } from '@/lib/constants'

import type { ProductBrand } from '@/features/products/types'

interface BrandsResponse {
  data: ProductBrand[]
}

interface BrandResponse {
  data: ProductBrand
}

export interface CreateProductBrandPayload {
  name: string
  country?: string
  description?: string
  isPopular?: boolean
}

export const getProductBrandsFn = async (): Promise<ProductBrand[]> => {
  const response = await apiClient.get<BrandsResponse>(PRODUCT_BRANDS_URL)
  return response.data.data
}

export const createProductBrandFn = async (data: CreateProductBrandPayload): Promise<ProductBrand> => {
  const response = await apiClient.post<BrandResponse>(PRODUCT_BRANDS_URL, data)
  return response.data.data
}
