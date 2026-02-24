import TransferActionButtons from '@/features/inventory-documents/transfer/components/table/items/TransferActionButtons'
import { TransferItemsQuantityCell } from '@/features/inventory-documents/transfer/components/table/items/TransferItemsQuantityCell'

import type { TransferDocumentItem } from '@/features/inventory-documents/transfer/types'
import type { ColumnDef } from '@tanstack/react-table'

export const TransferItemsColumnsDefs: ColumnDef<TransferDocumentItem>[] = [
  {
    accessorKey: 'index',
    header: '№',
    cell: ({ row }) => <div>{row.original.id}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'productName',
    header: 'Наименование',
    cell: ({ row }) => {
      const item = row.original
      return (
        <div>
          <div className='font-medium'>{item?.product?.name || '-'}</div>
          <div className='text-xs text-muted-foreground mt-1'>
            <span>Арт: {item?.product?.sku || '-'}</span>
            <span className='ml-2'>P/N: {item?.product?.partNumber || '-'}</span>
          </div>
        </div>
      )
    },
    size: 0,
  },
  {
    accessorKey: 'brandName',
    header: 'Производитель',
    cell: ({ row }) => {
      return (
        <p className="text-muted-foreground font-medium">
          {row.original?.product?.brand?.name || '-'}
        </p>
      )
    },
  },
  {
    accessorKey: 'quantity',
    header: 'Количество',
    cell: ({ row }) => {
      return (
        <TransferItemsQuantityCell
          documentId={row.original.documentId}
          item={row.original}
          fieldName='quantity'
          minValue={1}
          step={1}
          width='w-32'
        />
      )
    },
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      return <TransferActionButtons documentItem={row.original} />
    },
  },
]
