import type { SpecificationQueryParams } from '@/features/service-specifications/types'

export const specificationQueryKeys = {
  all: ['service-specifications'] as const,
  lists: () => [...specificationQueryKeys.all, 'list'] as const,
  list: (params: SpecificationQueryParams) => [...specificationQueryKeys.lists(), { params }] as const,
  details: () => [...specificationQueryKeys.all, 'detail'] as const,
  detail: (id: number) => [...specificationQueryKeys.details(), id] as const,
}
