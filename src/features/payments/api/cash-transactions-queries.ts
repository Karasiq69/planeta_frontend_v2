import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getCashRegisterBalance, getCashTransactions, getPaymentCategories } from './cash-transactions-actions'
import { cashRegisterBalanceQueryKeys, cashTransactionsQueryKeys, paymentCategoriesQueryKeys } from './query-keys'

import type { CashTransactionFilters } from '@/features/payments/types'

export const useCashTransactions = (params: CashTransactionFilters, enabled = true) => {
  return useQuery({
    queryKey: cashTransactionsQueryKeys.list(params),
    queryFn: () => getCashTransactions(params),
    placeholderData: keepPreviousData,
    enabled,
  })
}

export const useCashRegisterBalance = (cashRegisterId: number, enabled = true) => {
  return useQuery({
    queryKey: cashRegisterBalanceQueryKeys.detail(cashRegisterId),
    queryFn: () => getCashRegisterBalance(cashRegisterId),
    enabled: enabled && !!cashRegisterId,
  })
}

export const usePaymentCategories = (params?: { type?: string; isActive?: boolean }) => {
  return useQuery({
    queryKey: paymentCategoriesQueryKeys.list(params),
    queryFn: () => getPaymentCategories(params),
    staleTime: 5 * 60 * 1000,
  })
}
