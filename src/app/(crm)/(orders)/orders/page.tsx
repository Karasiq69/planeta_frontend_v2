import React, { Suspense } from 'react'

import { Card } from '@/components/ui/card'
import CreateOrderButton from '@/features/orders/components/create-order/CreateOrderButton'
import OrdersDataTable from '@/features/orders/components/tables/OrdersDataTable'

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  return (
    <section className="flex flex-col h-full">
      <div className="space-y-5 shrink-0">
        <h3>Заказы</h3>
        <CreateOrderButton />
      </div>
      <Card className="mt-5 flex-1 min-h-0 flex flex-col">
        <Suspense>
          <OrdersDataTable />
        </Suspense>
      </Card>
    </section>
  )
}
export default Page
