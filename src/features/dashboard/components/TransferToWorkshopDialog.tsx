'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowDown, Warehouse, Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useGetWarehouses } from '@/features/warehouse/api/queries'
import { useTransferToWorkshop } from '@/features/orders/api/mutations'
import { warehouseTypeConfig } from '@/features/warehouse/types/config'

import type { Warehouse as WarehouseType } from '@/features/warehouse/types'

interface TransferToWorkshopDialogProps {
  orderId: number
  trigger: React.ReactNode
}

export default function TransferToWorkshopDialog({
  orderId,
  trigger,
}: TransferToWorkshopDialogProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [fromWarehouseId, setFromWarehouseId] = useState('')
  const [toWarehouseId, setToWarehouseId] = useState('')

  const { data: warehouses, isLoading } = useGetWarehouses() as { data: WarehouseType[] | undefined; isLoading: boolean }
  const transfer = useTransferToWorkshop()

  const sourceWarehouses = warehouses?.filter(
    (w) => w.type !== 'WORKSHOP' && w.isActive
  )
  const targetWarehouses = warehouses?.filter(
    (w) => w.type === 'WORKSHOP' && w.isActive
  )

  const canSubmit = fromWarehouseId && toWarehouseId && !transfer.isPending

  const handleSubmit = () => {
    if (!canSubmit) return
    transfer.mutate(
      {
        orderId,
        data: {
          fromWarehouseId: Number(fromWarehouseId),
          targetWarehouseId: Number(toWarehouseId),
        },
      },
      {
        onSuccess: (result) => {
          setOpen(false)
          router.push(`/documents/transfer/${result.data.id}`)
        },
      }
    )
  }

  const handleOpenChange = (value: boolean) => {
    setOpen(value)
    if (!value) {
      setFromWarehouseId('')
      setToWarehouseId('')
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Перемещение товаров</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Заказ #{orderId}
          </p>
        </DialogHeader>

        <div className="space-y-6 py-2">
          {/* Source warehouses */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Откуда</p>
            {isLoading ? (
              <div className="flex gap-3">
                <Skeleton className="h-16 flex-1 rounded-lg" />
                <Skeleton className="h-16 flex-1 rounded-lg" />
              </div>
            ) : (
              <ToggleGroup
                type="single"
                value={fromWarehouseId}
                onValueChange={setFromWarehouseId}
                className="flex flex-wrap gap-3"
              >
                {sourceWarehouses?.map((w) => {
                  const Icon = warehouseTypeConfig[w.type]?.icon || Warehouse
                  return (
                    <ToggleGroupItem
                      key={w.id}
                      value={String(w.id)}
                      className="flex h-auto items-center gap-3 rounded-lg border border-border px-4 py-3 data-[state=on]:border-primary data-[state=on]:bg-primary/5"
                    >
                      <Icon className="h-5 w-5 shrink-0 text-muted-foreground" />
                      <span className="text-sm font-medium">{w.name}</span>
                    </ToggleGroupItem>
                  )
                })}
              </ToggleGroup>
            )}
          </div>

          {/* Arrow separator */}
          <div className="flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-muted-foreground/30 bg-muted/50">
              <ArrowDown className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          {/* Target warehouses */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Куда</p>
            {isLoading ? (
              <div className="flex gap-3">
                <Skeleton className="h-16 flex-1 rounded-lg" />
              </div>
            ) : (
              <ToggleGroup
                type="single"
                value={toWarehouseId}
                onValueChange={setToWarehouseId}
                className="flex flex-wrap gap-3"
              >
                {targetWarehouses?.map((w) => {
                  const Icon = warehouseTypeConfig[w.type]?.icon || Warehouse
                  return (
                    <ToggleGroupItem
                      key={w.id}
                      value={String(w.id)}
                      className="flex h-auto items-center gap-3 rounded-lg border border-border px-4 py-3 data-[state=on]:border-primary data-[state=on]:bg-primary/5"
                    >
                      <Icon className="h-5 w-5 shrink-0 text-muted-foreground" />
                      <span className="text-sm font-medium">{w.name}</span>
                    </ToggleGroupItem>
                  )
                })}
              </ToggleGroup>
            )}
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full"
            size="lg"
          >
            {transfer.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Создать перемещение'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
