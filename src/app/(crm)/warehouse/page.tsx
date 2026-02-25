'use client'
import React, { Suspense } from 'react'

import PageHeader from '@/components/common/PageHeader'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import WarehouseDataTable from '@/features/warehouse/components/table/warehouse-items/WarehouseDataTable'

const Page = () => {
  return (
    <section className="flex flex-col h-full">
      <div className="space-y-5 shrink-0">
        <PageHeader title="Склад" showBackButton={false} />
        <div className="flex gap-5 items-center">
          <Button disabled variant="outline">
            Что-то сделать
          </Button>
        </div>
      </div>
      <Card className="mt-5 flex-1 min-h-0 flex flex-col">
        <Suspense>
          <WarehouseDataTable />
        </Suspense>
      </Card>
    </section>
  )
}
export default Page
