import { ArrowRightCircle } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'

import { DataTableColumnHeader } from '@/components/common/table/data-table-column-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getStatusConfig } from '@/features/documents/lib/status-helper'
import { formatRelativeTime } from '@/lib/format-date'

import type { Document } from '@/features/documents/types'
import type { ColumnDef } from '@tanstack/react-table'

export const transferColumns: ColumnDef<Document>[] = [
  {
    accessorKey: 'id',
    meta: 'Номер',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Номер' />,
    cell: ({ row }) => <div className='font-medium'>{`#${row.original.id}`}</div>,
    enableSorting: false,
    size: 0,
  },
  {
    accessorKey: 'date',
    meta: 'Дата',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Дата' />,
    cell: ({ row }) => (
      <span className='text-nowrap text-xs'>{row.original.date ? formatRelativeTime(row.original.date) : '—'}</span>
    ),
    enableSorting: true,
    size: 0,
  },
  {
    accessorKey: 'status',
    meta: 'Статус',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Статус' />,
    cell: ({ row }) => {
      const statusConfig = getStatusConfig(row.getValue('status') as string)
      return <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
    },
    size: 0,
    enableSorting: true,
  },
  {
    id: 'fromWarehouse',
    meta: 'Откуда',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Откуда' />,
    cell: ({ row }) => <div>{row.original.fromWarehouse?.name || '—'}</div>,
    enableSorting: false,
    size: 0,
  },
  {
    id: 'warehouse',
    meta: 'Куда',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Куда' />,
    cell: ({ row }) => <div>{row.original.warehouse?.name || '—'}</div>,
    enableSorting: false,
    size: 0,
  },
  {
    accessorKey: 'note',
    meta: 'Комментарий',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Комментарий' />,
    cell: ({ row }) => (
      <div className='max-w-[200px] truncate'>{row.original.note || '-'}</div>
    ),
    enableSorting: false,
    size: 0,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <Button size='icon' variant='secondary' className='w-full p-0' asChild>
        <Link href={`/documents/transfer/${row.original.id}`}>
          <ArrowRightCircle className='h-4 w-4' />
        </Link>
      </Button>
    ),
    size: 0,
  },
]
