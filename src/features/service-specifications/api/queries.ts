import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getAllSpecificationsFn, getSpecificationByIdFn } from './actions'
import { specificationQueryKeys } from './query-keys'

import type { SpecificationQueryParams } from '@/features/service-specifications/types'

export const useSpecificationsList = (params: SpecificationQueryParams) => {
  return useQuery({
    queryKey: specificationQueryKeys.list(params),
    queryFn: () => getAllSpecificationsFn(params),
    gcTime: 1000 * 60 * 20,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  })
}

export const useSpecificationById = (id: number) => {
  return useQuery({
    queryKey: specificationQueryKeys.detail(id),
    queryFn: () => getSpecificationByIdFn(id),
    enabled: !!id,
  })
}
