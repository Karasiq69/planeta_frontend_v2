'use client'
import * as React from 'react'

import { ComboboxSearch } from '@/components/ComboboxSearch'
import { Badge } from '@/components/ui/badge'
import { useCreateOrderProduct } from '@/features/order-products/api/mutations'
import { useProductsList } from '@/features/products/api/queries'
import useDebouncedSearch from '@/hooks/use-debounced-search'

import type { Product } from '@/features/products/types'

const OrderProductsCombobox = ({ orderId }: { orderId: number }) => {
  const { searchTerm, searchError, debouncedHandleSearch } = useDebouncedSearch()

  const {
    data: products,
    isLoading,
    isFetching,
  } = useProductsList({
    page: 1,
    pageSize: 50,
    searchTerm: searchTerm || undefined,
  })
  const { mutate, isPending } = useCreateOrderProduct(orderId)
  const handleSelectItem = (item: Product) => {
    mutate(item.id)
  }

  return (
    <div>
      <ComboboxSearch<Product>
        data={products}
        isLoading={isLoading || isFetching}
        isPending={isPending}
        width='w-[600px]'
        onSearch={debouncedHandleSearch}
        onSelect={handleSelectItem}
        getDisplayValue={(product) => product.name}
        renderItem={(product) => {
          const stock = parseFloat(product.totalStock || '0')
          return (
            <div className='grid grid-cols-[1fr_auto_auto_auto] items-center gap-3 w-full'>
              <span className='font-medium truncate'>{product.name}</span>
              <span className='text-xs text-muted-foreground whitespace-nowrap'>{product.sku}</span>
              <span className={`text-xs whitespace-nowrap ${stock === 0 ? 'text-red-500' : 'text-muted-foreground'}`}>
                {stock} шт
              </span>
              <Badge variant='outline' className='font-normal text-muted-foreground whitespace-nowrap'>
                {product.brand?.name}
              </Badge>
            </div>
          )
        }}
        searchError={searchError}
        placeholder='Поиск товаров'
      />
    </div>
  )
}
export default OrderProductsCombobox
