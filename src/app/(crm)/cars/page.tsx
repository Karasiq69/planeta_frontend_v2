import React, { Suspense } from 'react'

import PageLayout from '@/components/common/PageLayout'
import { CarsPageActions } from '@/features/cars/components/CarsPageActions'
import VehiclesDataTable from '@/features/cars/components/table/VehiclesDataTable'

import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Автомобили' }

const VehiclesPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  return (
    <PageLayout>
      <PageLayout.Header title='Автомобили' actions={<CarsPageActions />} />
      <PageLayout.Content>
        <Suspense>
          <VehiclesDataTable />
        </Suspense>
      </PageLayout.Content>
    </PageLayout>
  )
}
export default VehiclesPage
