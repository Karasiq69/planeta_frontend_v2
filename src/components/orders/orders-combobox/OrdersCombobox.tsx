'use client'

import * as React from 'react'

import { ComboboxSearch } from '@/components/ComboboxSearch'
import { useOrdersList } from '@/features/orders/api/queries'
import StatusBadge from '@/features/orders/components/StatusBadge'
import useDebouncedSearch from '@/hooks/use-debounced-search'

import type { Order } from '@/features/orders/types'

interface OrdersComboboxProps {
  onSelect: (order: Order) => void
  isPending?: boolean
}

const OrdersCombobox: React.FC<OrdersComboboxProps> = ({ onSelect, isPending = false }) => {
  const { searchTerm, searchError, debouncedHandleSearch } = useDebouncedSearch()

  const {
    data: ordersResponse,
    isLoading,
    isFetching,
  } = useOrdersList({
    page: 1,
    pageSize: 50,
    searchTerm: searchTerm || undefined,
  })

  return (
    <ComboboxSearch<Order>
      data={ordersResponse}
      isLoading={isLoading || isFetching}
      isPending={isPending}
      width='w-auto'
      onSearch={debouncedHandleSearch}
      onSelect={onSelect}
      getDisplayValue={(order) => `Заказ #${order.id}`}
      renderItem={(order) => (
        <div className='flex items-center gap-2 w-full'>
          <span className='font-medium shrink-0'>#{order.id}</span>
          <span className='text-sm text-muted-foreground truncate'>
            {order.client ? `${order.client.lastName} ${order.client.firstName}` : 'Без клиента'}
          </span>
          <div className='ml-auto shrink-0'>
            <StatusBadge status={order.status} />
          </div>
        </div>
      )}
      searchError={searchError}
      placeholder='Поиск заказов'
    />
  )
}

export default OrdersCombobox
