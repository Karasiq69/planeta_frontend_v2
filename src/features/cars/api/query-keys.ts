import type {
  CarHistoryParams,
  CarListParams,
  EngineListParams,
  ModelListParams,
} from '@/features/cars/types'

export const carQueryKeys = {
  all: ['cars'] as const,
  details: () => [...carQueryKeys.all, 'detail'] as const,
  detail: (id: number) => [...carQueryKeys.details(), id] as const,
  lists: () => [...carQueryKeys.all, 'list'] as const,
  list: (params: CarListParams) => [...carQueryKeys.lists(), { params }] as const,
  brands: () => [...carQueryKeys.all, 'brand'] as const,
  models: () => [...carQueryKeys.all, 'model'] as const,
  model: (params: ModelListParams) => [...carQueryKeys.models(), { params }] as const,
  engines: () => [...carQueryKeys.all, 'engine'] as const,
  engine: (params: EngineListParams) => [...carQueryKeys.engines(), { params }] as const,
  histories: () => [...carQueryKeys.all, 'history'] as const,
  history: (id: number, params: CarHistoryParams) =>
    [...carQueryKeys.histories(), id, { params }] as const,
}
