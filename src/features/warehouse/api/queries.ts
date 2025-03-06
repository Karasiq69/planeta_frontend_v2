import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {getAllServicesFn} from "@/features/services/api/actions";
import {servicesQueryKeys} from "@/features/services/api/query-keys";
import {ListParams} from "@/types/params";
import {warehouseQueryKeys} from "@/features/warehouse/api/query-keys";
import {
    getAllInventoryTransactionsListFn,
    getAllWarehouseItemsListFn,
    getStorageLocationsFn
} from "@/features/warehouse/api/actions";

export const useAllInventoryTransactions = (params: ListParams) => {
    return useQuery({
        queryKey: warehouseQueryKeys.transaction_list(params),
        queryFn: () => getAllInventoryTransactionsListFn(params),
        gcTime: 1000 * 60 * 20,
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData
    })
}


export const useAllWarehouseItems = (params: ListParams) => {
    return useQuery({
        queryKey: warehouseQueryKeys.items_list(params),
        queryFn: () => getAllWarehouseItemsListFn(params),
        gcTime: 1000 * 60 * 20,
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData
    })
}
export const useAllStorageLocations = () => {
    return useQuery({
        queryKey: warehouseQueryKeys.storageLocations(),
        queryFn: () => getStorageLocationsFn(),
        gcTime: 1000 * 60 * 20,
        refetchOnMount:false,
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData
    })
}