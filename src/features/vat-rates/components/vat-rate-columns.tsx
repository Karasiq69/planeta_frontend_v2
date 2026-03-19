'use client'

import { Badge } from '@/components/ui/badge'

import type { VatRate } from '@/features/vat-rates/types'
import type { ColumnDef } from '@tanstack/react-table'

export const vatRateColumns: ColumnDef<VatRate>[] = [
  {
    accessorKey: 'name',
    header: 'Название',
  },
  {
    accessorKey: 'rate',
    header: 'Ставка',
    cell: ({ row }) => `${row.original.rate}%`,
  },
  {
    accessorKey: 'isDefault',
    header: 'По умолчанию',
    cell: ({ row }) =>
      row.original.isDefault ? <Badge variant='success'>По умолчанию</Badge> : null,
  },
  {
    accessorKey: 'isActive',
    header: 'Статус',
    cell: ({ row }) => (
      <Badge variant={row.original.isActive ? 'success' : 'secondary'}>
        {row.original.isActive ? 'Активна' : 'Архив'}
      </Badge>
    ),
  },
]
