'use client'

import { ArrowDown, Warehouse } from 'lucide-react'

import { Skeleton } from '@/components/ui/skeleton'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useGetWarehouses } from '@/features/warehouse/api/queries'
import { warehouseTypeConfig } from '@/features/warehouse/types/config'

import type { Warehouse as WarehouseType } from '@/features/warehouse/types'

interface WarehouseDirectionPickerProps {
  fromWarehouseId: string
  toWarehouseId: string
  onFromChange: (id: string) => void
  onToChange: (id: string) => void
  fromLabel?: string
  toLabel?: string
  fromFilter?: (w: WarehouseType) => boolean
  toFilter?: (w: WarehouseType) => boolean
}

export function WarehouseDirectionPicker({
  fromWarehouseId,
  toWarehouseId,
  onFromChange,
  onToChange,
  fromLabel = 'Откуда',
  toLabel = 'Куда',
  fromFilter,
  toFilter,
}: WarehouseDirectionPickerProps) {
  const { data: warehouses, isLoading } = useGetWarehouses()

  const sourceWarehouses = fromFilter
    ? warehouses?.filter(fromFilter)
    : warehouses?.filter((w) => w.isActive)
  const targetWarehouses = toFilter
    ? warehouses?.filter(toFilter)
    : warehouses?.filter((w) => w.isActive)

  return (
    <div className='space-y-4'>
      {/* Source warehouses */}
      <div className='space-y-2'>
        <p className='text-sm font-medium text-muted-foreground'>{fromLabel}</p>
        {isLoading ? (
          <div className='flex gap-3'>
            <Skeleton className='h-14 flex-1 rounded-lg' />
            <Skeleton className='h-14 flex-1 rounded-lg' />
          </div>
        ) : (
          <ToggleGroup
            type='single'
            value={fromWarehouseId}
            onValueChange={onFromChange}
            className='flex flex-wrap gap-3'
          >
            {sourceWarehouses?.map((w) => {
              const Icon = warehouseTypeConfig[w.type]?.icon || Warehouse
              return (
                <ToggleGroupItem
                  key={w.id}
                  value={String(w.id)}
                  className='flex h-auto items-center gap-3 rounded-lg border border-border px-4 py-3 data-[state=on]:border-primary data-[state=on]:bg-primary/5'
                >
                  <Icon className='h-5 w-5 shrink-0 text-muted-foreground' />
                  <span className='text-sm font-medium'>{w.name}</span>
                </ToggleGroupItem>
              )
            })}
          </ToggleGroup>
        )}
      </div>

      {/* Arrow separator */}
      <div className='flex items-center justify-center'>
        <div className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed border-muted-foreground/30 bg-muted/50'>
          <ArrowDown className='h-4 w-4 text-muted-foreground' />
        </div>
      </div>

      {/* Target warehouses */}
      <div className='space-y-2'>
        <p className='text-sm font-medium text-muted-foreground'>{toLabel}</p>
        {isLoading ? (
          <div className='flex gap-3'>
            <Skeleton className='h-14 flex-1 rounded-lg' />
          </div>
        ) : (
          <ToggleGroup
            type='single'
            value={toWarehouseId}
            onValueChange={onToChange}
            className='flex flex-wrap gap-3'
          >
            {targetWarehouses?.map((w) => {
              const Icon = warehouseTypeConfig[w.type]?.icon || Warehouse
              return (
                <ToggleGroupItem
                  key={w.id}
                  value={String(w.id)}
                  className='flex h-auto items-center gap-3 rounded-lg border border-border px-4 py-3 data-[state=on]:border-primary data-[state=on]:bg-primary/5'
                >
                  <Icon className='h-5 w-5 shrink-0 text-muted-foreground' />
                  <span className='text-sm font-medium'>{w.name}</span>
                </ToggleGroupItem>
              )
            })}
          </ToggleGroup>
        )}
      </div>
    </div>
  )
}
