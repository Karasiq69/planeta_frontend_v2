import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getPayrollById, getPayrollItems, getPayrolls } from './actions'
import { payrollsQueryKeys } from './query-keys'

import type { PayrollQuery } from '@/features/payrolls/types'

export const usePayrollsList = (params: PayrollQuery = {}) => {
  return useQuery({
    queryKey: payrollsQueryKeys.list(params),
    queryFn: () => getPayrolls(params),
    placeholderData: keepPreviousData,
  })
}

export const usePayroll = (id: number) => {
  return useQuery({
    queryKey: payrollsQueryKeys.detail(id),
    queryFn: () => getPayrollById(id),
  })
}

export const usePayrollItems = (id: number, enabled = true) => {
  return useQuery({
    queryKey: payrollsQueryKeys.items(id),
    queryFn: () => getPayrollItems(id),
    enabled: enabled && !!id,
  })
}
