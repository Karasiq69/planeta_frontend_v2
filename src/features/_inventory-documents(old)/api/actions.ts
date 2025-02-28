"use server"

import apiClient from "@/lib/auth/client";
import {INVENTORY_DOCUMENTS_URL} from "@/lib/constants";
import {ListParams, ListResponse} from "@/types/params";
import {CreateInventoryDocument, InventoryDocument} from "@/features/inventory-documents/types";


export const getAllInventoryDocuments = async (params: ListParams): Promise<ListResponse<InventoryDocument>> => {
    const response = await apiClient.get<ListResponse<InventoryDocument>>(`${INVENTORY_DOCUMENTS_URL}`, {
        params
    });
    return response.data
}

export const createInventoryDocumentFn = async (data: CreateInventoryDocument) => {
    const response = await apiClient.post(`${INVENTORY_DOCUMENTS_URL}`, data)
    return response.data
}

export const getInventoryDocumentByIdFn = async (id: number) => {
    const response = await apiClient.get<InventoryDocument>(`${INVENTORY_DOCUMENTS_URL}/${id}`)
    return response.data;
}