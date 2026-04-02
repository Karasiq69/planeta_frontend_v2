'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { AppButton } from '@/components/ds/base/AppButton'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useTransferToWorkshop } from '@/features/orders/api/mutations'
import { WarehouseDirectionPicker } from '@/features/warehouse/components/WarehouseDirectionPicker'

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

  const transfer = useTransferToWorkshop()

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
          <WarehouseDirectionPicker
            fromWarehouseId={fromWarehouseId}
            toWarehouseId={toWarehouseId}
            onFromChange={setFromWarehouseId}
            onToChange={setToWarehouseId}
            fromLabel='Откуда'
            toLabel='Куда'
            fromFilter={(w) => w.isActive && w.type !== 'WORKSHOP'}
            toFilter={(w) => w.isActive && w.type === 'WORKSHOP'}
          />

          <AppButton
            onClick={handleSubmit}
            disabled={!canSubmit}
            loading={transfer.isPending}
            className="w-full"
            size="lg"
          >
            Создать перемещение
          </AppButton>
        </div>
      </DialogContent>
    </Dialog>
  )
}
