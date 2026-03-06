import React, { Suspense } from 'react'

import PageHeader from '@/components/common/PageHeader'
import { Card } from '@/components/ui/card'
import CreateVehicleButton from '@/features/cars/components/CreateVehicleButton'
import VehiclesDataTable from '@/features/cars/components/table/VehiclesDataTable'

import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Автомобили' }

const VehiclesPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  return (
    <section className='flex flex-col h-full'>
      <div className='space-y-5 shrink-0'>
        <PageHeader title='Автомобили' />
        <div className='flex gap-3'>
          <CreateVehicleButton />
        </div>
      </div>
      <Card className='mt-5 flex-1 min-h-0 flex flex-col'>
        <Suspense>
          <VehiclesDataTable />
        </Suspense>
      </Card>
    </section>
  )
}
export default VehiclesPage
