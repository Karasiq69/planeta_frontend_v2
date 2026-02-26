'use client'

import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { useState } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import LoaderAnimated from '@/components/ui/LoaderAnimated'
import { useChangeOrderStatus } from '@/features/orders/api/mutations'
import { getStatusData, statuses } from '@/features/orders/lib/statuses'
import { cn } from '@/lib/utils'

import type { Order, OrderStatus } from '@/features/orders/types'

type Props = {
  order: Order
}

const OrderStatusSelect = ({ order }: Props) => {
  const { mutate, isPending } = useChangeOrderStatus(order?.id)
  const [confirmStatus, setConfirmStatus] = useState<string | null>(null)

  if (!order) return null

  const currentStatus = order.status
  const currentData = getStatusData(currentStatus)

  const currentIndex = statuses.findIndex(
    (s) => s.value.toUpperCase() === currentData.value
  )

  const prevStatus = currentIndex > 0 ? statuses[currentIndex - 1] : null
  const nextStatus =
    currentIndex !== -1 && currentIndex < statuses.length - 1
      ? statuses[currentIndex + 1]
      : null

  const confirmData = confirmStatus ? getStatusData(confirmStatus) : null

  const handleConfirm = () => {
    if (confirmStatus) {
      mutate({ newStatus: confirmStatus as OrderStatus })
      setConfirmStatus(null)
    }
  }

  return (
    <>
      <div className='flex items-center justify-center gap-0.5'>
        {/* Предыдущий статус */}
        <Button
          variant='ghost'
          size='sm'
          className='h-7 gap-1 px-2 text-xs text-muted-foreground'
          disabled={!prevStatus || isPending}
          onClick={() => prevStatus && setConfirmStatus(prevStatus.value)}
        >
          <ChevronLeft className='size-3' />
          {prevStatus?.label}
        </Button>

        {/* Текущий статус */}
        <div
          className={cn(
            'inline-flex items-center gap-1.5 rounded-md border px-3 py-1 text-xs font-semibold',
            currentData.color
          )}
        >
          {currentData.icon && <currentData.icon className='size-3.5' />}
          {currentData.label}
          {isPending && <LoaderAnimated />}
        </div>

        {/* Следующий статус */}
        <Button
          variant='ghost'
          size='sm'
          className='h-7 gap-1 px-2 text-xs text-muted-foreground'
          disabled={!nextStatus || isPending}
          onClick={() => nextStatus && setConfirmStatus(nextStatus.value)}
        >
          {nextStatus?.label}
          <ChevronRight className='size-3' />
        </Button>

        {/* Dropdown для произвольного выбора */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='sm' className='h-7 w-7 p-0'>
              <MoreHorizontal className='size-3.5 text-muted-foreground' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {statuses.map((status) => {
              const isActive = status.value.toUpperCase() === currentData.value
              return (
                <DropdownMenuItem
                  key={status.value}
                  disabled={isActive}
                  onClick={() => setConfirmStatus(status.value)}
                  className='gap-2 text-xs'
                >
                  <span className={cn('inline-flex items-center gap-1.5 rounded px-1.5 py-0.5 text-xs font-medium', status.color)}>
                    <status.icon className='size-3' />
                    {status.label}
                  </span>
                  {isActive && (
                    <span className='ml-auto text-[10px] text-muted-foreground'>текущий</span>
                  )}
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Подтверждение смены статуса */}
      <AlertDialog open={confirmStatus !== null} onOpenChange={() => setConfirmStatus(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Сменить статус заказа?</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className='flex items-center gap-2 flex-wrap'>
                <span className={cn('inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium', currentData.color)}>
                  {currentData.icon && <currentData.icon className='size-3' />}
                  {currentData.label}
                </span>
                <ChevronRight className='size-3.5 text-muted-foreground' />
                {confirmData && (
                  <span className={cn('inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium', confirmData.color)}>
                    {confirmData.icon && <confirmData.icon className='size-3' />}
                    {confirmData.label}
                  </span>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm} disabled={isPending}>
              Подтвердить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default OrderStatusSelect
