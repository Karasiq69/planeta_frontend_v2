import type { TransactionParams, WarehouseItemsParams } from '@/features/warehouse/types'

export const warehouseQueryKeys = {
  all: ['warehouse'] as const,
  list: () => [...warehouseQueryKeys.all, 'list'] as const,

  details: () => [...warehouseQueryKeys.all, 'warehouse'] as const,
  detail: (id: number) => [...warehouseQueryKeys.details(), id] as const,

  transactions: () => [...warehouseQueryKeys.all, 'transactions'] as const,
  transaction_list: (params: TransactionParams) =>
    [...warehouseQueryKeys.transactions(), { params }] as const,

  items: () => [...warehouseQueryKeys.all, 'items'] as const,
  items_list: (params: WarehouseItemsParams) => [...warehouseQueryKeys.items(), { params }] as const,

  storageLocations: () => [...warehouseQueryKeys.all, 'storage-locations'] as const,
}
