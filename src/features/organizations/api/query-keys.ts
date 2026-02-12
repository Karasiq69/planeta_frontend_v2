import type { ListParams } from '@/types/params'

export const organizationsQueryKeys = {
  all: ['organizations'] as const,

  lists: () => [...organizationsQueryKeys.all, 'list'] as const,
  list: (params?: ListParams) => [...organizationsQueryKeys.lists(), { params }] as const,

  details: () => [...organizationsQueryKeys.all, 'detail'] as const,
  detail: (id: number) => [...organizationsQueryKeys.details(), id] as const,
}
