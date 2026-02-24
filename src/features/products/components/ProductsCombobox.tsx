'use client'
import * as React from 'react'

import { ComboboxSearch } from '@/components/ComboboxSearch'
import { Badge } from '@/components/ui/badge'
import { useProductsList } from '@/features/products/api/queries'
import useDebouncedSearch from '@/hooks/use-debounced-search'

import type { Product } from '@/features/products/types'

interface ProductsComboboxProps {
  onSelect: (product: Product) => void
  isPending?: boolean
}

const ProductsCombobox: React.FC<ProductsComboboxProps> = ({ onSelect, isPending = false }) => {
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

  return (
    <ComboboxSearch<Product>
      data={products}
      isLoading={isLoading || isFetching}
      isPending={isPending}
      width='w-auto'
      onSearch={debouncedHandleSearch}
      onSelect={onSelect}
      getDisplayValue={(product) => product.name}
      renderItem={(product) => (
        <div className='grid grid-cols-[120px_1fr_160px_80px] items-center gap-3 w-full'>
          <span className='text-sm text-muted-foreground truncate'>{product.partNumber}</span>
          <span className='font-medium truncate'>{product.name}</span>
          <span className='text-xs text-muted-foreground truncate text-right'>{product.sku}</span>
          <Badge variant='outline' className='font-normal text-muted-foreground justify-center'>
            {product.brand.name}
          </Badge>
        </div>
      )}
      searchError={searchError}
      placeholder='Поиск товаров'
    />
  )
}

export default ProductsCombobox
