import { keepPreviousData, useQuery } from '@tanstack/react-query'

import {
  getOrgCashRegisters,
  getOrderPayments,
  getOrderPaymentSummary,
  getPaymentById,
  getPayments,
} from './actions'
import { orgCashRegistersQueryKeys, paymentsQueryKeys } from './query-keys'

import type { PaymentsQueryParams } from '@/features/payments/types'

export const useOrgCashRegisters = (orgId: number) => {
  return useQuery({
    queryKey: orgCashRegistersQueryKeys.all(orgId),
    queryFn: () => getOrgCashRegisters(orgId),
    enabled: !!orgId,
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
