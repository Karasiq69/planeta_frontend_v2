import { useQuery } from '@tanstack/react-query'

import { getAllPositionsFn } from './actions'
import { positionsQueryKeys } from './query-keys'

export const usePositions = (params?: {
  page?: number
  pageSize?: number
  searchTerm?: string
}) => {
  return useQuery({
    queryKey: positionsQueryKeys.list(params),
    queryFn: () => getAllPositionsFn(params),
  })
}

export const useAllPositions = () => {
  return useQuery({
    queryKey: positionsQueryKeys.list({ pageSize: 100 }),
    queryFn: () => getAllPositionsFn({ pageSize: 100 }),
    staleTime: 5 * 60 * 1000,
  })
}
