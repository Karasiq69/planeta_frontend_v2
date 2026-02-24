import apiClient from '@/lib/auth/client'
import { STORAGE_LOCATIONS_URL, WAREHOUSE_URL } from '@/lib/constants'

import type { StockMovements } from '@/features/stock-movements/types/stock-movements'
import type { WarehouseItem } from '@/features/warehouse/types'
import type { WarehouseItemsParams } from '@/features/warehouse/types'
import type { ListParams, ListResponse } from '@/types/params'

export const getAllInventoryTransactionsListFn = async (
  params: ListParams
): Promise<ListResponse<StockMovements>> => {
  const response = await apiClient.get<ListResponse<StockMovements>>(
    `${WAREHOUSE_URL}/transactions`,
    {
      params,
    }
  )
  return response.data
}

export const getAllWarehousesFn = async () => {
  const response = await apiClient.get(`${WAREHOUSE_URL}/`)
  return response.data
}

export const getAllWarehouseItemsListFn = async (
  params: WarehouseItemsParams
): Promise<ListResponse<WarehouseItem>> => {
  const response = await apiClient.get<ListResponse<WarehouseItem>>(`${WAREHOUSE_URL}/items`, {
    params,
  })
  return response.data
}
export const getStorageLocationsFn = async () => {
  const response = await apiClient.get(`${WAREHOUSE_URL}${STORAGE_LOCATIONS_URL}`)
  return response.data
}
