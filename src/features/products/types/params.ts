import type { Product } from '@/features/products/types/products'

export type ProductsListParams = {
  page?: number
  pageSize?: number
  searchTerm?: string
}

export interface ProductsListResponse {
  data: Product[]
  meta: {
    total: number
    page: number
    pageSize: number
    totalPages: number
  }
}
