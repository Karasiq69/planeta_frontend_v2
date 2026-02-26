'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import { Progress } from '@/components/ui/progress'
import { useOrderPaymentSummary } from '@/features/payments/api/queries'

import { formatAmount } from './columns'

interface PaymentSummaryCardProps {
  orderId: number
}

const PaymentSummaryCard = ({ orderId }: PaymentSummaryCardProps) => {
  const { data, isLoading } = useOrderPaymentSummary(orderId)

  if (isLoading) return <LoaderSectionAnimated className='rounded p-6' />
  if (!data) return null

  const percent = data.totalCost > 0 ? Math.round((data.totalPaid / data.totalCost) * 100) : 0

  return (
    <Card>
      <CardHeader className='pb-3'>
        <CardTitle className='text-base'>Оплата</CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        <div className='space-y-1.5 text-sm'>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Итого к оплате</span>
            <span className='font-medium'>{formatAmount(data.totalCost)}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Оплачено</span>
            <span className={data.totalPaid > 0 ? 'font-medium text-green-600' : 'font-medium'}>
              {formatAmount(data.totalPaid)}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Остаток</span>
            <span
              className={
                data.remaining > 0 ? 'font-medium text-red-600' : 'font-medium text-green-600'
              }
            >
              {formatAmount(data.remaining)}
            </span>
          </div>
        </div>
        <Progress value={percent} className='h-2' />
      </CardContent>
    </Card>
  )
}

export default PaymentSummaryCard
