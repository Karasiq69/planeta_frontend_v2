import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { addOrderProductFn, updateOrderProductFn, repairTransferFn, repairReturnFn } from '@/features/order-products/api/actions'
import { documentsQueryKeys } from '@/features/documents/api/query-keys'
import { ordersQueryKeys } from '@/features/orders/api/query-keys'
import { paymentsQueryKeys } from '@/features/payments/api/query-keys'
import apiClient from '@/lib/auth/client'
import { ORDER_PRODUCTS_URL } from '@/lib/constants'

import type { OrderProduct, RepairTransferRequest, RepairReturnRequest } from '@/features/order-products/types'

export function useCreateOrderProduct(orderId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (productId: number) => addOrderProductFn(orderId, productId),
    onSuccess: () => {
      toast.success('Товар добавлен')
    },
    onError: () => {
      toast.error('Произошла ошибка, повторите попытку')
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.products(orderId),
      })
      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.detail(orderId),
      })
      queryClient.invalidateQueries({
        queryKey: paymentsQueryKeys.orderSummary(orderId),
      })
    },
  })
}

export function useDeleteOrderProduct(orderId: number) {
  const queryClient = useQueryClient()

  const deleteOrderProductFn = async (productId: number) => {
    const response = await apiClient.delete(`${ORDER_PRODUCTS_URL}/${productId}`)
    return response.data
  }

  return useMutation({
    mutationFn: deleteOrderProductFn,
    onSuccess: () => {
      toast.success('Товар удален')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.products(orderId),
      })
      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.detail(orderId),
      })
      queryClient.invalidateQueries({
        queryKey: paymentsQueryKeys.orderSummary(orderId),
      })
    },
  })
}

export function useUpdateOrderProduct(orderId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ productId, data }: { productId: number; data: Partial<OrderProduct> }) =>
      updateOrderProductFn(productId, data),
    onSuccess: () => {
      toast.success('Товар обновлен')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.products(orderId),
      })
      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.detail(orderId),
      })
      queryClient.invalidateQueries({
        queryKey: paymentsQueryKeys.orderSummary(orderId),
      })
    },
  })
}

export function useRepairTransfer(orderId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: RepairTransferRequest) => repairTransferFn(orderId, data),
    onSuccess: () => {
      toast.success('Товары переданы в ремонт')
    },
    onError: (error) => {
      toast.error(error.message || 'Ошибка при передаче товаров')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ordersQueryKeys.products(orderId) })
      queryClient.invalidateQueries({ queryKey: ordersQueryKeys.detail(orderId) })
      queryClient.invalidateQueries({ queryKey: documentsQueryKeys.lists() })
      queryClient.invalidateQueries({ queryKey: paymentsQueryKeys.orderSummary(orderId) })
    },
  })
}

export function useRepairReturn(orderId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: RepairReturnRequest) => repairReturnFn(orderId, data),
    onSuccess: () => {
      toast.success('Товары возвращены на склад')
    },
    onError: (error) => {
      toast.error(error.message || 'Ошибка при возврате товаров')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ordersQueryKeys.products(orderId) })
      queryClient.invalidateQueries({ queryKey: ordersQueryKeys.detail(orderId) })
      queryClient.invalidateQueries({ queryKey: documentsQueryKeys.lists() })
      queryClient.invalidateQueries({ queryKey: paymentsQueryKeys.orderSummary(orderId) })
    },
  })
}
