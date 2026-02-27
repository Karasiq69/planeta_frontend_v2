
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  confirmPayroll,
  createPayroll,
  deletePayroll,
  generatePayroll,
  payPayroll,
  revertPayroll,
} from './actions'
import { payrollsQueryKeys } from './query-keys'

import type { CreatePayrollDto } from '@/features/payrolls/types'
import type { ApiError } from '@/types/api-error'

export const useCreatePayroll = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreatePayrollDto) => createPayroll(data),
    onSuccess: () => {
      toast.success('Ведомость создана')
      queryClient.invalidateQueries({ queryKey: payrollsQueryKeys.lists() })
    },
    onError: (error: ApiError) => {
      if (error.response.status === 409) {
        toast.error('Ведомость за этот период уже существует')
      } else {
        toast.error(error.message)
      }
    },
  })
}

export const useGeneratePayroll = (id: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => generatePayroll(id),
    onSuccess: (result) => {
      toast.success(`Начисления сгенерированы: ${result.itemsCount} шт. на ${result.totalAmount} ₽`)
      queryClient.invalidateQueries({ queryKey: payrollsQueryKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: payrollsQueryKeys.items(id) })
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })
}

export const useConfirmPayroll = (id: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => confirmPayroll(id),
    onSuccess: () => {
      toast.success('Ведомость подтверждена')
      queryClient.invalidateQueries({ queryKey: payrollsQueryKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: payrollsQueryKeys.lists() })
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })
}

export const usePayPayroll = (id: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => payPayroll(id),
    onSuccess: () => {
      toast.success('Ведомость оплачена')
      queryClient.invalidateQueries({ queryKey: payrollsQueryKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: payrollsQueryKeys.lists() })
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })
}

export const useRevertPayroll = (id: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => revertPayroll(id),
    onSuccess: () => {
      toast.success('Ведомость откачена в черновик')
      queryClient.invalidateQueries({ queryKey: payrollsQueryKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: payrollsQueryKeys.lists() })
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })
}

export const useDeletePayroll = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deletePayroll(id),
    onSuccess: () => {
      toast.success('Ведомость удалена')
      queryClient.invalidateQueries({ queryKey: payrollsQueryKeys.lists() })
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })
}
