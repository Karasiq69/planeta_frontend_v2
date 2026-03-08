import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  cancelPayment,
  createOrgCashRegister,
  createPayment,
  deactivateOrgCashRegister,
  updateOrgCashRegister,
} from './actions'
import { orgCashRegistersQueryKeys, paymentsQueryKeys } from './query-keys'

import type { CreateCashRegisterDto, CreatePaymentDto, UpdateCashRegisterDto } from '@/features/payments/types'

export const useCreateOrgCashRegister = (orgId: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateCashRegisterDto) => createOrgCashRegister(orgId, data),
    onSuccess: () => {
      toast.success('Касса создана')
      queryClient.invalidateQueries({ queryKey: orgCashRegistersQueryKeys.all(orgId) })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export const useUpdateOrgCashRegister = (orgId: number, id: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: UpdateCashRegisterDto) => updateOrgCashRegister(orgId, id, data),
    onSuccess: () => {
      toast.success('Касса обновлена')
      queryClient.invalidateQueries({ queryKey: orgCashRegistersQueryKeys.all(orgId) })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export const useDeactivateOrgCashRegister = (orgId: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deactivateOrgCashRegister(orgId, id),
    onSuccess: () => {
      toast.success('Касса деактивирована')
      queryClient.invalidateQueries({ queryKey: orgCashRegistersQueryKeys.all(orgId) })
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
