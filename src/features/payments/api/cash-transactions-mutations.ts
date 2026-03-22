import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  createCashTransaction,
  createPaymentCategory,
  deletePaymentCategory,
  updatePaymentCategory,
} from './cash-transactions-actions'
import {
  cashRegisterBalanceQueryKeys,
  cashRegistersQueryKeys,
  cashTransactionsQueryKeys,
  paymentCategoriesQueryKeys,
} from './query-keys'

import type { CreateCashTransactionPayload, CreatePaymentCategoryPayload, UpdatePaymentCategoryPayload } from '@/features/payments/types'

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

export const useCreatePaymentCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreatePaymentCategoryPayload) => createPaymentCategory(data),
    onSuccess: () => {
      toast.success('Категория создана')
      queryClient.invalidateQueries({ queryKey: paymentCategoriesQueryKeys.all })
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message
      toast.error(message || 'Ошибка создания категории')
    },
  })
}

export const useUpdatePaymentCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePaymentCategoryPayload }) => updatePaymentCategory(id, data),
    onSuccess: () => {
      toast.success('Категория обновлена')
      queryClient.invalidateQueries({ queryKey: paymentCategoriesQueryKeys.all })
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message
      toast.error(message || 'Ошибка обновления категории')
    },
  })
}

export const useDeletePaymentCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deletePaymentCategory(id),
    onSuccess: () => {
      toast.success('Категория удалена')
      queryClient.invalidateQueries({ queryKey: paymentCategoriesQueryKeys.all })
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message
      toast.error(message || 'Ошибка удаления категории')
    },
  })
}
