'use client'
import * as React from 'react'

import { ComboboxSearch } from '@/components/ComboboxSearch'
import { Badge } from '@/components/ui/badge'
import { useAllWarehouseItems } from '@/features/warehouse/api/queries'
import useDebouncedSearch from '@/hooks/use-debounced-search'

import type { WarehouseItem } from '@/features/warehouse/types'

type TransferItemsComboboxProps = {
  onSelectProduct: (warehouseItem: WarehouseItem) => void
  isPending: boolean
  warehouseId?: number
}

const TransferItemsCombobox = ({ onSelectProduct, isPending, warehouseId }: TransferItemsComboboxProps) => {
  const { searchTerm, searchError, debouncedHandleSearch } = useDebouncedSearch()

  const {
    data: warehouseItems,
    isLoading,
    isFetching,
  } = useAllWarehouseItems({
    page: 1,
    limit: 50,
    searchTerm: searchTerm || undefined,
    warehouseId,
  })

  const handleSelectItem = (item: WarehouseItem) => {
    onSelectProduct(item)
  }

  if (!warehouseId) {
    return (
      <p className='text-sm text-muted-foreground'>
        Выберите склад-источник для добавления товаров
      </p>
    )
  }

  return (
    <ComboboxSearch<WarehouseItem>
      data={warehouseItems}
      isLoading={isLoading || isFetching}
      isPending={isPending}
      width="w-[600px]"
      onSearch={debouncedHandleSearch}
      onSelect={handleSelectItem}
      getDisplayValue={(warehouseItem) => warehouseItem?.product?.name || `${warehouseItem.id}`}
      renderItem={(warehouseItem) => {
        const stock = parseFloat(warehouseItem.quantity || '0')
        return (
          <div className='grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-3 w-full'>
            <span className='text-sm text-muted-foreground'>{warehouseItem?.product?.partNumber}</span>
            <span className='font-medium truncate'>{warehouseItem?.product?.name}</span>
            <span className='text-xs text-muted-foreground whitespace-nowrap'>{warehouseItem?.product?.sku}</span>
            <span className={`text-xs whitespace-nowrap ${stock === 0 ? 'text-red-500' : 'text-muted-foreground'}`}>
              {stock} шт
            </span>
            <Badge variant='outline' className='font-normal text-muted-foreground whitespace-nowrap'>
              {warehouseItem?.product?.brand?.name}
            </Badge>
          </div>
        )
      }}
      searchError={searchError}
      placeholder='Поиск товаров на складе'
      mode='action'
    />
  )
}

export default TransferItemsCombobox
