import { ArrowRightCircle } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'

import { DataTableColumnHeader } from '@/components/common/table/data-table-column-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getStatusConfig } from '@/features/inventory-documents/receipt/helpers/status-helper'
import {
  InventoryDocumentStatus,
  InventoryDocumentType,
} from '@/features/inventory-documents/types'

import type { StockMovements } from '@/features/stock-movements/types/stock-movements'
import type { ColumnDef } from '@tanstack/react-table'

export const StockMovementsColumnsDefs: ColumnDef<StockMovements>[] = [
  {
    id: 'documentType',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Тип документа' />,
    cell: ({ row }) => (
      <div className='text-sm text-muted-foreground'>
        {row.original.document?.type ? InventoryDocumentType[row.original.document.type] : '-'}
        {}
      </div>
    ),
  },
  {
    id: 'documentStatus',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Статус' />,
    cell: ({ row }) => {
      const statusConfig = getStatusConfig(row.original.document.status)

      return <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
    },
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Кол-во' />,
    cell: ({ row }) => {
      const quantity = parseFloat(row.getValue('quantity'))
      const isPositive = quantity > 0
      return (
        <div className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '+' : ''}
          {quantity}
        </div>
      )
    },
    size: 0,
  },
  {
    id: 'product',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Товар' />,
    cell: ({ row }) => (
      <div className='w-auto'>
        <div className='font-medium text-xs'>
          {row.original.warehouseItem?.product?.name || '-'}
        </div>
      </div>
    ),
    size: 200,
  },
  {
    id: 'warehouse',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Склад' />,
    cell: ({ row }) => <div>{row.original.warehouseItem?.warehouse?.name || '-'}</div>,
  },
  {
    id: 'storageLocation',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Перемещение' />,
    cell: ({ row }) => {
      const { fromStorageLocationId, toStorageLocationId } = row.original

      if (!fromStorageLocationId && !toStorageLocationId) {
        return <div className='text-muted-foreground'>-</div>
      }

      return (
        <div className='text-sm'>
          {fromStorageLocationId && <div className='text-red-600'>Из: {fromStorageLocationId}</div>}
          {toStorageLocationId && <div className='text-green-600'>В: {toStorageLocationId}</div>}
        </div>
      )
    },
  },
  {
    accessorKey: 'note',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Примечание' />,
    cell: ({ row }) => {
      const note = row.getValue('note') as string
      const documentNote = row.original.document?.note

      return (
        <div className='max-w-[200px]'>
          {note && <div className='truncate'>{note}</div>}
          {documentNote && (
            <div className='text-xs text-muted-foreground truncate'>{documentNote}</div>
          )}
          {!note && !documentNote && '-'}
        </div>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Дата' />,
    cell: ({ row }) => {
      const createdAt = new Date(row.getValue('createdAt'))
      const documentDate = row.original.document?.date ? new Date(row.original.document.date) : null

      return (
        <div className='text-sm'>
          <div>{createdAt.toLocaleDateString('ru-RU')}</div>
          <div className='text-xs text-muted-foreground'>
            {createdAt.toLocaleTimeString('ru-RU', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const transactionId = row.original.id
      const documentId = row.original.documentId

      return (
        <div className='flex gap-2 py-0'>
          <Button size='icon' variant='secondary' className='w-8 h-8' asChild>
            <Link href={`/inventory/transactions/${transactionId}`}>
              <ArrowRightCircle className='h-4 w-4' />
            </Link>
          </Button>
          {documentId && (
            <Button size='icon' variant='outline' className='w-8 h-8' asChild>
              <Link href={`/inventory/documents/${documentId}`}>
                <ArrowRightCircle className='h-4 w-4' />
              </Link>
            </Button>
          )}
        </div>
      )
    },
  },
]
