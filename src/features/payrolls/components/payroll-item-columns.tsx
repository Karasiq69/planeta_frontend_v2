import Link from 'next/link'

import { PAYMENT_TYPE_LABELS } from '@/features/payrolls/lib/constants'
import { formatPaymentRate } from '@/features/payrolls/lib/format'
import { formatPrice } from '@/lib/utils'

import type { PayrollItem } from '@/features/payrolls/types'
import type { ColumnDef } from '@tanstack/react-table'

export const payrollItemColumns: ColumnDef<PayrollItem>[] = [
  {
    accessorKey: 'mechanicName',
    header: 'Механик',
    cell: ({ row }) => <span className='font-medium'>{row.original.mechanicName}</span>,
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
    accessorKey: 'servicePrice',
    header: 'Цена услуги',
    cell: ({ row }) => formatPrice(row.original.servicePrice),
  },
  {
    accessorKey: 'paymentType',
    header: 'Тип оплаты',
    cell: ({ row }) => PAYMENT_TYPE_LABELS[row.original.paymentType],
  },
  {
    accessorKey: 'paymentRate',
    header: 'Ставка',
    cell: ({ row }) => formatPaymentRate(row.original.paymentType, row.original.paymentRate),
  },
  {
    accessorKey: 'participationPercentage',
    header: 'Доля участия',
    cell: ({ row }) => `${row.original.participationPercentage}%`,
  },
  {
    accessorKey: 'calculatedAmount',
    header: 'Начислено',
    cell: ({ row }) => <span className='font-medium'>{formatPrice(row.original.calculatedAmount)}</span>,
  },
]
