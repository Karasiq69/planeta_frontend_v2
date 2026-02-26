'use client'

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
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useCancelPayment } from '@/features/payments/api/mutations'
import { formatRelativeTime } from '@/lib/format-date'

import {
  formatAmount,
  PAYMENT_METHOD_LABELS,
  PAYMENT_STATUS_LABELS,
  PAYMENT_STATUS_VARIANT,
} from './columns'

import type { Payment } from '@/features/payments/types'

interface OrderPaymentsListProps {
  payments: Payment[]
  orderId: number
}

const OrderPaymentsList = ({ payments, orderId }: OrderPaymentsListProps) => {
  const [cancelId, setCancelId] = useState<number | null>(null)
  const { mutate: cancel, isPending } = useCancelPayment(orderId)

  if (payments.length === 0) {
    return <p className='text-sm text-muted-foreground'>Нет платежей</p>
  }

  return (
    <>
      <div className='space-y-2'>
        {payments.map((payment) => (
          <div
            key={payment.id}
            className='flex items-center justify-between rounded-md border px-3 py-2 text-sm'
          >
            <div className='flex items-center gap-2'>
              <span className='font-medium'>{formatAmount(payment.amount)}</span>
              <span className='text-muted-foreground'>
                {PAYMENT_METHOD_LABELS[payment.paymentMethod]}
              </span>
              <Badge variant={PAYMENT_STATUS_VARIANT[payment.status]} className='text-xs'>
                {PAYMENT_STATUS_LABELS[payment.status]}
              </Badge>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-xs text-muted-foreground'>
                {formatRelativeTime(payment.paidAt ?? payment.createdAt)}
              </span>
              {payment.status === 'completed' && (
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-6 px-2 text-xs'
                  onClick={() => setCancelId(payment.id)}
                >
                  Отменить
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <AlertDialog open={cancelId !== null} onOpenChange={() => setCancelId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Отменить платёж?</AlertDialogTitle>
            <AlertDialogDescription>
              Платёж будет отменён. Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Нет</AlertDialogCancel>
            <AlertDialogAction
              disabled={isPending}
              onClick={() => {
                if (cancelId) {
                  cancel(cancelId, { onSuccess: () => setCancelId(null) })
                }
              }}
            >
              Отменить платёж
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default OrderPaymentsList
