import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  cancelPayment,
  createCashRegister,
  createPayment,
  deactivateCashRegister,
  updateCashRegister,
} from './actions'
import { cashRegistersQueryKeys, paymentsQueryKeys } from './query-keys'

import type { CreateCashRegisterDto, CreatePaymentDto, UpdateCashRegisterDto } from '@/features/payments/types'

export const useCreateCashRegister = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCashRegisterDto) => createCashRegister(data),
    onSuccess: () => {
      toast.success('Касса создана')
      queryClient.invalidateQueries({ queryKey: cashRegistersQueryKeys.all })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export const useUpdateCashRegister = (id: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateCashRegisterDto) => updateCashRegister(id, data),
    onSuccess: () => {
      toast.success('Касса обновлена')
      queryClient.invalidateQueries({ queryKey: cashRegistersQueryKeys.all })
      queryClient.invalidateQueries({ queryKey: cashRegistersQueryKeys.detail(id) })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export const useDeactivateCashRegister = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deactivateCashRegister(id),
    onSuccess: () => {
      toast.success('Касса деактивирована')
      queryClient.invalidateQueries({ queryKey: cashRegistersQueryKeys.all })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export const useCreatePayment = (orderId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreatePaymentDto) => createPayment(data),
    onSuccess: () => {
      toast.success('Оплата принята')
      queryClient.invalidateQueries({ queryKey: paymentsQueryKeys.all })
      queryClient.invalidateQueries({ queryKey: paymentsQueryKeys.orderPayments(orderId) })
      queryClient.invalidateQueries({ queryKey: paymentsQueryKeys.orderSummary(orderId) })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export const useCancelPayment = (orderId?: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => cancelPayment(id),
    onSuccess: () => {
      toast.success('Платёж отменён')
      queryClient.invalidateQueries({ queryKey: paymentsQueryKeys.all })
      if (orderId) {
        queryClient.invalidateQueries({ queryKey: paymentsQueryKeys.orderPayments(orderId) })
        queryClient.invalidateQueries({ queryKey: paymentsQueryKeys.orderSummary(orderId) })
      }
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
