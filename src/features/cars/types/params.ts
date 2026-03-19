import type { ICar } from '@/features/cars/types/index'

export type CarListParams = {
  page?: number
  pageSize?: number
  searchTerm?: string
}

export interface CarListResponse {
  data: ICar[]
  meta: {
    total: number
    page: number
    pageSize: number
    totalPages: number
  }
}

export type ModelListParams = {
  page?: number
  pageSize?: number
  searchTerm?: string
  brandId?: number
}

export type EngineListParams = {
  page?: number
  pageSize?: number
  searchTerm?: string
  brandId?: number
}
