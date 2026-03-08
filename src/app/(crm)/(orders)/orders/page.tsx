import React, { Suspense } from 'react'

import PageLayout from '@/components/common/PageLayout'
import CreateOrderButton from '@/features/orders/components/create-order/CreateOrderButton'
import OrdersDataTable from '@/features/orders/components/tables/OrdersDataTable'

import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Заказы' }

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  return (
    <PageLayout>
      <PageLayout.Header title='Заказы' actions={<CreateOrderButton />} />
      <PageLayout.Content>
        <Suspense>
          <OrdersDataTable />
        </Suspense>
      </PageLayout.Content>
    </PageLayout>
  )
}
export default Page
