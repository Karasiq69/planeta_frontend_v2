import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { addOrderProductFn, updateOrderProductFn } from '@/features/order-products/api/actions'
import { ordersQueryKeys } from '@/features/orders/api/query-keys'
import apiClient from '@/lib/auth/client'
import { ORDER_PRODUCTS_URL } from '@/lib/constants'

import type { OrderProduct } from '@/features/order-products/types'

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
      // queryClient.invalidateQueries({
      //     queryKey: ordersQueryKeys.all
      // });
      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.products(orderId),
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
    },
  })
}
