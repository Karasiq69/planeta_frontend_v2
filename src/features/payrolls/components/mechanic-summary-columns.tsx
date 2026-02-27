import { formatPrice } from '@/lib/utils'

import type { PayrollMechanicSummary } from '@/features/payrolls/types'
import type { ColumnDef } from '@tanstack/react-table'

export const mechanicSummaryColumns: ColumnDef<PayrollMechanicSummary>[] = [
  {
    accessorKey: 'mechanicName',
    header: 'Механик',
    cell: ({ row }) => <span className='font-medium'>{row.original.mechanicName}</span>,
  },
  {
    accessorKey: 'servicesCount',
    header: 'Услуг',
  },
  {
    accessorKey: 'totalAmount',
    header: 'Сумма',
    cell: ({ row }) => <span className='font-medium'>{formatPrice(row.original.totalAmount)}</span>,
  },
]
