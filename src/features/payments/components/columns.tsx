'use client'

import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatRelativeTime } from '@/lib/format-date'

import type { BadgeProps } from '@/components/ui/badge'
import type { Payment } from '@/features/payments/types'
import type { ColumnDef } from '@tanstack/react-table'


const PAYMENT_METHOD_LABELS: Record<Payment['paymentMethod'], string> = {
  cash: 'Наличные',
  card: 'Карта',
  transfer: 'Перевод',
  online: 'Онлайн',
}

const PAYMENT_STATUS_LABELS: Record<Payment['status'], string> = {
  pending: 'Ожидает',
  completed: 'Оплачен',
  cancelled: 'Отменён',
  refunded: 'Возврат',
}

const PAYMENT_STATUS_VARIANT: Record<Payment['status'], BadgeProps['variant']> = {
  completed: 'success',
  cancelled: 'secondary',
  pending: 'warning',
  refunded: 'destructive',
}

const formatAmount = (value: number) =>
  new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2 }).format(value) + ' руб.'

export { formatAmount, PAYMENT_METHOD_LABELS, PAYMENT_STATUS_LABELS, PAYMENT_STATUS_VARIANT }

export const createPaymentColumns = (onCancel: (id: number) => void): ColumnDef<Payment>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 60,
  },
  {
    accessorKey: 'orderId',
    header: 'Заказ',
    cell: ({ row }) => (
      <Link href={`/orders/${row.original.orderId}`} className='text-primary hover:underline'>
        №{row.original.orderId}
      </Link>
    ),
  },
  {
    accessorKey: 'amount',
    header: 'Сумма',
    cell: ({ row }) => formatAmount(row.original.amount),
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Способ оплаты',
    cell: ({ row }) => PAYMENT_METHOD_LABELS[row.original.paymentMethod],
  },
  {
    id: 'cashRegister',
    header: 'Касса',
    cell: ({ row }) => row.original.cashRegister?.name ?? '—',
  },
  {
    accessorKey: 'status',
    header: 'Статус',
    cell: ({ row }) => (
      <Badge variant={PAYMENT_STATUS_VARIANT[row.original.status]}>
        {PAYMENT_STATUS_LABELS[row.original.status]}
      </Badge>
    ),
  },
  {
    id: 'date',
    header: 'Дата',
    cell: ({ row }) => formatRelativeTime(row.original.paidAt ?? row.original.createdAt),
  },
  {
    id: 'actions',
    header: '',
    size: 100,
    cell: ({ row }) => {
      if (row.original.status !== 'completed') return null
      return (
        <Button variant='ghost' size='sm' onClick={() => onCancel(row.original.id)}>
          Отменить
        </Button>
      )
    },
  },
]
