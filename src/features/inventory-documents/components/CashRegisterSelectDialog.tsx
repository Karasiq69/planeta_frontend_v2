'use client'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCashRegisters } from '@/features/payments/api/queries'
import LoaderAnimated from '@/components/ui/LoaderAnimated'

interface CashRegisterSelectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (cashRegisterId: number) => void
  isPending: boolean
}

const CashRegisterSelectDialog = ({
  open,
  onOpenChange,
  onConfirm,
  isPending,
}: CashRegisterSelectDialogProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const { data: cashRegisters, isLoading } = useCashRegisters()

  const activeCashRegisters = cashRegisters?.filter((cr) => cr.isActive) ?? []

  const handleConfirm = () => {
    if (selectedId != null) {
      onConfirm(selectedId)
    }
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) setSelectedId(null)
    onOpenChange(isOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Выберите кассу</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center py-4">
            <LoaderAnimated />
          </div>
        ) : activeCashRegisters.length === 0 ? (
          <p className="text-sm text-muted-foreground py-2">Нет активных касс</p>
        ) : (
          <Select onValueChange={(v) => setSelectedId(Number(v))}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите кассу" />
            </SelectTrigger>
            <SelectContent>
              {activeCashRegisters.map((cr) => (
                <SelectItem key={cr.id} value={cr.id.toString()}>
                  {cr.name} — {cr.balance.toLocaleString('ru')} ₽
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isPending}
          >
            Отмена
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={selectedId == null || isPending || activeCashRegisters.length === 0}
          >
            {isPending && <LoaderAnimated className="text-primary-foreground" />}
            Провести
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CashRegisterSelectDialog
