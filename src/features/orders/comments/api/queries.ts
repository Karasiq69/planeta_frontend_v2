import { useQuery } from '@tanstack/react-query'

import { getCommentsByOrderId } from '@/features/orders/comments/api/actions'
import { commentQueryKeys } from '@/features/orders/comments/api/query-keys'

export const useCommentsByOrderId = (orderId?: number) => {
  return useQuery({
    queryKey: commentQueryKeys.byOrderId(orderId as number),
    queryFn: () => getCommentsByOrderId(orderId as number),
    enabled: !!orderId,
  })
}
