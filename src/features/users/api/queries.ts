import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getAllUsersFn, getUnlinkedUsersFn } from './actions'
import { usersQueryKeys } from './query-keys'

import type { UserListParams } from '@/features/users/types'

export const useUsers = (params: UserListParams) => {
  return useQuery({
    queryKey: usersQueryKeys.list(params),
    queryFn: () => getAllUsersFn(params),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  })
}

export const useUnlinkedUsers = () => {
  return useQuery({
    queryKey: usersQueryKeys.unlinked(),
    queryFn: () => getUnlinkedUsersFn(),
    staleTime: 60 * 1000,
  })
}
