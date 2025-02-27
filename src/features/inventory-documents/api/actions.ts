"use server"

import apiClient from "@/lib/auth/client";
import {INVENTORY_DOCUMENTS, SERVICES_URL} from "@/lib/constants";
import {ListParams, ListResponse} from "@/types/params";
import {IService} from "@/features/services/types";
import {ServiceFormData} from "@/features/services/components/forms/schema";
import {InventoryDocument} from "@/features/inventory-documents/types";


export const getAllInventoryDocuments = async (params: ListParams): Promise<ListResponse<InventoryDocument>> => {
    const response = await apiClient.get<ListResponse<InventoryDocument>>(`${INVENTORY_DOCUMENTS}`, {
        params
    });
    return response.data
}

export const createServiceFn = async (data: ServiceFormData) => {
    const response = await apiClient.post(`${SERVICES_URL}`, data)
    return response.data
}