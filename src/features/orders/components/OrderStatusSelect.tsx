'use client'

import { ChevronLeft, ChevronRight, ChevronsUpDown } from 'lucide-react'
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import LoaderAnimated from '@/components/ui/LoaderAnimated'
import { useChangeOrderStatus } from '@/features/orders/api/mutations'
import { getStatusData, statuses } from '@/features/orders/lib/statuses'
import { OrderStatus } from '@/features/orders/types'
import { cn } from '@/lib/utils'

import type { Order } from '@/features/orders/types'

type Props = {
  order: Order
}

const OrderStatusSelect = ({ order }: Props) => {
  const { mutate, isPending } = useChangeOrderStatus(order?.id)
  const [confirmStatus, setConfirmStatus] = useState<string | null>(null)

  if (!order) return null

  const currentStatus = order.status
  const currentData = getStatusData(currentStatus)

  const currentIndex = statuses.findIndex((s) => s.value.toUpperCase() === currentData.value)

  const prevStatus = currentIndex > 0 ? statuses[currentIndex - 1] : null
  const nextStatus =
    currentIndex !== -1 && currentIndex < statuses.length - 1 ? statuses[currentIndex + 1] : null

  const confirmData = confirmStatus ? getStatusData(confirmStatus) : null

  const handleConfirm = () => {
    if (confirmStatus) {
      mutate({ newStatus: confirmStatus as OrderStatus })
      setConfirmStatus(null)
    }
  }

  return (
    <>
      <div className='flex items-center justify-between rounded-lg border bg-muted/40 px-1 py-1'>
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

        {/* Текущий статус — dropdown для выбора любого */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                'inline-flex items-center gap-1.5 rounded-md border-transparent px-3 py-1.5 text-sm font-medium transition-colors',
                currentData.color
              )}
            >
              {currentData.icon && <currentData.icon className='size-3.5' />}
              {currentData.label}
              {isPending ? <LoaderAnimated /> : <ChevronsUpDown className='size-3 opacity-50' />}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='center' className='min-w-44'>
            {statuses.map((status) => {
              const isActive = status.value.toUpperCase() === currentData.value
              const isCancelled = status.value === OrderStatus.CANCELLED
              return (
                <div key={status.value}>
                  {isCancelled && <DropdownMenuSeparator />}
                  <DropdownMenuItem
                    disabled={isActive}
                    onClick={() => setConfirmStatus(status.value)}
                    className='gap-2'
                  >
                    <span
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded px-1.5 py-0.5 text-sm',
                        isActive ? cn(status.color, 'font-medium') : ''
                      )}
                    >
                      <status.icon className='size-3.5' />
                      {status.label}
                    </span>
                    {isActive && (
                      <span className='ml-auto text-xs text-muted-foreground'>текущий</span>
                    )}
                  </DropdownMenuItem>
                </div>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>

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
      </div>

      {/* Подтверждение смены статуса */}
      <AlertDialog open={confirmStatus !== null} onOpenChange={() => setConfirmStatus(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Сменить статус заказа?</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className='flex items-center gap-2 flex-wrap'>
                <span
                  className={cn(
                    'inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium',
                    currentData.color
                  )}
                >
                  {currentData.icon && <currentData.icon className='size-3' />}
                  {currentData.label}
                </span>
                <ChevronRight className='size-3.5 text-muted-foreground' />
                {confirmData && (
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium',
                      confirmData.color
                    )}
                  >
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
