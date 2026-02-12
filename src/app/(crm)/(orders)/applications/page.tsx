import React, { Suspense } from 'react'

import PageHeader from '@/components/common/PageHeader'
import { Card } from '@/components/ui/card'
import ApplicationsDataTable from '@/features/orders/applications/tables/ApplicationsDataTable'
import CreateOrderButton from '@/features/orders/components/create-order/CreateOrderButton'
import OrdersDataTable from '@/features/orders/components/tables/OrdersDataTable'

const Page = async () => {
  return (
    <section>
      <div className="space-y-5">
        <PageHeader title="Заявки на ремонт" showBackButton={false} />
        <CreateOrderButton />
        <Card>
          <Suspense>
            <ApplicationsDataTable />
          </Suspense>
        </Card>
      </div>
    </section>
  )
}
export default Page
