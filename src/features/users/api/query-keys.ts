import type { UserListParams } from '@/features/users/types'

export const usersQueryKeys = {
  all: ['users'] as const,
  lists: () => [...usersQueryKeys.all, 'list'] as const,
  list: (params?: UserListParams) => [...usersQueryKeys.lists(), { params }] as const,
  details: () => [...usersQueryKeys.all, 'detail'] as const,
  detail: (id: number) => [...usersQueryKeys.details(), id] as const,
  unlinked: () => [...usersQueryKeys.all, 'unlinked'] as const,
}
