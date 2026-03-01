'use client'

import LicensePlate from '@/components/cars/LicensePlate'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import CarForm from '@/features/cars/components/forms/CarForm'
import { getBrandLogo, getFullModelDisplayName } from '@/features/cars/utils'
import MileageButton from '@/features/orders/components/car-card/MileageButton'

import type { ICar } from '@/features/cars/types'

type Props = {
  car: ICar
}

const VehicleDetails = ({ car }: Props) => {
  const { brand, model, year, vin, licensePlate } = car

  const engineInfo = model?.engine
    ? `${model.engine.name} ${model.engine.series} ${model.engine.displacement}л.`
    : null

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="flex flex-row flex-wrap gap-4 items-center">
          <Avatar>
            <AvatarImage src={getBrandLogo(brand)} />
            <AvatarFallback>
              {brand?.name?.slice(0, 2)?.toUpperCase() ?? 'AU'}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="flex items-center gap-2">
              {getFullModelDisplayName(model)}
              {engineInfo && <span className="font-normal text-sm">{engineInfo}</span>}
              <span className="font-normal text-sm">{year}</span>
            </CardTitle>
            <CardDescription>{vin}</CardDescription>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" size="sm">
              Редактировать
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Редактировать авто</DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <CarForm carId={car.id} carData={car} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardFooter className="flex justify-between items-end">
        <LicensePlate licensePlate={licensePlate} />
        <MileageButton carId={car.id} />
      </CardFooter>
    </Card>
  )
}

export default VehicleDetails
