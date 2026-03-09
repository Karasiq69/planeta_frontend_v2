import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const OrderSkeletonCard = () => {
  return (
    <Card className='p-4 pb-2'>
      <div className='flex items-start justify-between gap-3'>
        <div className='flex items-center gap-3 min-w-0'>
          <Skeleton className='size-9 rounded-full shrink-0' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-40' />
            <Skeleton className='h-3.5 w-52' />
          </div>
        </div>
        <Skeleton className='size-8 rounded-md' />
      </div>
      <div className='flex items-center justify-between mt-2 pt-2 border-t'>
        <Skeleton className='h-4 w-32' />
        <Skeleton className='h-4 w-20' />
      </div>
    </Card>
  )
}
export default OrderSkeletonCard
