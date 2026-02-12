import apiClient from "@/lib/auth/client";
import {SERVICES_URL, WAREHOUSE_URL} from "@/lib/constants";
import {ListParams, ListResponse} from "@/types/params";
import {IService} from "@/features/services/types";
import {ServiceFormData} from "@/features/services/components/forms/schema";
import {WarehouseItem} from "@/features/warehouse/types";

import {StockMovements} from "@/features/stock-movements/types/stock-movements";


export const getAllInventoryTransactionsListFn = async (params: ListParams): Promise<ListResponse<StockMovements>> => {
    const response = await apiClient.get<ListResponse<StockMovements>>(`${WAREHOUSE_URL}/transactions`, {
        params
    });
    return response.data
}

export const getAllWarehouseItemsListFn = async (params: ListParams): Promise<ListResponse<WarehouseItem>> => {
    const response = await apiClient.get<ListResponse<WarehouseItem>>(`${WAREHOUSE_URL}/items`, {
        params
    });
    return response.data
}
