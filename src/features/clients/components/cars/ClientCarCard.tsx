import Link from 'next/link'

import LicensePlate from '@/components/cars/LicensePlate'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { getBrandLogo, getFullModelDisplayName } from '@/features/cars/utils'

import type { ICar } from '@/features/cars/types'

interface ClientCarCardProps {
  car: ICar
}

const ClientCarCard = ({ car }: ClientCarCardProps) => {
  const { brand, model, year, vin, licensePlate, engine } = car

  const engineInfo = engine
    ? [
        engine.name,
        engine.series,
        engine.displacement ? `${engine.displacement}л.` : null,
        engine.power ? `${engine.power} л.с.` : null,
      ]
        .filter(Boolean)
        .join(' ')
    : null

  const lastMileage =
    car.mileages?.length > 0
      ? car.mileages[car.mileages.length - 1].value
      : null

  return (
    <Link href={`/cars/${car.id}`} className="block group">
      <Card className="h-full transition-colors group-hover:border-primary/30">
        <CardHeader className="flex flex-row gap-4 items-center">
          <Avatar className="size-12">
            <AvatarImage src={getBrandLogo(brand)} />
            <AvatarFallback className="text-xs">
              {brand?.name?.slice(0, 2)?.toUpperCase() ?? 'AU'}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <CardTitle className="text-base truncate">
              {brand?.name} {getFullModelDisplayName(model)}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{year} г.</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-2 pt-0">
          {engineInfo && (
            <p className="text-sm text-muted-foreground">{engineInfo}</p>
          )}
          <p className="text-xs text-muted-foreground font-mono">{vin}</p>
          {lastMileage != null && (
            <p className="text-sm">
              Пробег:{' '}
              <span className="font-semibold tabular-nums">
                {lastMileage.toLocaleString('ru-RU')} км
              </span>
            </p>
          )}
        </CardContent>

        <CardFooter>
          <LicensePlate licensePlate={licensePlate} />
        </CardFooter>
      </Card>
    </Link>
  )
}

export default ClientCarCard
