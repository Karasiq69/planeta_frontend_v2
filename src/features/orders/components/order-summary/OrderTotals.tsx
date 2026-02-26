'use client'

import {
  ArrowRightLeft,
  Banknote,
  CreditCard,
  Globe,
  Wallet,
  X,
} from 'lucide-react'
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
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useOrderProductsByOrderId } from '@/features/order-products/api/queries'
import { useOrderServicesById } from '@/features/orders/api/queries'
import { getOrderSummary } from '@/features/orders/lib/order-calculator'
import { useCancelPayment } from '@/features/payments/api/mutations'
import { useOrderPayments, useOrderPaymentSummary } from '@/features/payments/api/queries'
import {
  formatAmount,
  PAYMENT_METHOD_LABELS,
  PAYMENT_STATUS_LABELS,
  PAYMENT_STATUS_VARIANT,
} from '@/features/payments/components/columns'
import CreatePaymentForm from '@/features/payments/components/forms/CreatePaymentForm'
import { formatRelativeTime } from '@/lib/format-date'

import type { Payment } from '@/features/payments/types'

const PAYMENT_METHOD_ICON: Record<Payment['paymentMethod'], React.ElementType> = {
  cash: Banknote,
  card: CreditCard,
  transfer: ArrowRightLeft,
  online: Globe,
}

type Props = {
  orderId: number
}

