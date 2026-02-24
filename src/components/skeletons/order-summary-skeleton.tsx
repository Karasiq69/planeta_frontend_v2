import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { OrderTotalsSkeleton } from '@/features/orders/components/order-summary/OrderTotals'

const OrderSummarySkeleton = () => {
  return (
    <div className='space-y-6'>
      {/* Первая карточка */}
      <div className='rounded-lg border'>
        {/* Заголовок */}
        <div className='flex flex-row items-start justify-between p-6 bg-background/80 rounded-t-lg border-b'>
          <div className='space-y-2'>
            <Skeleton className='h-6 w-[150px]' />
            <div className='space-y-1'>
              <Skeleton className='h-4 w-[200px]' />
              <Skeleton className='h-4 w-[120px]' />
              <Skeleton className='h-4 w-[120px]' />
            </div>
          </div>
          <Skeleton className='h-9 w-[180px]' />
        </div>

        {/* Контент */}
        <div className='p-6 space-y-5'>
          <div className='space-y-4'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-3/4' />
          </div>
          <Separator />
          <div className='space-y-4'>
            <Skeleton className='h-4 w-20' />
            <Skeleton className='h-10 w-full' />
            {/*<Skeleton className="h-4 w-2/3" />*/}
          </div>
        </div>
      </div>
      <OrderTotalsSkeleton />
    </div>
  )
}

export default OrderSummarySkeleton
