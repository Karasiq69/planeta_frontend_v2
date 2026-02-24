import { keepPreviousData, useQuery } from '@tanstack/react-query'

import {
  getAllInventoryTransactionsListFn,
  getAllWarehouseItemsListFn,
  getAllWarehousesFn,
  getStorageLocationsFn,
} from '@/features/warehouse/api/actions'
import { warehouseQueryKeys } from '@/features/warehouse/api/query-keys'

import type { ListParams } from '@/types/params'

export const useAllInventoryTransactions = (params: ListParams) => {
  return useQuery({
    queryKey: warehouseQueryKeys.transaction_list(params),
    queryFn: () => getAllInventoryTransactionsListFn(params),
    gcTime: 1000 * 60 * 20,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  })
}

export const useGetWarehouses = () => {
  return useQuery({
    queryKey: warehouseQueryKeys.list(),
    gcTime: 5000 * 60 * 20,
    staleTime: 10000 * 60 * 5,
    queryFn: getAllWarehousesFn,
  })
}

export const useAllWarehouseItems = (params: ListParams) => {
  return useQuery({
    queryKey: warehouseQueryKeys.items_list(params),
    queryFn: () => getAllWarehouseItemsListFn(params),
    gcTime: 1000 * 60 * 20,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  })
}
export const useAllStorageLocations = () => {
  return useQuery({
    queryKey: warehouseQueryKeys.storageLocations(),
    queryFn: () => getStorageLocationsFn(),
    gcTime: 1000 * 60 * 20,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  })
}
