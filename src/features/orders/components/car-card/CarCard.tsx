import { CarFront } from 'lucide-react'
import { useParams } from 'next/navigation'
import React from 'react'

import LicensePlate from '@/components/cars/LicensePlate'
import OrderSkeletonCard from '@/components/skeletons/order-card-skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { getBrandLogo } from '@/features/cars/utils'
import { useOrderById } from '@/features/orders/api/queries'
import AddOrderCarButton from '@/features/orders/components/car-card/AddOrderCarButton'
import CarCardDropdownMenu from '@/features/orders/components/car-card/CarCardDropdownMenu'
import MileageButton from '@/features/orders/components/car-card/MileageButton'

const CarCard = () => {
  const params = useParams()
  const orderId = Number(params.id)
  const { data, isLoading } = useOrderById(orderId)

  if (isLoading) return <OrderSkeletonCard />
  if (!data) return 'no order or error'

  const car = data.car
  if (!car) return <EmptyCarCard />

  return (
    <Card className='p-4 pb-2'>
      <div className='flex items-start justify-between gap-3'>
        <div className='flex items-center gap-3 min-w-0'>
          <Avatar className='size-9 shrink-0'>
            <AvatarImage src={getBrandLogo(car.brand)} />
            <AvatarFallback className='text-xs'>
              <CarFront className='size-4' />
            </AvatarFallback>
          </Avatar>
          <div className='min-w-0'>
            <p className='text-sm font-semibold truncate'>
              {car.model?.name} {car.model?.series}
              {car.engine?.name}
              {car.year && (
                <span className='font-normal text-muted-foreground ml-1.5'>{car.year}</span>
              )}
            </p>
            <p className='text-xs text-muted-foreground font-mono mt-0.5 truncate'>{car.vin}</p>
          </div>
        </div>
        <CarCardDropdownMenu />
      </div>
      <div className='flex items-center justify-between mt-2 pt-2 border-t'>
        <LicensePlate licensePlate={car.licensePlate} />
        <MileageButton orderId={orderId} carId={car.id} />
      </div>
    </Card>
  )
}

export default CarCard

const EmptyCarCard = () => {
  return (
    <Card className='border border-dashed border-gray-200 flex items-center justify-center p-8'>
      <AddOrderCarButton />
    </Card>
  )
}
