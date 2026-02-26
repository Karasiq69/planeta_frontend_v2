import { Info } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import OrderProductsTableActions from '@/features/orders/components/tables/order-products/order-products-table-actions'
import { formatPrice } from '@/lib/utils'

import type { OrderProduct } from '@/features/order-products/types'
import type { ColumnDef } from '@tanstack/react-table'

export const OrderProductsColumnDefs: ColumnDef<OrderProduct>[] = [
  {
    accessorKey: 'product.name',
    header: () => <span className='text-xs text-nowrap'>Товар</span>,
    cell: ({ row }) => (
      <div className='min-w-0'>
        <div className='font-medium flex items-center gap-1.5'>
          <span className='truncate'>{row.original.product.name}</span>
          <Badge
            variant='outline'
            className='text-muted-foreground font-normal text-[10px] px-1 py-0 shrink-0'
          >
            {row.original.product.brand.name}
          </Badge>
        </div>
        <div className='text-xs text-muted-foreground flex gap-2'>
          {row.original.product.partNumber && <span>{row.original.product.partNumber}</span>}
          {row.original.product.sku && (
            <span className='text-muted-foreground/60'>арт. {row.original.product.sku}</span>
          )}
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'quantity',
    header: () => <span className='text-xs text-nowrap'>Кол-во</span>,
    cell: ({ row }) => (
      <div className='space-x-1 text-nowrap'>
        <span>{Number(row.original.quantity).toFixed()}</span>
        <span className='text-xs text-muted-foreground'>шт.</span>
      </div>
    ),
  },
  {
    accessorKey: 'stockQuantity',
    header: () => <span className='text-xs text-nowrap'>На складе</span>,
    cell: ({ row }) => {
      const stock = row.original.stockQuantity
      if (stock === null) {
        return <span className='text-xs text-destructive text-nowrap'>Нет в системе</span>
      }
      const qty = Number(stock)
      if (qty === 0) {
        return (
          <div className='space-x-1 text-nowrap'>
            <span className='text-xs text-amber-500'>0</span>
            <span className='text-xs text-muted-foreground'>шт.</span>
          </div>
        )
      }
      return (
        <div className='space-x-1 text-nowrap'>
          <span className='text-xs text-green-500'>{qty.toFixed()}</span>
          <span className='text-xs text-muted-foreground'>шт.</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'appliedPrice',
    header: () => <span className='text-xs text-nowrap'>Цена</span>,
    cell: ({ row }) => {
      const actualPrice = Number(row.original.actualPrice)
      const estimatedPrice = Number(row.original.estimatedPrice)
      return (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className='flex gap-1 items-center text-nowrap'>
                <Info size={14} className='text-muted-foreground' />
                {formatPrice(actualPrice)}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <div>
                <p>Оригинальная цена: {actualPrice > 0 && estimatedPrice}</p>
                <p>Примененная цена: {actualPrice > 0 && estimatedPrice}</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    },
  },
  {
    accessorKey: 'total',
    header: () => <span className='text-xs text-nowrap'>Сумма</span>,
    cell: ({ row }) => {
      const price =
        Number(row.original.quantity) *
        parseInt(row.original.actualPrice || row.original.estimatedPrice)
      return <span className='text-nowrap'>{formatPrice(price)}</span>
    },
  },
  {
    accessorKey: 'actions',
    header: () => <span className='text-xs text-nowrap'></span>,
    cell: ({ row }) => {
      return <OrderProductsTableActions row={row} />
    },
  },
]
