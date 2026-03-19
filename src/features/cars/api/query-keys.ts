import type { CarHistoryParams, CarListParams } from '@/features/cars/types'

export const carQueryKeys = {
  all: ['cars'] as const,
  details: () => [...carQueryKeys.all, 'detail'] as const,
  detail: (id: number) => [...carQueryKeys.details(), id] as const,
  lists: () => [...carQueryKeys.all, 'list'] as const,
  list: (params: CarListParams) => [...carQueryKeys.lists(), { params }] as const,
  brands: () => [...carQueryKeys.all, 'brand'] as const,
  models: () => [...carQueryKeys.all, 'model'] as const,
  model: (brandId?: number) => [...carQueryKeys.models(), brandId] as const,
  engines: () => [...carQueryKeys.all, 'engine'] as const,
  engine: (brandId?: number) => [...carQueryKeys.engines(), brandId] as const,
  histories: () => [...carQueryKeys.all, 'history'] as const,
  history: (id: number, params: CarHistoryParams) =>
    [...carQueryKeys.histories(), id, { params }] as const,
}
