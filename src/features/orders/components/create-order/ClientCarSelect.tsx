'use client'

import { Car } from 'lucide-react'
import { useEffect, useRef } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { useClientCars } from '@/features/clients/api/queries'

import type { ICar } from '@/features/cars/types/vehicle'

function formatCarLabel(car: ICar) {
  const brand = car.brand?.name ?? ''
  const model = car.model?.name ?? ''
  const plate = car.licensePlate ?? ''
  return `${brand} ${model}${plate ? ` · ${plate}` : ''}`.trim()
}

function formatCarVin(car: ICar) {
  if (!car.vin) return null
  return car.vin.length > 6 ? `VIN: ...${car.vin.slice(-6)}` : `VIN: ${car.vin}`
}

interface ClientCarSelectProps {
  clientId: number
  onSelect: (car: ICar | null) => void
}

export default function ClientCarSelect({ clientId, onSelect }: ClientCarSelectProps) {
  const { data, isLoading } = useClientCars(clientId)
  const cars = data?.data ?? []

  // Auto-select first car when data loads
  const hasAutoSelected = useRef(false)
  useEffect(() => {
    if (cars.length > 0 && !hasAutoSelected.current) {
      hasAutoSelected.current = true
      onSelect(cars[0])
    }
    if (cars.length === 0 && !isLoading) {
      onSelect(null)
    }
  }, [cars, isLoading, onSelect])

  if (isLoading) {
    return <Skeleton className="h-10 w-full rounded-md" />
  }

  if (cars.length === 0) {
    return (
      <div className="flex h-10 w-full items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
        Автомобили не найдены
      </div>
    )
  }

  return (
    <Select
      defaultValue={String(cars[0].id)}
      onValueChange={(value) => {
        const car = cars.find((c) => String(c.id) === value) ?? null
        onSelect(car)
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {cars.map((car) => (
          <SelectItem key={car.id} value={String(car.id)}>
            <div className="flex items-center gap-2">
              <Avatar className="size-6">
                {car.brand?.logo ? (
                  <AvatarImage src={car.brand.logo} alt={car.brand.name} />
                ) : null}
                <AvatarFallback className="text-[10px]">
                  <Car className="size-3" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{formatCarLabel(car)}</span>
                {formatCarVin(car) && (
                  <span className="text-xs text-muted-foreground">{formatCarVin(car)}</span>
                )}
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