const OrderTotals = ({ orderId }: Props) => {
  const { data: orderServices, isLoading: isServicesLoading } = useOrderServicesById(orderId)
  const { data: orderProducts, isLoading: isProductsLoading } = useOrderProductsByOrderId(orderId)
  const { data: payments, isLoading: isPaymentsLoading } = useOrderPayments(orderId)
  const { data: paymentSummary } = useOrderPaymentSummary(orderId)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [cancelId, setCancelId] = useState<number | null>(null)
  const { mutate: cancel, isPending: isCancelling } = useCancelPayment(orderId)

  if (isServicesLoading || isProductsLoading) {
    return <OrderTotalsSkeleton />
  }

  const summary = getOrderSummary(orderServices || [], orderProducts || [])
  const percent =
    paymentSummary && paymentSummary.totalCost > 0
      ? Math.round((paymentSummary.totalPaid / paymentSummary.totalCost) * 100)
      : 0
  const paymentsList = payments ?? []
  const needsScroll = paymentsList.length > 3

  return (
    <>
      <Card>
        <CardContent className='p-6 text-sm'>
          {/* --- Работы --- */}
          <div className='grid gap-3'>
            <div className='font-semibold'>Работы</div>
            <ul className='grid gap-3'>
              <li className='flex items-center justify-between'>
                <span className='text-muted-foreground'>Количество</span>
                <span>{summary.services.count}</span>
              </li>
              <li className='flex items-center justify-between'>
                <span className='text-muted-foreground'>Расчетное время</span>
                <span>{summary.services.formattedDuration}</span>
              </li>
              <li className='flex items-center justify-between font-semibold'>
                <span className='text-muted-foreground'>Сумма</span>
                <span>{summary.services.formattedTotal}</span>
              </li>
            </ul>
          </div>

          <Separator className='my-4' />

          {/* --- Товары --- */}
          <div className='grid gap-3'>
            <div className='font-semibold'>Товары</div>
            <ul className='grid gap-3'>
              <li className='flex items-center justify-between'>
                <span className='text-muted-foreground'>Количество</span>
                <span>{summary.products.count}</span>
              </li>
              <li className='flex items-center justify-between font-semibold'>
                <span className='text-muted-foreground'>Итого</span>
                <span>{summary.products.formattedTotal}</span>
              </li>
            </ul>
          </div>

          <Separator className='my-4' />

          {/* --- Информация о заказе --- */}
          <div className='grid gap-3'>
            <div className='font-semibold'>Информация о заказе</div>
            <ul className='grid gap-3'>
              <li className='flex items-center justify-between'>
                <span className='text-muted-foreground'>Подытог</span>
                <span>{summary.summary.formattedSubtotal}</span>
              </li>
              <li className='flex items-center justify-between'>
                <span className='text-muted-foreground'>НДС (18%)</span>
                <span>{summary.summary.formattedTax}</span>
              </li>
              <li className='flex items-center justify-between font-semibold'>
                <span className='text-muted-foreground'>Итого</span>
                <span>{summary.summary.formattedTotal}</span>
              </li>
            </ul>
          </div>

          <Separator className='my-4' />

          {/* --- Блок оплаты --- */}
          <div className='rounded-lg bg-muted/50 p-4 space-y-4'>
            <div className='flex items-center gap-2'>
              <Wallet className='size-4 text-muted-foreground' />
              <span className='font-semibold'>Оплата</span>
              {paymentSummary && (
                <span className='ml-auto text-xs font-medium text-muted-foreground'>
                  {percent}%
                </span>
              )}
            </div>

            {paymentSummary && (
              <div className='space-y-3'>
                <Progress value={percent} className='h-1.5' />

                <div className='grid gap-1.5 text-xs'>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>К оплате</span>
                    <span className='font-medium'>{formatAmount(paymentSummary.totalCost)}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Оплачено</span>
                    <span
                      className={
                        paymentSummary.totalPaid > 0
                          ? 'font-medium text-emerald-600'
                          : 'font-medium'
                      }
                    >
                      {formatAmount(paymentSummary.totalPaid)}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Остаток</span>
                    <span
                      className={
                        paymentSummary.remaining > 0
                          ? 'font-medium text-red-500'
                          : 'font-medium text-emerald-600'
                      }
                    >
                      {formatAmount(paymentSummary.remaining)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Список платежей */}
            {!isPaymentsLoading && paymentsList.length > 0 && (
              <div className='space-y-2'>
                <div className='text-xs font-medium text-muted-foreground'>Платежи</div>
                {needsScroll ? (
                  <ScrollArea className='h-[156px]'>
                    <div className='space-y-1.5 pr-3'>
                      {paymentsList.map((payment) => (
                        <PaymentItem
                          key={payment.id}
                          payment={payment}
                          onCancel={setCancelId}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className='space-y-1.5'>
                    {paymentsList.map((payment) => (
                      <PaymentItem
                        key={payment.id}
                        payment={payment}
                        onCancel={setCancelId}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {!isPaymentsLoading && paymentsList.length === 0 && (
              <p className='text-xs text-muted-foreground'>Нет платежей</p>
            )}

            <Button
              size='sm'
              className='w-full bg-emerald-600 hover:bg-emerald-700 text-white'
              onClick={() => setDialogOpen(true)}
            >
              <CreditCard className='mr-1.5 size-3.5' />
              Принять оплату
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Диалог создания платежа */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Принять оплату</DialogTitle>
          </DialogHeader>
          <CreatePaymentForm orderId={orderId} onSuccess={() => setDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Диалог отмены платежа */}
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
              disabled={isCancelling}
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

/* --- Элемент платежа --- */

const PaymentItem = ({
  payment,
  onCancel,
}: {
  payment: Payment
  onCancel: (id: number) => void
}) => {
  const Icon = PAYMENT_METHOD_ICON[payment.paymentMethod]

  return (
    <div className='flex items-center gap-2 rounded-md bg-background px-2.5 py-1.5 text-xs'>
      <Icon className='size-3.5 shrink-0 text-muted-foreground' />
      <span className='font-medium'>{formatAmount(payment.amount)}</span>
      <span className='text-muted-foreground hidden sm:inline'>
        {PAYMENT_METHOD_LABELS[payment.paymentMethod]}
      </span>
      <Badge variant={PAYMENT_STATUS_VARIANT[payment.status]} className='text-[10px] px-1.5 py-0'>
        {PAYMENT_STATUS_LABELS[payment.status]}
      </Badge>
      <span className='ml-auto text-[10px] text-muted-foreground whitespace-nowrap'>
        {formatRelativeTime(payment.paidAt ?? payment.createdAt)}
      </span>
      {payment.status === 'completed' && (
        <button
          className='ml-1 rounded p-0.5 text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10 transition-colors'
          onClick={() => onCancel(payment.id)}
        >
          <X className='size-3' />
        </button>
      )}
    </div>
  )
}

/* --- Скелетон --- */

export const OrderTotalsSkeleton = () => (
  <Card>
    <CardContent className='p-6'>
      {[1, 2, 3].map((section) => (
        <div key={section} className='mb-4'>
          <Skeleton className='h-6 w-24 mb-3' />
          <div className='space-y-2'>
            {[1, 2, 3].map((item) => (
              <Skeleton key={item} className='h-4 w-full' />
            ))}
          </div>
          {section !== 3 && <Separator className='my-4' />}
        </div>
      ))}
      <Separator className='my-4' />
      <div className='rounded-lg bg-muted/50 p-4 space-y-3'>
        <Skeleton className='h-5 w-20' />
        <Skeleton className='h-1.5 w-full rounded-full' />
        <div className='space-y-1.5'>
          <Skeleton className='h-3.5 w-full' />
          <Skeleton className='h-3.5 w-full' />
          <Skeleton className='h-3.5 w-full' />
        </div>
        <Skeleton className='h-8 w-full rounded-md' />
      </div>
    </CardContent>
  </Card>
)

export default OrderTotals
