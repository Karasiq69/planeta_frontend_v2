import React, { Suspense } from 'react'

import PageLayout from '@/components/common/PageLayout'
import WarehouseDataTable from '@/features/warehouse/components/table/warehouse-items/WarehouseDataTable'

import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Склад' }

const Page = () => {
  return (
    <PageLayout>
      <PageLayout.Header title='Склад' />
      <PageLayout.Content>
        <Suspense>
          <WarehouseDataTable />
        </Suspense>
      </PageLayout.Content>
    </PageLayout>
  )
}
export default Page
