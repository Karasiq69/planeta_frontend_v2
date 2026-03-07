import {
  BadgeCheck,
  History,
} from 'lucide-react'
import * as React from 'react'

import { DataTableColumnHeader } from '@/components/common/table/data-table-column-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { WarehouseBadge } from '@/features/warehouse/components/WarehouseBadge'
import { formatPrice } from '@/lib/utils'

import type { WarehouseItem } from '@/features/warehouse/types'
import type { ColumnDef, RowData } from '@tanstack/react-table'

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    onHistoryClick?: (item: WarehouseItem) => void
  }
}

export const warehouseItemsColumnsDefs: ColumnDef<WarehouseItem>[] = [
  {
    id: 'product',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Товар' />,
    cell: ({ row }) => (
      <div className='w-full'>
        <div className='font-medium flex items-center gap-1'>
          {row.original.product?.name || '-'}
          {row.original.product?.isOriginal && (
            <BadgeCheck size={16} className='text-blue-500 shrink-0' />
          )}
        </div>
      </div>
    ),
    size: 200,
  },
  {
    id: 'sku',
    header: ({ column }) => <DataTableColumnHeader column={column} title='SKU' />,
    cell: ({ row }) => <div className='text-xs'>{row.original.product?.sku || '-'}</div>,
  },
  {
    id: 'partNumber',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Артикул произв.' />,
    cell: ({ row }) => <div className='text-xs'>{row.original.product?.partNumber || '-'}</div>,
  },
  {
    id: 'warehouse',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Склад' />,
    cell: ({ row }) => {
      const w = row.original.warehouse
      return w ? <WarehouseBadge name={w.name} type={w.type} /> : '-'
    },
  },
  {
    id: 'quantities',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Кол-во / Резерв' />,
    cell: ({ row }) => {
      const quantity = Number(row.original.quantity)
      const reserved = Number(row.original.reservedQuantity)
      const available = quantity - reserved
      return (
        <div>
          <div className='font-medium'>{Math.floor(available)} шт.</div>
          {reserved > 0 && (
            <div className='text-sm text-muted-foreground'>
              {Math.floor(reserved)} в резерве
            </div>
          )}
        </div>
      )
    },
  },
  {
    id: 'minimumQuantity',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Мин. остаток' />,
    cell: ({ row }) => {
      const available = Number(row.original.quantity) - Number(row.original.reservedQuantity)
      const minimum = Number(row.original.minimumQuantity)
      const isLow = available <= minimum

      return <div className={isLow ? 'text-red-600 font-medium' : ''}>{Math.floor(minimum)}</div>
    },
  },
  {
    id: 'purchasePrice',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Закупка' />,
    cell: ({ row }) => (
      <div>{formatPrice(Number(row.original.purchasePrice))}</div>
    ),
  },
  {
    id: 'retailPrice',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Розница' />,
    cell: ({ row }) => (
      <div className='font-medium'>{formatPrice(Number(row.original.retailPrice))}</div>
    ),
  },
  {
    id: 'markup',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Наценка' />,
    cell: ({ row }) => (
      <div>{Math.floor(Number(row.original.markupPercentage))}%</div>
    ),
  },
  {
    id: 'storageLocation',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Ячейка' />,
    cell: ({ row }) => {
      const loc = row.original.storageLocation
      if (!loc) return <div className='text-muted-foreground'>—</div>
      const parts = [loc.zone, loc.rack, loc.shelf].filter(Boolean)
      return <div className='text-xs'>{parts.join('-') || '—'}</div>
    },
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      return (
        <Button
          size='sm'
          variant='outline'
          onClick={() => table.options.meta?.onHistoryClick?.(row.original)}
        >
          <History className='size-4 mr-1.5' />
          История
        </Button>
      )
    },
  },
]
