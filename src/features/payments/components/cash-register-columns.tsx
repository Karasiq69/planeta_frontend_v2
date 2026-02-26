'use client'

import { Badge } from '@/components/ui/badge'
import { formatRelativeTime } from '@/lib/format-date'

import { formatAmount } from './columns'

import type { CashRegister } from '@/features/payments/types'
import type { ColumnDef } from '@tanstack/react-table'


const CASH_REGISTER_TYPE_LABELS: Record<CashRegister['type'], string> = {
  physical: 'Физическая',
  online: 'Онлайн',
  api: 'API',
}

export const cashRegisterColumns: ColumnDef<CashRegister>[] = [
  {
    accessorKey: 'name',
    header: 'Название',
  },
  {
    accessorKey: 'type',
    header: 'Тип',
    cell: ({ row }) => CASH_REGISTER_TYPE_LABELS[row.original.type],
  },
  {
    accessorKey: 'balance',
    header: 'Баланс',
    cell: ({ row }) => formatAmount(row.original.balance),
  },
  {
    accessorKey: 'isActive',
    header: 'Статус',
    cell: ({ row }) => (
      <Badge variant={row.original.isActive ? 'success' : 'secondary'}>
        {row.original.isActive ? 'Активна' : 'Неактивна'}
      </Badge>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Дата создания',
    cell: ({ row }) => formatRelativeTime(row.original.createdAt),
  },
]
