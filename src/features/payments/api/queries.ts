import { keepPreviousData, useQuery } from '@tanstack/react-query'

import {
  getCashRegisterById,
  getCashRegisters,
  getOrderPayments,
  getOrderPaymentSummary,
  getPaymentById,
  getPayments,
} from './actions'
import { cashRegistersQueryKeys, paymentsQueryKeys } from './query-keys'

import type { PaymentsQueryParams } from '@/features/payments/types'

export const useCashRegisters = () => {
  return useQuery({
    queryKey: cashRegistersQueryKeys.all,
    queryFn: getCashRegisters,
  })
}

export const useCashRegisterById = (id: number) => {
  return useQuery({
    queryKey: cashRegistersQueryKeys.detail(id),
    queryFn: () => getCashRegisterById(id),
    enabled: !!id,
  })
}

export const usePaymentsList = (params: PaymentsQueryParams = {}) => {
  return useQuery({
    queryKey: paymentsQueryKeys.list(params),
    queryFn: () => getPayments(params),
    placeholderData: keepPreviousData,
  })
}

export const usePaymentById = (id: number) => {
  return useQuery({
    queryKey: paymentsQueryKeys.detail(id),
    queryFn: () => getPaymentById(id),
    enabled: !!id,
  })
}

export const useOrderPayments = (orderId: number) => {
  return useQuery({
    queryKey: paymentsQueryKeys.orderPayments(orderId),
    queryFn: () => getOrderPayments(orderId),
    enabled: !!orderId,
  })
}

export const useOrderPaymentSummary = (orderId: number) => {
  return useQuery({
    queryKey: paymentsQueryKeys.orderSummary(orderId),
    queryFn: () => getOrderPaymentSummary(orderId),
    enabled: !!orderId,
  })
}
