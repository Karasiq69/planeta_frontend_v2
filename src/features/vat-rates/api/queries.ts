import { useQuery } from '@tanstack/react-query'

import { getVatRatesFn, getVatRateByIdFn } from './actions'
import { vatRatesQueryKeys } from './query-keys'

export const useVatRates = (params?: { active?: boolean }) => {
  return useQuery({
    queryKey: vatRatesQueryKeys.list(params),
    queryFn: () => getVatRatesFn(params),
  })
}

export const useVatRate = (id: number) => {
  return useQuery({
    queryKey: vatRatesQueryKeys.detail(id),
    queryFn: () => getVatRateByIdFn(id),
    enabled: !!id,
  })
}
