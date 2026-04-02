'use client'

import { Car, Plus } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useClientCars } from '@/features/clients/api/queries'
import ClientCarCard from '@/features/clients/components/cars/ClientCarCard'

interface ClientCarsGridProps {
  clientId: number
}

const ClientCarsGrid = ({ clientId }: ClientCarsGridProps) => {
  const { data, isLoading } = useClientCars(clientId)
  const cars = data?.data

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-52" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/cars/new?ownerId=${clientId}`}>
            <Plus className="size-4 mr-1.5" />
            Добавить авто
          </Link>
        </Button>
      </div>

      {(!cars || cars.length === 0) ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Car className="size-10 text-muted-foreground/40 mb-3" />
            <p className="text-sm text-muted-foreground">Нет автомобилей</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cars.map((car) => (
            <ClientCarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ClientCarsGrid
