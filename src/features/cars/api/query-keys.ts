import type { CarListParams } from '@/features/cars/types'

export const carQueryKeys = {
  all: ['cars'] as const,
  details: () => [...carQueryKeys.all, 'detail'] as const,
  detail: (id: number) => [...carQueryKeys.details(), id] as const,

  lists: () => [...carQueryKeys.all, 'list'] as const,
  list: (params: CarListParams) => [...carQueryKeys.lists(), { params }] as const,

  brands: () => [...carQueryKeys.all, 'brand'] as const,
  brand: (brandId: number) => [...carQueryKeys.brands(), brandId] as const,

  models: () => [...carQueryKeys.all, 'model'] as const,
  model: (brandId: number) => [...carQueryKeys.models(), brandId] as const,
}
