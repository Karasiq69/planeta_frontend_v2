import React, { Suspense } from 'react'

import PageHeader from '@/components/common/PageHeader'
import { Card } from '@/components/ui/card'
import ApplicationsDataTable from '@/features/orders/applications/tables/ApplicationsDataTable'
import CreateOrderButton from '@/features/orders/components/create-order/CreateOrderButton'

const Page = async () => {
  return (
    <section className="flex flex-col h-full">
      <div className="space-y-5 shrink-0">
        <PageHeader title="Заявки на ремонт" showBackButton={false} />
        <CreateOrderButton />
      </div>
      <Card className="mt-5 flex-1 min-h-0 flex flex-col">
        <Suspense>
          <ApplicationsDataTable />
        </Suspense>
      </Card>
    </section>
  )
}
export default Page
