import { keepPreviousData, useQuery } from '@tanstack/react-query'

import {
  getAllOrdersListFn,
  getClientsOrders,
  getOrderById,
  getOrderServicesById,
} from '@/features/orders/api/actions'
import { ordersQueryKeys } from '@/features/orders/api/query-keys'
import apiClient from '@/lib/auth/client'
import { ORDERS_URL, SERVICES_URL } from '@/lib/constants'

import type { OrderService, OrdersQueryParams } from '@/features/orders/types'

export const useOrderById = (orderId?: number) => {
  return useQuery({
    queryKey: ordersQueryKeys.detail(orderId as number),
    queryFn: () => getOrderById(orderId as number),
    enabled: !!orderId,
  })
}

export const useOrderServicesById = (orderId: number) => {
  return useQuery({
    queryKey: ordersQueryKeys.services(orderId),
    queryFn: () => getOrderServicesById(orderId),
    enabled: !!orderId,
  })
}

export const useOrdersList = (params: OrdersQueryParams) => {
  return useQuery({
    queryKey: ordersQueryKeys.list(params),
    queryFn: () => getAllOrdersListFn(params),
    gcTime: 1000 * 60 * 20,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  })
}

export function useOrderServices(id?: number) {
  // const { id } = useParams();
  const getOrderServicesFn = async (id: number) => {
    const response = await apiClient.get<OrderService[]>(`${ORDERS_URL}/${id}${SERVICES_URL}/`)
    return response.data
  }

  return useQuery<OrderService[], Error>({
    queryKey: ordersQueryKeys.detail(Number(id)),
    queryFn: () => getOrderServicesFn(Number(id)),
    enabled: !!id,
  })
}

export const useClientOrders = (clientId: number) => {
  return useQuery({
    queryKey: ordersQueryKeys.clientOrders(clientId),
    queryFn: () => getClientsOrders(clientId),
    enabled: !!clientId,
  })
}
