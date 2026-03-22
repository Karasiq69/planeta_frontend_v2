import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createCashTransaction } from './cash-transactions-actions'
import { cashRegisterBalanceQueryKeys, cashRegistersQueryKeys, cashTransactionsQueryKeys } from './query-keys'

import type { CreateCashTransactionPayload } from '@/features/payments/types'

export const useCreateCashTransaction = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateCashTransactionPayload) => createCashTransaction(data),
    onSuccess: () => {
      toast.success('Операция создана')
      queryClient.invalidateQueries({ queryKey: cashTransactionsQueryKeys.all })
      queryClient.invalidateQueries({ queryKey: cashRegisterBalanceQueryKeys.all })
      queryClient.invalidateQueries({ queryKey: cashRegistersQueryKeys.all })
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message
      toast.error(message || 'Ошибка создания операции')
    },
  })
}
