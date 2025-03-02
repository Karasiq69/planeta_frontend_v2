"use server"

import apiClient from "@/lib/auth/client";
import {INVENTORY_DOCUMENTS_URL} from "@/lib/constants";
import {ListResponse} from "@/types/params";
import {
    CreateDraftDocumentDTO,
    DocumentItemDTO,
    InventoryDocument,
    InventoryDocumentDetails,
    InventoryDocumentItem,
    InventoryDocumentsQuery,
    UpdateDocumentDTO,
    UpdateDocumentItemDTO
} from "../types";

// Получение списка документов с пагинацией и фильтрами
export const getInventoryDocuments = async (params: InventoryDocumentsQuery): Promise<ListResponse<InventoryDocument>> => {
    const response = await apiClient.get<ListResponse<InventoryDocument>>(`${INVENTORY_DOCUMENTS_URL}`, {
        params
    });
    return response.data;
};

// Получение одного документа по ID со всеми товарами
export const getInventoryDocumentById = async (id: number): Promise<InventoryDocumentDetails> => {
    const response = await apiClient.get<InventoryDocumentDetails>(`${INVENTORY_DOCUMENTS_URL}/${id}`);
    return response.data;
};

// Создание нового черновика документа
export const createDraftDocument = async (data: CreateDraftDocumentDTO): Promise<InventoryDocument> => {
    const response = await apiClient.post<InventoryDocument>(`${INVENTORY_DOCUMENTS_URL}`, data);
    return response.data;
};

// Обновление данных документа
export const updateDocument = async (id: number, data: UpdateDocumentDTO): Promise<InventoryDocument> => {
    const response = await apiClient.patch<InventoryDocument>(`${INVENTORY_DOCUMENTS_URL}/${id}`, data);
    return response.data;
};

// Удаление документа
export const deleteDocument = async (id: number): Promise<void> => {
    await apiClient.delete(`${INVENTORY_DOCUMENTS_URL}/${id}`);
};

// Подтверждение документа
export const completeDocument = async (id: number): Promise<InventoryDocument> => {
    const response = await apiClient.post<InventoryDocument>(`${INVENTORY_DOCUMENTS_URL}/${id}/complete`);
    return response.data;
};

// Отмена документа
export const cancelDocument = async (id: number): Promise<InventoryDocument> => {
    const response = await apiClient.post<InventoryDocument>(`${INVENTORY_DOCUMENTS_URL}/${id}/cancel`);
    return response.data;
};

// Получение списка товаров документа
export const getDocumentItems = async (documentId: number): Promise<InventoryDocumentItem[]> => {
    const response = await apiClient.get<InventoryDocumentItem[]>(`${INVENTORY_DOCUMENTS_URL}/${documentId}/items`);
    return response.data;
};

// Добавление товара в документ
export const addDocumentItem = async (documentId: number, data: DocumentItemDTO): Promise<InventoryDocumentItem> => {
    const response = await apiClient.post<InventoryDocumentItem>(`${INVENTORY_DOCUMENTS_URL}/${documentId}/items`, data);
    return response.data;
};

// Обновление товара в документе
export const updateDocumentItem = async (documentId: number, itemId: number, data: UpdateDocumentItemDTO): Promise<InventoryDocumentItem> => {
    const response = await apiClient.patch<InventoryDocumentItem>(
        `${INVENTORY_DOCUMENTS_URL}/${documentId}/items/${itemId}`,
        data
    );
    return response.data;
};

// Удаление товара из документа
export const removeDocumentItem = async (documentId: number, itemId: number): Promise<void> => {
    await apiClient.delete(`${INVENTORY_DOCUMENTS_URL}/${documentId}/items/${itemId}`);
};