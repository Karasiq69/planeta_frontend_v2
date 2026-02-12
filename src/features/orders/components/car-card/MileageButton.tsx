'use client'

import { ExternalLink, Gauge, Trash } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import InputWithIcon from '@/components/ui/input-with-icon'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useCreateMileage, useDeleteMileage } from '@/features/cars/mileages/api/mutations'
import { useMileagesByCarId } from '@/features/cars/mileages/api/queries'
import { formatRelativeTime } from '@/lib/format-date'


type Props = {
  carId: number
  orderId?: number
}

const MileageButton = ({ carId, orderId }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [mileageInput, setMileageInput] = useState<string>('')
  const { data: mileages, isLoading } = useMileagesByCarId(carId)
  const { mutate: addMileage, isPending: isAdding } = useCreateMileage()
  const { mutate: deleteMileage, isPending: isDeleting } = useDeleteMileage(carId)

  // Получаем последний пробег (сортировка предполагается на бэкенде по убыванию даты)
  const lastMileage = mileages && mileages.length > 0 ? mileages[0].value : 0

  const handleDeleteMileage = (mileageId: number) => {
    if (confirm('Вы уверены, что хотите удалить эту запись пробега?')) {
      deleteMileage(mileageId)
    }
  }

  const handleAddMileage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && mileageInput) {
      const mileageValue = parseInt(mileageInput)

      // Проверка валидности ввода
      if (isNaN(mileageValue) || mileageValue <= 0) {
        toast.error('Введите корректное значение пробега')
        return
      }

      // Проверка, что новый пробег больше последнего
      if (lastMileage && mileageValue <= lastMileage) {
        toast.error(`Новый пробег должен быть больше предыдущего (${lastMileage} км)`)
        return
      }
      addMileage(
        {
          carId: carId,
          value: mileageValue,
          orderId,
        },
        {
          onSuccess: () => {
            setMileageInput('')
          },
        }
      )
    }
  }

  if (isLoading)
    return (
      <Button
        variant="ghost"
        className="text-sm text-muted-foreground h-8 flex items-center gap-2"
      >
        <Gauge className="text-muted-foreground" size={16} />
        Загрузка...
      </Button>
    )

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="text-sm text-muted-foreground h-8 flex items-center gap-2"
        >
          <Gauge className="text-muted-foreground" size={16} />
          {lastMileage ? `${lastMileage.toLocaleString('ru-RU')} км` : 'Добавить пробег'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0 md:w-[400px]' align="end">
        <div className='flex items-baseline justify-between gap-1 px-3 py-2 bg-muted rounded-t-md'>
          <div className='font-semibold'>Пробег автомобиля</div>
        </div>
        <div className="p-3 bg-muted">
          {' '}
          {/* Увеличил отступ с p-2 до p-3 */}
          <div className='mb-2'>
            {' '}
            {/* Добавил контейнер с нижним отступом */}
            <InputWithIcon
              disabled={isAdding || isDeleting}
              onKeyDown={handleAddMileage}
              value={mileageInput}
              onChange={(e) => setMileageInput(e.target.value)}
              type='number'
              placeholder="Введите новый пробег и нажмите Enter"
              className='w-full' // Добавил класс для ширины
            />
          </div>
          {lastMileage > 0 && (
            <p className='text-xs text-muted-foreground mb-1'>
              Последний пробег: {lastMileage.toLocaleString('ru-RU')} км
            </p>
          )}
        </div>

        <Separator />

        <ScrollArea type="scroll" className='flex max-h-[500px] flex-col overflow-y-auto'>
          <div className='flex-1 p-2'>
            {mileages && mileages.length > 0 ? (
              mileages.map((mileage) => (
                <div
                  key={mileage.id}
                  className='group p-2 rounded hover:bg-muted flex justify-between items-center'
                >
                  <div>
                    <div className='font-medium'>{mileage.value.toLocaleString('ru-RU')} км</div>
                    <div className='text-xs text-muted-foreground'>
                      {formatRelativeTime(mileage?.createdAt.toString())}
                    </div>
                  </div>
                  <div className='flex items-center space-x-3'>
                    {/* Кнопка-ссылка на заказ */}
                    {mileage.orderId && (
                      <Link href={`/orders/${mileage.orderId}`} target='_blank' passHref>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-8 w-8'
                          title={`Открыть заказ #${mileage.orderId}`}
                        >
                          <div className='flex items-center'>
                            <span className='text-xs mr-1'>#{mileage.orderId}</span>
                            <ExternalLink size={12} />
                          </div>
                        </Button>
                      </Link>
                    )}

                    {/* Кнопка удаления записи пробега */}
                    <Button
                      variant='ghost'
                      size='icon'
                      className='opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8'
                      onClick={() => handleDeleteMileage(mileage.id)}
                      disabled={isDeleting}
                      title='Удалить запись пробега'
                    >
                      <Trash size={16} className='text-destructive' />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className='text-center py-4 text-muted-foreground'>Нет записей пробега</div>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

export default MileageButton
