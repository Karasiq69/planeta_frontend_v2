import apiClient from "@/lib/auth/client";
import {ListResponse} from "@/types/params";
import {RECEIPT_DOCUMENTS_URL} from "@/lib/constants";
import {
    CreateReceiptDocumentDto,
    ReceiptDocument,
    ReceiptDocumentItem,
    ReceiptDocumentsQueryParams,
    ReceiptItemDto,
    UpdateReceiptDocumentDto
} from "@/features/inventory-documents/types";

// Получение списка приходных документов с пагинацией и фильтрами
export const getReceiptDocuments = async (params: ReceiptDocumentsQueryParams): Promise<ListResponse<ReceiptDocument>> => {
    const response = await apiClient.get<ListResponse<ReceiptDocument>>(RECEIPT_DOCUMENTS_URL, {
        params
    });
    return response.data;
};

// Получение одного приходного документа по ID со всеми товарами
export const getReceiptDocumentById = async (id: number): Promise<ReceiptDocument> => {
    const response = await apiClient.get<ReceiptDocument>(`${RECEIPT_DOCUMENTS_URL}/${id}`);
    return response.data;
};

// Создание нового приходного документа
export const createReceiptDocument = async (data: CreateReceiptDocumentDto): Promise<ReceiptDocument> => {
    const response = await apiClient.post<ReceiptDocument>(RECEIPT_DOCUMENTS_URL, data);
    return response.data;
};

// Обновление данных приходного документа
export const updateReceiptDocument = async (id: number, data: UpdateReceiptDocumentDto): Promise<ReceiptDocument> => {
    const response = await apiClient.patch<ReceiptDocument>(`${RECEIPT_DOCUMENTS_URL}/${id}`, data);
    return response.data;
};

// Удаление приходного документа
export const deleteReceiptDocument = async (id: number): Promise<void> => {
    const response = await apiClient.delete(`${RECEIPT_DOCUMENTS_URL}/${id}`);
    return response.data
};

// Подтверждение приходного документа
export const completeReceiptDocument = async (id: number): Promise<ReceiptDocument> => {
    const response = await apiClient.post<ReceiptDocument>(`${RECEIPT_DOCUMENTS_URL}/${id}/complete`);
    return response.data;
};

// Отмена приходного документа
export const cancelReceiptDocument = async (id: number): Promise<ReceiptDocument> => {
    const response = await apiClient.post<ReceiptDocument>(`${RECEIPT_DOCUMENTS_URL}/${id}/cancel`);
    return response.data;
};

// Получение списка товаров приходного документа
export const getReceiptDocumentItems = async (documentId: number): Promise<ReceiptDocumentItem[]> => {
    const response = await apiClient.get<ReceiptDocumentItem[]>(`${RECEIPT_DOCUMENTS_URL}/${documentId}/items`);
    return response.data;
};

// Добавление товара в приходной документ
export const addReceiptDocumentItem = async (documentId: number, data: ReceiptItemDto): Promise<ReceiptDocumentItem> => {
    const response = await apiClient.post<ReceiptDocumentItem>(`${RECEIPT_DOCUMENTS_URL}/${documentId}/items`, data);
    return response.data;
};

// Обновление товара в приходном документе
export const updateReceiptDocumentItem = async (documentId: number, itemId: number, data: Partial<ReceiptItemDto>): Promise<ReceiptDocumentItem> => {
    const response = await apiClient.patch<ReceiptDocumentItem>(
        `${RECEIPT_DOCUMENTS_URL}/${documentId}/items/${itemId}`,
        data
    );
    return response.data;
};

// Удаление товара из приходного документа
export const removeReceiptDocumentItem = async (itemId: number): Promise<void> => {
    await apiClient.delete(`${RECEIPT_DOCUMENTS_URL}/${itemId}`);
};