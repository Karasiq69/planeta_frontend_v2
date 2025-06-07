// features/inventory-documents/(receipt)/api/queries.ts
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {receiptDocumentsQueryKeys} from "./query-keys";
import {ReceiptDocumentsQueryParams} from "@/features/inventory-documents/types";
import {
    getReceiptDocumentById,
    getReceiptDocumentItems,
    getReceiptDocuments
} from "@/features/inventory-documents/receipt/api/actions";


// Хук для получения списка приходных документов с пагинацией и фильтрами
export const useReceiptDocuments = (params: ReceiptDocumentsQueryParams) => {
    return useQuery({
        queryKey: receiptDocumentsQueryKeys.list(params),
        queryFn: () => getReceiptDocuments(params),
        gcTime: 1000 * 60 * 20, // 20 минут
        staleTime: 1000 * 60 * 5, // 5 минут
        placeholderData: keepPreviousData
    });
};

// Хук для получения одного приходного документа по ID
export const useReceiptDocument = (id: number) => {
    return useQuery({
        queryKey: receiptDocumentsQueryKeys.detail(id),
        queryFn: () => getReceiptDocumentById(id),
        enabled: !!id
    });
};

// Хук для получения товаров приходного документа
export const useReceiptDocumentItems = (documentId: number) => {
    return useQuery({
        queryKey: receiptDocumentsQueryKeys.items(documentId),
        queryFn: () => getReceiptDocumentItems(documentId),
        enabled: !!documentId
    });
};