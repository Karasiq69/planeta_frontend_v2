'use client'

import { ArrowRightCircle, Trash2 } from 'lucide-react'
import Link from 'next/link'

import { DataTableColumnHeader } from '@/components/common/table/data-table-column-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PAYROLL_STATUS_LABELS, PAYROLL_STATUS_VARIANT } from '@/features/payrolls/lib/constants'
import { formatPayrollPeriod } from '@/features/payrolls/lib/format'
import { formatRelativeTime } from '@/lib/format-date'
import { formatPrice } from '@/lib/utils'

import type { PayrollListItem } from '@/features/payrolls/types'
import type { ColumnDef } from '@tanstack/react-table'

export const createPayrollColumns = (onDelete: (id: number) => void): ColumnDef<PayrollListItem>[] => [
  {
    accessorKey: 'periodStart',
    meta: 'Период',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Период' />,
    cell: ({ row }) => <span className='font-medium text-nowrap'>{formatPayrollPeriod(row.original.periodStart)}</span>,
    enableSorting: false,
    size: 0,
  },
  {
    accessorKey: 'status',
    meta: 'Статус',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Статус' />,
    cell: ({ row }) => (
      <Badge variant={PAYROLL_STATUS_VARIANT[row.original.status]}>
        {PAYROLL_STATUS_LABELS[row.original.status]}
      </Badge>
    ),
    size: 0,
    enableSorting: false,
  },
  {
    accessorKey: 'itemsCount',
    meta: 'Начислений',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Начислений' />,
    cell: ({ row }) => row.original.itemsCount,
    enableSorting: false,
    size: 0,
  },
  {
    accessorKey: 'totalAmount',
    meta: 'Сумма',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Сумма' />,
    cell: ({ row }) => <span className='font-medium'>{formatPrice(row.original.totalAmount)}</span>,
    enableSorting: false,
    size: 0,
  },
  {
    accessorKey: 'createdAt',
    meta: 'Создана',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Создана' />,
    cell: ({ row }) => (
      <span className='text-nowrap text-xs'>{formatRelativeTime(row.original.createdAt)}</span>
    ),
    enableSorting: false,
    size: 0,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className='flex items-center gap-1 justify-end'>
        {row.original.status === 'draft' && (
          <Button
            size='icon'
            variant='ghost'
            className='h-8 w-8 text-destructive hover:text-destructive'
            onClick={(e) => {
              e.stopPropagation()
              onDelete(row.original.id)
            }}
          >
            <Trash2 className='h-4 w-4' />
          </Button>
        )}
        <Button size='icon' variant='secondary' asChild>
          <Link href={`/payrolls/${row.original.id}`}>
            <ArrowRightCircle className='h-4 w-4' />
          </Link>
        </Button>
      </div>
    ),
    size: 0,
  },
]
