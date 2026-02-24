import { keepPreviousData, useQuery } from '@tanstack/react-query'


import { getAllOrganizationsFn, getAllOrganizationsListFn, getOrganizationByIdFn } from './actions'
import { organizationsQueryKeys } from './query-keys'

import type { ListParams } from '@/types/params'

// Хук для получения всех организаций
export const useOrganizations = (params: ListParams) => {
  return useQuery({
    queryKey: organizationsQueryKeys.list(params),
    queryFn: () => getAllOrganizationsListFn(params),
    staleTime: 5 * 60 * 1000, // 5 минут
    placeholderData: keepPreviousData,
  })
}

export const useAllOrganizations = () => {
  return useQuery({
    queryKey: organizationsQueryKeys.all,
    queryFn: () => getAllOrganizationsFn(),
    staleTime: 5 * 60 * 1000, // 5 минут
    gcTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  })
}

// Хук для получения конкретной организации по ID
export const useOrganization = (id: number) => {
  return useQuery({
    queryKey: organizationsQueryKeys.detail(id),
    queryFn: () => getOrganizationByIdFn(id),
    enabled: !!id, // Запрос выполняется только если id определен
  })
}
