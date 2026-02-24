'use client'
import { Printer, Trash2 } from 'lucide-react'
import React from 'react'

import PageHeader from '@/components/common/PageHeader'
import { Button } from '@/components/ui/button'
import { useOrderById } from '@/features/orders/api/queries'
import CommentsPopoverButton from '@/features/orders/comments/components/CommentsPopoverButton'
import CarCard from '@/features/orders/components/car-card/CarCard'
import ClientCard from '@/features/orders/components/client-card/ClientCard'
import CreateOrderAppointment from '@/features/orders/components/CreateOrderAppointment'
import OrdersTabsWrapper from '@/features/orders/components/OrdersTabsWrapper'
import OrderSummary from '@/features/orders/components/OrderSummary'
import StatusBadge from '@/features/orders/components/StatusBadge'
import { getStatusData } from '@/features/orders/lib/statuses'

type Props = {
  orderId: number
}
const OrderPageWrapper = ({ orderId }: Props) => {
  const { data: order } = useOrderById(orderId)
  const { titleText } = getStatusData(order?.status)
  return (
    <div className="space-y-5">
      <section>
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-5 items-center">
            <PageHeader
              title={`${titleText} №${orderId}`}
              showBackButton={true}
              elements={[<StatusBadge key={order?.id} status={order?.status} />]}
            />
          </div>

          <div className='space-x-4'>
            <CreateOrderAppointment orderId={orderId} />
            <CommentsPopoverButton orderId={orderId} />

            <Button variant='outline' disabled size="sm">
              <Printer size={16} />
            </Button>
            <Button variant='ghost' disabled size="sm">
              <Trash2 size={16} /> Удалить заказ
            </Button>
          </div>
        </div>
      </section>

      <section className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-5'>
        {/* left section*/}
        <div className='md:col-span-2 space-y-5'>
          <div className='grid grid-cols-1 lg:grid-cols-2  gap-4 md:min-h-[156px]   drop-shadow-xs'>
            <ClientCard />
            <CarCard />
          </div>

          <div>
            <OrdersTabsWrapper />
          </div>
        </div>

        {/* right section*/}
        <div className='md:col-span-1 space-y-5'>
          <OrderSummary orderId={orderId} />
        </div>
      </section>
    </div>
  )
}
export default OrderPageWrapper
