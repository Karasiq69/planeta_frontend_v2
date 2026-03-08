import React, { Suspense } from 'react'

import PageLayout from '@/components/common/PageLayout'
import ApplicationsDataTable from '@/features/orders/applications/tables/ApplicationsDataTable'
import CreateOrderButton from '@/features/orders/components/create-order/CreateOrderButton'

import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Заявки на ремонт' }

const Page = async () => {
  return (
    <PageLayout>
      <PageLayout.Header title='Заявки на ремонт' actions={<CreateOrderButton label='Новая заявка' />} />
      <PageLayout.Content>
        <Suspense>
          <ApplicationsDataTable />
        </Suspense>
      </PageLayout.Content>
    </PageLayout>
  )
}
export default Page
