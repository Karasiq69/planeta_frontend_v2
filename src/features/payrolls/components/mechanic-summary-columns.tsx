import { MoneyCell } from '@/components/common/table/cells'

import type { PayrollMechanicSummary } from '@/features/payrolls/types'
import type { ColumnDef } from '@tanstack/react-table'

export const mechanicSummaryColumns: ColumnDef<PayrollMechanicSummary>[] = [
  {
    accessorKey: 'employeeName',
    header: 'Механик',
    cell: ({ row }) => <span className='font-medium'>{row.original.employeeName}</span>,
  },
  {
    accessorKey: 'servicesCount',
    header: 'Работ',
  },
  {
    accessorKey: 'totalAmount',
    header: 'Сумма',
    cell: ({ row }) => <MoneyCell value={row.original.totalAmount} className='font-medium' />,
  },
]
