import { ArrowRightCircle, Trash2 } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'

import { DataTableColumnHeader } from '@/components/common/table/data-table-column-header'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'

import type { Product } from '@/features/products/types'
import type { ColumnDef } from '@tanstack/react-table'

export const productsColumnsDefs: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Название' />,
    cell: ({ row }) => <div className='w-auto'>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'sku',
    header: ({ column }) => <DataTableColumnHeader column={column} title='SKU' />,
    cell: ({ row }) => <div>{row.getValue('sku')}</div>,
  },
  {
    accessorKey: 'partNumber',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Артикул' />,
    cell: ({ row }) => <div>{row.getValue('partNumber')}</div>,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Цена' />,
    cell: ({ row }) => <div className='font-medium'>{formatPrice(row.getValue('price'))}</div>,
  },
  {
    accessorKey: 'isOriginal',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Оригинал' />,
    cell: ({ row }) => <div>{row.getValue('isOriginal') ? 'Да' : 'Нет'}</div>,
  },
  {
    accessorKey: 'isActive',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Статус' />,
    cell: ({ row }) => (
      <div className={`${row.getValue('isActive') ? 'text-green-600' : 'text-red-600'}`}>
        {row.getValue('isActive') ? 'Активен' : 'Неактивен'}
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Дата создания' />,
    cell: ({ row }) => <div>{new Date(row.getValue('createdAt')).toLocaleDateString('ru-RU')}</div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const productId = row.original.id
      return (
        <div className='flex gap-2 py-0'>
          <Button size='icon' variant='secondary' className='w-full p-0' asChild>
            <Link href={`/products/${productId}`}>
              <ArrowRightCircle />
            </Link>
          </Button>
          <Button size='icon' variant='ghost' className='p-0' disabled>
            <Trash2 />
          </Button>
        </div>
      )
    },
  },
]
