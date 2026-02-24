'use client'
import * as React from 'react'

import { ComboboxSearch } from '@/components/ComboboxSearch'
import { Badge } from '@/components/ui/badge'
import { useAllWarehouseItems } from '@/features/warehouse/api/queries'
import useDebouncedSearch from '@/hooks/use-debounced-search'

import type { WarehouseItem } from '@/features/warehouse/types'

interface WarehouseItemsComboboxProps {
  warehouseId: number
  onSelect: (warehouseItem: WarehouseItem) => void
  isPending?: boolean
}

const WarehouseItemsCombobox: React.FC<WarehouseItemsComboboxProps> = ({
  warehouseId,
  onSelect,
  isPending = false,
}) => {
  const { searchTerm, searchError, debouncedHandleSearch } = useDebouncedSearch()

  const {
    data: warehouseItems,
    isLoading,
    isFetching,
  } = useAllWarehouseItems({
    page: 1,
    pageSize: 50,
    searchTerm: searchTerm || undefined,
    warehouseId,
  })

  return (
    <ComboboxSearch<WarehouseItem>
      data={warehouseItems}
      isLoading={isLoading || isFetching}
      isPending={isPending}
      width='w-auto'
      onSearch={debouncedHandleSearch}
      onSelect={onSelect}
      getDisplayValue={(item) => item.product?.name || `#${item.id}`}
      renderItem={(item) => (
        <div className='grid grid-cols-[120px_1fr_160px_80px] items-center gap-3 w-full'>
          <span className='text-sm text-muted-foreground truncate'>
            {item.product?.partNumber}
          </span>
          <span className='font-medium truncate'>{item.product?.name}</span>
          <span className='text-xs text-muted-foreground truncate text-right'>
            {item.product?.sku}
          </span>
          <Badge variant='outline' className='font-normal text-muted-foreground justify-center'>
            {item.product?.brand?.name}
          </Badge>
        </div>
      )}
      searchError={searchError}
      placeholder='Поиск товаров на складе'
    />
  )
}

export default WarehouseItemsCombobox
