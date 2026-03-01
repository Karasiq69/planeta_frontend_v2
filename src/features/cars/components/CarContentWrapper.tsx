'use client'

import { format } from 'date-fns'
import { useState } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { useCarHistory, useVehicleById } from '@/features/cars/api/queries'
import CarOwnerCard from '@/features/cars/components/CarOwnerCard'
import CarHistoryFilters from '@/features/cars/components/history/CarHistoryFilters'
import CarHistoryOrdersList from '@/features/cars/components/history/CarHistoryOrdersList'
import CarHistorySummaryCards from '@/features/cars/components/history/CarHistorySummaryCards'
import MileageChart from '@/features/cars/components/history/MileageChart'
import VehicleDetails from '@/features/cars/components/VehicleDetails'

import type { DateRange } from 'react-day-picker'

type Props = {
  carId: string
}

const CarContentWrapper = ({ carId }: Props) => {
  const [page, setPage] = useState(1)
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  const { data, isLoading } = useVehicleById(+carId)
  const { data: history, isLoading: historyLoading } = useCarHistory(+carId, {
    page,
    pageSize: 10,
    dateFrom: dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : undefined,
    dateTo: dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined,
  })

  if (isLoading) {
    return (
      <section className="space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Skeleton className="h-[156px]" />
          <Skeleton className="h-[156px]" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      </section>
    )
  }

  if (!data) return null

  return (
    <section className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 drop-shadow-xs">
        <VehicleDetails car={data} />
        {data.owner && <CarOwnerCard owner={data.owner} />}
      </div>

      <CarHistorySummaryCards summary={history?.summary} isLoading={historyLoading} />

      <MileageChart data={history?.mileageHistory ?? []} isLoading={historyLoading} />

      <CarHistoryFilters dateRange={dateRange} onDateRangeChange={setDateRange} />

      <CarHistoryOrdersList
        orders={history?.orders.data ?? []}
        pagination={history?.orders.pagination}
        isLoading={historyLoading}
        page={page}
        onPageChange={setPage}
      />
    </section>
  )
}

export default CarContentWrapper
