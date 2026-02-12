import apiClient from '@/lib/auth/client'
import { ORDER_PRODUCTS_URL } from '@/lib/constants'

import type { OrderProduct } from '@/features/order-products/types'

export const getOrderProductsByOrderIdFn = async (orderId: number) => {
  const response = await apiClient.get<OrderProduct[]>(`${ORDER_PRODUCTS_URL}/order/${orderId}`)
  return response.data
}

export const addOrderProductFn = async (orderId: number, productId: number) => {
  const response = await apiClient.post(`${ORDER_PRODUCTS_URL}`, {
    orderId,
    productId,
  })
  return response.data
}

export const updateOrderProductFn = async (orderProductId: number, data: Partial<OrderProduct>) => {
  const response = await apiClient.patch(`${ORDER_PRODUCTS_URL}/${orderProductId}`, data)
  return response.data
}
