import apiClient from '@/lib/auth/client'
import { STORAGE_LOCATIONS_URL, WAREHOUSE_URL } from '@/lib/constants'

import type { StockMovements } from '@/features/stock-movements/types/stock-movements'
import type { TransactionParams, Warehouse, WarehouseItem, WarehouseItemsParams } from '@/features/warehouse/types'
import type { ListResponse } from '@/types/params'

export const getAllInventoryTransactionsListFn = async (
  params: TransactionParams
): Promise<ListResponse<StockMovements>> => {
  const response = await apiClient.get<ListResponse<StockMovements>>(
    `${WAREHOUSE_URL}/transactions`,
    {
      params,
    }
  )
  return response.data
}

export const getAllWarehousesFn = async (): Promise<Warehouse[]> => {
  const response = await apiClient.get<Warehouse[]>(`${WAREHOUSE_URL}/`)
  return response.data
}

export const createWarehouseFn = async (data: Partial<Warehouse>): Promise<Warehouse> => {
  const response = await apiClient.post<Warehouse>(WAREHOUSE_URL, data)
  return response.data
}

export const updateWarehouseFn = async (id: number, data: Partial<Warehouse>): Promise<Warehouse> => {
  const response = await apiClient.patch<Warehouse>(`${WAREHOUSE_URL}/${id}`, data)
  return response.data
}

export const deleteWarehouseFn = async (id: number): Promise<void> => {
  await apiClient.delete(`${WAREHOUSE_URL}/${id}`)
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
