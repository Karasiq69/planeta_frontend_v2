'use client'
import { useParams } from 'next/navigation'

import { useVehicleById } from '@/features/cars/api/queries'
import CarForm from '@/features/cars/components/forms/CarForm'
import { ClientFormSkeleton } from '@/features/clients/components/forms/ClientFormSkeleton'

const CarFormContainer = () => {
  const { id } = useParams()
  const { data: carData, isLoading } = useVehicleById(+id)

  if (isLoading) {
    return <ClientFormSkeleton />
  }

  return <CarForm carId={+id} carData={carData} />
}

export default CarFormContainer
