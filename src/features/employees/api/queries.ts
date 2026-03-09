import { keepPreviousData, useQuery } from '@tanstack/react-query'

import {
  getAllEmployeesFn,
  getEmployeeByIdFn,
  getEmployeesByOrganizationFn,
  getMechanicEmployeesFn,
} from './actions'
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

export const useMechanicEmployees = () => {
  return useQuery({
    queryKey: employeesQueryKeys.mechanics(),
    queryFn: () => getMechanicEmployeesFn(),
  })
}

export const useActiveEmployees = () => {
  return useQuery({
    queryKey: employeesQueryKeys.list({ pageSize: 100 }),
    queryFn: () => getAllEmployeesFn({ pageSize: 100 } as ListParams),
    staleTime: 5 * 60 * 1000,
  })
}
