'use client'

import { Lock } from 'lucide-react'

import { Badge } from '@/components/ui/badge'

import type { PaymentCategory } from '@/features/payments/types'
import type { ColumnDef } from '@tanstack/react-table'

const CATEGORY_TYPE_LABELS: Record<PaymentCategory['type'], string> = {
  income: 'Доход',
  expense: 'Расход',
  both: 'Оба',
}

const CATEGORY_TYPE_VARIANT: Record<PaymentCategory['type'], 'success' | 'destructive' | 'secondary'> = {
  income: 'success',
  expense: 'destructive',
  both: 'secondary',
}

export const paymentCategoryColumns: ColumnDef<PaymentCategory>[] = [
  {
    accessorKey: 'name',
    header: 'Название',
  },
  {
    accessorKey: 'type',
    header: 'Тип',
    cell: ({ row }) => (
      <Badge variant={CATEGORY_TYPE_VARIANT[row.original.type]}>
        {CATEGORY_TYPE_LABELS[row.original.type]}
      </Badge>
    ),
  },
  {
    accessorKey: 'isSystem',
    header: 'Системная',
    cell: ({ row }) =>
      row.original.isSystem ? <Lock size={14} className='text-muted-foreground' /> : null,
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
]
