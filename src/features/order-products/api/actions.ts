import apiClient from '@/lib/auth/client'
import { ORDER_PRODUCTS_URL, ORDERS_URL } from '@/lib/constants'

import type { OrderProduct, RepairTransferRequest, RepairReturnRequest } from '@/features/order-products/types'

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

export const repairTransferFn = async (orderId: number, data: RepairTransferRequest) => {
  const response = await apiClient.post(`${ORDERS_URL}/${orderId}/repair-transfer`, data)
  return response.data
}

export const repairReturnFn = async (orderId: number, data: RepairReturnRequest) => {
  const response = await apiClient.post(`${ORDERS_URL}/${orderId}/repair-return`, data)
  return response.data
}
