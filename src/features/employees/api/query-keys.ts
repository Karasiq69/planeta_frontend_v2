import type { ListParams } from '@/types/params'

export const employeesQueryKeys = {
  all: ['employees'] as const,

  lists: () => [...employeesQueryKeys.all, 'list'] as const,
  list: (params?: ListParams) => [...employeesQueryKeys.lists(), { params }] as const,

  details: () => [...employeesQueryKeys.all, 'detail'] as const,
  detail: (id: number) => [...employeesQueryKeys.details(), id] as const,

  byOrganization: (orgId: number) =>
    [...employeesQueryKeys.all, 'byOrganization', orgId] as const,
}
