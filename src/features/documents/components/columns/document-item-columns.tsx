'use client'

import { Loader2, Minus, Pencil, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { DataTableColumnHeader } from '@/components/common/table/data-table-column-header'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { Input } from '@/components/ui/input'
import { formatPrice } from '@/lib/utils'

import type { DocumentItem } from '@/features/documents/types'
import type { ColumnDef } from '@tanstack/react-table'

export interface DocumentItemTableMeta {
  isDraft: boolean
  updatingItemId: number | null
  deletingItemId: number | null
  onUpdateItem: (itemId: number, data: { quantity?: number; price?: number }) => void
  onDeleteItem: (itemId: number) => void
}

function QuantityCell({ item, meta }: { item: DocumentItem; meta: DocumentItemTableMeta }) {
  const qty = Number(item.quantity)
  const isUpdating = meta.updatingItemId === item.id

  return (
    <ButtonGroup>
      <Button
        variant='outline'
        size='sm'
        className='h-7 w-7 p-0'
        disabled={qty <= 1 || isUpdating}
        onClick={() => meta.onUpdateItem(item.id, { quantity: qty - 1 })}
      >
        <Minus className='size-3' />
      </Button>
      <div className='flex h-7 min-w-[2rem] items-center justify-center border-y px-2 text-sm tabular-nums'>
        {isUpdating ? <Loader2 className='size-3 animate-spin' /> : qty}
      </div>
      <Button
        variant='outline'
        size='sm'
        className='h-7 w-7 p-0'
        disabled={isUpdating}
        onClick={() => meta.onUpdateItem(item.id, { quantity: qty + 1 })}
      >
        <Plus className='size-3' />
      </Button>
    </ButtonGroup>
  )
}

function PriceCell({ item, meta }: { item: DocumentItem; meta: DocumentItemTableMeta }) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(item.price ?? '')

  const handleSave = () => {
    const num = parseFloat(String(value))
    if (!isNaN(num) && num >= 0) {
      meta.onUpdateItem(item.id, { price: num })
    }
    setEditing(false)
  }

  if (editing) {
    return (
      <Input
        type='number'
        className='h-7 w-24 text-sm tabular-nums text-right'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSave()
          if (e.key === 'Escape') setEditing(false)
        }}
        autoFocus
      />
    )
  }

  return (
    <button
      type='button'
      className='inline-flex items-center gap-1 text-sm tabular-nums text-nowrap hover:text-primary transition-colors'
      onClick={() => {
        setValue(item.price ?? '')
        setEditing(true)
      }}
    >
      {item.price ? formatPrice(item.price) : '—'}
      <Pencil className='size-3 opacity-0 group-hover/row:opacity-40' />
    </button>
  )
}

export const documentItemColumns: ColumnDef<DocumentItem>[] = [
  {
    id: 'product',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Наименование' />,
    cell: ({ row }) => {
      const { product } = row.original
      return (
        <div>
          <div className='font-medium text-sm leading-tight'>{product.name}</div>
          <div className='text-xs text-muted-foreground mt-0.5'>
            {[product.sku, product.partNumber].filter(Boolean).join(' · ')}
          </div>
        </div>
      )
    },
    enableSorting: false,
  },
  {
    id: 'brand',
    size: 0,
    header: ({ column }) => <DataTableColumnHeader column={column} title='Производитель' />,
    cell: ({ row }) => (
      <span className='text-sm text-nowrap'>{row.original.product.brand?.name ?? '—'}</span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'quantity',
    size: 0,
    header: ({ column }) => <DataTableColumnHeader column={column} title='Кол-во' />,
    cell: ({ row, table }) => {
      const meta = table.options.meta as DocumentItemTableMeta | undefined
      if (meta?.isDraft) {
        return <QuantityCell item={row.original} meta={meta} />
      }
      return <div className='text-sm tabular-nums'>{row.original.quantity}</div>
    },
    enableSorting: false,
  },
  {
    accessorKey: 'price',
    size: 0,
    header: ({ column }) => <DataTableColumnHeader column={column} title='Цена закупки' />,
    cell: ({ row, table }) => {
      const meta = table.options.meta as DocumentItemTableMeta | undefined
      if (meta?.isDraft) {
        return <PriceCell item={row.original} meta={meta} />
      }
      return (
        <div className='text-sm tabular-nums text-nowrap'>
          {row.original.price ? formatPrice(row.original.price) : '—'}
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'totalPrice',
    size: 0,
    header: ({ column }) => <DataTableColumnHeader column={column} title='Сумма' />,
    cell: ({ row }) => (
      <div className='text-sm font-medium tabular-nums text-nowrap'>
        {row.original.totalPrice ? formatPrice(row.original.totalPrice) : '—'}
      </div>
    ),
    enableSorting: false,
  },
  {
    id: 'actions',
    size: 0,
    cell: ({ row, table }) => {
      const meta = table.options.meta as DocumentItemTableMeta | undefined
      if (!meta?.isDraft) return null

      const isDeleting = meta.deletingItemId === row.original.id

      return (
        <Button
          variant='ghost'
          size='sm'
          className='h-7 w-7 p-0 text-muted-foreground hover:text-destructive'
          disabled={isDeleting}
          onClick={() => meta.onDeleteItem(row.original.id)}
        >
          {isDeleting ? (
            <Loader2 className='size-3.5 animate-spin' />
          ) : (
            <Trash2 className='size-3.5' />
          )}
        </Button>
      )
    },
  },
]
