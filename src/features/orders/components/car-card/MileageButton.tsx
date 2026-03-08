'use client'

import { ExternalLink, Gauge, Trash } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'sonner'

import PopoverPanel from '@/components/common/PopoverPanel'
import { Button } from '@/components/ui/button'
import InputWithIcon from '@/components/ui/input-with-icon'
import { Separator } from '@/components/ui/separator'
import { useCreateMileage, useDeleteMileage } from '@/features/cars/mileages/api/mutations'
import { useMileagesByCarId } from '@/features/cars/mileages/api/queries'
import { formatRelativeTime } from '@/lib/format-date'
import { pluralize, words } from '@/lib/pluralize'
import { cn } from '@/lib/utils'

type Props = {
  carId: number
  orderId?: number
}

const MileageButton = ({ carId, orderId }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [mileageInput, setMileageInput] = useState('')
  const { data: mileages, isLoading } = useMileagesByCarId(carId)
  const { mutate: addMileage, isPending: isAdding } = useCreateMileage()
  const { mutate: deleteMileage, isPending: isDeleting } = useDeleteMileage(carId)

  const lastMileage = mileages && mileages.length > 0 ? mileages[0].value : 0
  const count = mileages?.length ?? 0

  const handleDeleteMileage = (mileageId: number) => {
    if (confirm('Вы уверены, что хотите удалить эту запись пробега?')) {
      deleteMileage(mileageId)
    }
  }

  const handleAddMileage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && mileageInput) {
      const mileageValue = parseInt(mileageInput)

      if (isNaN(mileageValue) || mileageValue <= 0) {
        toast.error('Введите корректное значение пробега')
        return
      }

      if (lastMileage && mileageValue <= lastMileage) {
        toast.error(`Новый пробег должен быть больше предыдущего (${lastMileage} км)`)
        return
      }

      addMileage(
        { carId, value: mileageValue, orderId },
        { onSuccess: () => setMileageInput('') }
      )
    }
  }

  if (isLoading)
    return (
      <Button variant="ghost" className="text-sm text-muted-foreground h-8 flex items-center gap-2">
        <Gauge className="text-muted-foreground" size={16} />
        Загрузка...
      </Button>
    )

  const middleContent = (
    <div>
      <InputWithIcon
        disabled={isAdding || isDeleting}
        onKeyDown={handleAddMileage}
        value={mileageInput}
        onChange={(e) => setMileageInput(e.target.value)}
        type="number"
        placeholder="Новый пробег, Enter для сохранения"
        className="w-full"
      />
      {lastMileage > 0 && (
        <p className="text-xs text-muted-foreground mt-2">
          Последний: {lastMileage.toLocaleString('ru-RU')} км
        </p>
      )}
    </div>
  )

  return (
    <PopoverPanel
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Пробег автомобиля"
      subtitle={pluralize(count, words.record)}
      middle={middleContent}
      trigger={
        <Button
          variant="ghost"
          className={cn(
            'text-sm text-muted-foreground h-8 flex items-center gap-2',
            isOpen && 'bg-accent text-accent-foreground'
          )}
        >
          <Gauge className="text-muted-foreground" size={16} />
          {lastMileage ? `${lastMileage.toLocaleString('ru-RU')} км` : 'Добавить пробег'}
        </Button>
      }
    >
      {count > 0 ? (
        mileages!.map((mileage, idx) => (
          <React.Fragment key={mileage.id}>
            {idx > 0 && <Separator />}
            <div className="group flex items-center justify-between gap-3 py-2.5 px-3">
              <div className="flex items-center gap-2">
                <Gauge className="size-3.5 text-muted-foreground shrink-0" />
                <div className="space-y-0.5">
                  <div className="text-xs font-medium tabular-nums">
                    {mileage.value.toLocaleString('ru-RU')} км
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    {formatRelativeTime(mileage.createdAt.toString())}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {mileage.orderId && (
                  <Button variant="ghost" size="sm" className="shrink-0 h-7 px-2 text-[11px] text-muted-foreground" asChild>
                    <Link href={`/orders/${mileage.orderId}`} target="_blank">
                      #{mileage.orderId}
                      <ExternalLink className="size-3 ml-1" />
                    </Link>
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDeleteMileage(mileage.id)}
                  disabled={isDeleting}
                >
                  <Trash className="size-3.5 text-destructive" />
                </Button>
              </div>
            </div>
          </React.Fragment>
        ))
      ) : (
        <div className="text-center py-6 text-sm text-muted-foreground">
          Нет записей пробега
        </div>
      )}
    </PopoverPanel>
  )
}

export default MileageButton
