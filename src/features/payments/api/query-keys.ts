import type { PaymentsQueryParams } from '@/features/payments/types'

export const paymentsQueryKeys = {
  all: ['payments'] as const,
  lists: () => [...paymentsQueryKeys.all, 'list'] as const,
  list: (params: PaymentsQueryParams) => [...paymentsQueryKeys.lists(), { params }] as const,
  details: () => [...paymentsQueryKeys.all, 'detail'] as const,
  detail: (id: number) => [...paymentsQueryKeys.details(), id] as const,
  orderPayments: (orderId: number) => [...paymentsQueryKeys.all, 'order', orderId] as const,
  orderSummary: (orderId: number) => [...paymentsQueryKeys.all, 'order-summary', orderId] as const,
}

export const cashRegistersQueryKeys = {
  all: ['cash-registers'] as const,
  detail: (id: number) => [...cashRegistersQueryKeys.all, 'detail', id] as const,
}
