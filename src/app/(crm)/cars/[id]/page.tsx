import React from 'react'

import PageHeader from '@/components/common/PageHeader'
import CarContentWrapper from '@/features/cars/components/CarContentWrapper'

type Props = {
  params: Promise<{
    id: string
  }>
}
const Page = async (props: Props) => {
  const params = await props.params
  return (
    <div className="space-y-5">
      <PageHeader title={`Автомобиль #${params.id}`} showBackButton />
      <CarContentWrapper carId={params.id} />
    </div>
  )
}
export default Page
