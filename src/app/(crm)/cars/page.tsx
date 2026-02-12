import Link from 'next/link'
import React, { Suspense } from 'react'

import PageHeader from '@/components/common/PageHeader'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import CreateVehicleButton from '@/features/cars/components/CreateVehicleButton'
import VehiclesDataTable from '@/features/cars/components/table/VehiclesDataTable'
import { CARS_URL } from '@/lib/constants'

const VehiclesPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const newCarsUrl = `${CARS_URL}/new`
  return (
    <section>
      <div className="space-y-5">
        <PageHeader title="Автомобили" />
        <div className="flex gap-3">
          <CreateVehicleButton />
          <Button asChild>
            <Link href={newCarsUrl}>Новый автомобиль page</Link>
          </Button>
        </div>

        <Card>
          <Suspense>
            <VehiclesDataTable />
          </Suspense>
        </Card>
      </div>
    </section>
  )
}
export default VehiclesPage
