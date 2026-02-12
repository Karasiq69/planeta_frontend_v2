import apiClient from "@/lib/auth/client";
import {SERVICES_URL, STORAGE_LOCATIONS_URL, WAREHOUSE_URL} from "@/lib/constants";
import {ListParams, ListResponse} from "@/types/params";
import {IService} from "@/features/services/types";
import {ServiceFormData} from "@/features/services/components/forms/schema";
import {WarehouseItem} from "@/features/warehouse/types";
import {StorageLocation} from "@/features/warehouse/types/storage-locations";

import {StockMovements} from "@/features/stock-movements/types/stock-movements";


export const getAllInventoryTransactionsListFn = async (params: ListParams): Promise<ListResponse<StockMovements>> => {
    const response = await apiClient.get<ListResponse<StockMovements>>(`${WAREHOUSE_URL}/transactions`, {
        params
    });
    return response.data
}

export const getAllWarehousesFn = async ()=> {
    const response = await apiClient.get(`${WAREHOUSE_URL}/`)
    return response.data
}

export const getAllWarehouseItemsListFn = async (params: ListParams): Promise<ListResponse<WarehouseItem>> => {
    const response = await apiClient.get<ListResponse<WarehouseItem>>(`${WAREHOUSE_URL}/items`, {
        params
    });
    return response.data
}
export const getStorageLocationsFn = async () => {
    const response = await apiClient.get(`${WAREHOUSE_URL}${STORAGE_LOCATIONS_URL}`);
    return response.data
}
