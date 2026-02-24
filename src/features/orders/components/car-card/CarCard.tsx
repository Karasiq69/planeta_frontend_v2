import { Gauge } from 'lucide-react'
import { useParams } from 'next/navigation'
import React from 'react'

import LicensePlate from '@/components/cars/LicensePlate'
import OrderSkeletonCard from '@/components/skeletons/order-card-skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getBrandLogo } from '@/features/cars/utils'
import { useOrderById } from '@/features/orders/api/queries'
import AddOrderCarButton from '@/features/orders/components/car-card/AddOrderCarButton'
import CarCardDropdownMenu from '@/features/orders/components/car-card/CarCardDropdownMenu'
import MileageButton from '@/features/orders/components/car-card/MileageButton'

type Props = {}
const CarCard = (props: Props) => {
  const params = useParams()
  const orderId = Number(params.id)
  const { data, isLoading } = useOrderById(orderId)

  if (isLoading) return <OrderSkeletonCard />
  if (!data) return 'no order or error'

  const car = data.car
  if (!car) return <EmptyCarCard />
  //todo add button for create car inside order
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <div className="flex flex-row flex-wrap gap-4 items-center">
            <div>
              <Avatar>
                <AvatarImage src={getBrandLogo(car.brand)} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                {`${car?.model?.name} ${car?.model?.series}${car?.model?.engine?.name} `}

                <span className="font-normal text-sm"> {car?.year}</span>
              </CardTitle>
              <CardDescription>{car?.vin}</CardDescription>
            </div>
          </div>
          <CarCardDropdownMenu />
        </CardHeader>
        <CardFooter className="flex gap-2  justify-between items-end">
          <LicensePlate licensePlate={car.licensePlate} />
          <MileageButton orderId={orderId} carId={car.id} />
        </CardFooter>
      </Card>
    </>
  )
}
export default CarCard

const EmptyCarCard = () => {
  return (
    <Card className='h-[150px] border  border-dashed border-gray-200  flex items-center justify-center'>
      <AddOrderCarButton />
    </Card>
  )
}
