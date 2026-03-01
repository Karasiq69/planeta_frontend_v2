import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getAllEmployeesFn, getEmployeeByIdFn, getEmployeesByOrganizationFn } from './actions'
import { employeesQueryKeys } from './query-keys'

import type { ListParams } from '@/types/params'

export const useEmployees = (params: ListParams) => {
  return useQuery({
    queryKey: employeesQueryKeys.list(params),
    queryFn: () => getAllEmployeesFn(params),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  })
}

export const useEmployee = (id: number) => {
  return useQuery({
    queryKey: employeesQueryKeys.detail(id),
    queryFn: () => getEmployeeByIdFn(id),
    enabled: !!id,
  })
}

export const useEmployeesByOrganization = (orgId: number) => {
  return useQuery({
    queryKey: employeesQueryKeys.byOrganization(orgId),
    queryFn: () => getEmployeesByOrganizationFn(orgId),
    enabled: !!orgId,
  })
}
