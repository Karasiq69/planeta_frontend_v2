import React, { Suspense } from 'react'

import { Card } from '@/components/ui/card'
import WarehouseDataTable from '@/features/warehouse/components/table/warehouse-items/WarehouseDataTable'

import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Склад' }

const Page = () => {
  return (
    <section className='flex flex-col h-full'>
      <div className='shrink-0'>
        <h3>Склад</h3>
      </div>
      <Card className='mt-5 flex-1 min-h-0 flex flex-col'>
        <Suspense>
          <WarehouseDataTable />
        </Suspense>
      </Card>
    </section>
  )
}
export default Page
