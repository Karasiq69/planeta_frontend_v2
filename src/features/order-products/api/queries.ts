import { useQuery } from '@tanstack/react-query'

import { getOrderProductsByOrderIdFn } from '@/features/order-products/api/actions'
import { ordersQueryKeys } from '@/features/orders/api/query-keys'

export const useOrderProductsByOrderId = (orderId: number) => {
  return useQuery({
    queryKey: ordersQueryKeys.products(orderId),
    queryFn: () => getOrderProductsByOrderIdFn(orderId),
  })
}
