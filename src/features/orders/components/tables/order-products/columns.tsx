import { Info } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { AppBadge } from '@/components/ds'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { TruncatedText } from '@/components/ui/truncated-text'
import OrderProductsTableActions from '@/features/orders/components/tables/order-products/order-products-table-actions'
import { MoneyCell } from '@/components/common/table/cells'
import { formatPrice } from '@/lib/utils'

import type { OrderProduct } from '@/features/order-products/types'
import type { ColumnDef } from '@tanstack/react-table'

export const OrderProductsColumnDefs: ColumnDef<OrderProduct>[] = [
  {
    accessorKey: 'product.name',
    header: () => <span className='text-xs text-nowrap'>Товар</span>,
    cell: ({ row }) => {
      const { product, inWorkshopQty } = row.original
      const quantity = Number(row.original.quantity)

      return (
        <div className='min-w-0 max-w-[320px]'>
          <TruncatedText text={product.name} className='font-medium' />
          <div className='text-xs text-muted-foreground flex items-center gap-2 flex-wrap'>
            <Badge
              variant='outline'
              className='text-muted-foreground font-normal text-[10px] px-1 py-0 shrink-0'
            >
              {product.brand.name}
            </Badge>
            {product.partNumber && <span>{product.partNumber}</span>}
            {product.sku && (
              <span className='text-muted-foreground/60'>арт. {product.sku}</span>
            )}
            {inWorkshopQty > 0 && (
              <AppBadge
                colorVariant={inWorkshopQty >= quantity ? 'success' : 'warning'}
                className='text-[10px] px-1 py-0'
              >
                В цеху: {inWorkshopQty >= quantity ? inWorkshopQty : `${inWorkshopQty} из ${quantity}`}
              </AppBadge>
            )}
          </div>
        </div>
      )
    },
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
    header: () => <span className='text-xs text-nowrap'>Наличие</span>,
    cell: ({ row }) => {
      const stock = row.original.stockQuantity
      const { inWorkshopQty } = row.original

      if (stock === null && inWorkshopQty === 0) {
        return <span className='text-xs text-muted-foreground'>—</span>
      }

      const totalStock = stock !== null ? Number(stock) : 0

      return (
        <div className='text-nowrap space-y-0.5'>
          <div className='space-x-1'>
            <span className={`text-xs ${totalStock > 0 ? 'text-green-500' : 'text-amber-500'}`}>
              {totalStock.toFixed()}
            </span>
            <span className='text-xs text-muted-foreground'>на складах</span>
          </div>
          {inWorkshopQty > 0 && (
            <div className='space-x-1'>
              <span className='text-xs text-blue-500'>{inWorkshopQty}</span>
              <span className='text-xs text-muted-foreground'>в цеху</span>
            </div>
          )}
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
      return <MoneyCell value={price} />
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
