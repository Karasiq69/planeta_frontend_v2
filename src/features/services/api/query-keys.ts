import type { ListParams } from '@/types/params'

export const servicesQueryKeys = {
  all: ['services'] as const,
  details: () => [...servicesQueryKeys.all, 'service'] as const,
  detail: (id: number) => [...servicesQueryKeys.details(), id] as const,

  lists: () => [...servicesQueryKeys.all, 'list'] as const,
  list: (params: ListParams) => [...servicesQueryKeys.lists(), { params }] as const,
}
