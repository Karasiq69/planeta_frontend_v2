import { Copy } from 'lucide-react'

import OrderSummarySkeleton from '@/components/skeletons/order-summary-skeleton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useOrderById } from '@/features/orders/api/queries'
import OrderTotals from '@/features/orders/components/order-summary/OrderTotals'
import ReasonToApply from '@/features/orders/components/order-summary/reason-to-apply'
import Recommendation from '@/features/orders/components/order-summary/recommendation'
import OrderStatusSelect from '@/features/orders/components/OrderStatusSelect'
import { getStatusData } from '@/features/orders/lib/statuses'
import { formatRelativeTime } from '@/lib/format-date'

type Props = {
  orderId: number
}

const OrderSummary = ({ orderId }: Props) => {
  const { data: order, isLoading } = useOrderById(orderId)
  const { isApplication, titleText } = getStatusData(order?.status)

  if (isLoading) return <OrderSummarySkeleton />
  if (!order) return 'no order or error'
  return (
    <>
      <Card>
        <CardHeader className='rounded-t-lg border-b p-4 space-y-3'>
          <div className='flex items-start justify-between gap-4'>
            <CardTitle className='group flex items-center gap-1.5 text-base font-semibold leading-none'>
              {titleText} №{orderId}
              <Button
                size='icon'
                variant='ghost'
                className='size-6 opacity-0 transition-opacity group-hover:opacity-100'
              >
                <Copy className='size-3' />
                <span className='sr-only'>Скопировать номер</span>
              </Button>
            </CardTitle>
            <div className='text-right text-xs text-muted-foreground leading-relaxed'>
              <p>{order?.creator?.username}</p>
              <p>Изм. {formatRelativeTime(order?.updatedAt)}</p>
            </div>
          </div>
          <OrderStatusSelect order={order} />
        </CardHeader>
        {!isApplication ? (
          <CardContent className='p-6'>
            <div className='grid gap-5'>
              <ReasonToApply order={order} />
              <Separator />
              <Recommendation order={order} />
            </div>
          </CardContent>
        ) : undefined}
      </Card>

      <OrderTotals orderId={orderId} />
    </>
  )
}

export default OrderSummary
