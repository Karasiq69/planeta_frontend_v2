import Link from 'next/link'

import { PAYMENT_TYPE_LABELS } from '@/features/payrolls/lib/constants'
import { formatPaymentRate } from '@/features/payrolls/lib/format'
import { MoneyCell } from '@/components/common/table/cells'

import type { PayrollItem } from '@/features/payrolls/types'
import type { ColumnDef } from '@tanstack/react-table'

export const payrollItemColumns: ColumnDef<PayrollItem>[] = [
  {
    accessorKey: 'employeeName',
    header: 'Механик',
    cell: ({ row }) => <span className='font-medium'>{row.original.employeeName}</span>,
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
    cell: ({ row }) => <MoneyCell value={row.original.servicePrice} />,
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
    cell: ({ row }) => <MoneyCell value={row.original.calculatedAmount} className='font-medium' />,
  },
]
