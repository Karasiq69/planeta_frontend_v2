import type { ICarModel, IEngine } from '@/features/cars/types'

export interface Specification {
  id: number
  name: string
  description: string | null
  modelId: number | null
  engineId: number | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface SpecificationDetail extends Specification {
  model: ICarModel | null
  engine: IEngine | null
  services: SpecificationServiceItem[]
  products: SpecificationProductItem[]
}

export interface SpecificationServiceItem {
  id: number
  specificationId: number
  serviceId: number
  defaultDuration: number
  discountPercent: number | null
  service: { id: number; name: string; defaultDuration: number }
}

export interface SpecificationProductItem {
  id: number
  specificationId: number
  productId: number
  quantity: string
  discountPercent: string | null
  product: { id: number; name: string; price: string; unit: string }
}

export interface CreateSpecification {
  name: string
  description?: string
  modelId?: number
  engineId?: number
  isActive?: boolean
}

export interface CreateSpecService {
  serviceId: number
  defaultDuration: number
  discountPercent?: number
}

export interface CreateSpecProduct {
  productId: number
  quantity: number
  discountPercent?: number
}

export interface SpecificationQueryParams {
  page?: number
  pageSize?: number
  search?: string
  modelId?: number
  engineId?: number
  isActive?: string
}
