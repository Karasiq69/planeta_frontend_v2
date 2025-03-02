import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {ListParams} from "@/types/params";
import {inventoryDocumentsQueryKeys} from "@/features/inventory-documents/api/query-keys";
import {
    getDocumentItems,
    getInventoryDocumentById,
    getInventoryDocuments
} from "@/features/inventory-documents/api/actions";
import {InventoryDocumentsQuery} from "@/features/inventory-documents/types";

// Хук для получения списка документов с пагинацией и фильтрами
export const useInventoryDocuments = (params: InventoryDocumentsQuery) => {
    return useQuery({
        queryKey: inventoryDocumentsQueryKeys.list(params),
        queryFn: () => getInventoryDocuments(params),
        gcTime: 1000 * 60 * 20,
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData
    });
};

// Хук для получения одного документа по ID
export const useInventoryDocument = (id: number) => {
    return useQuery({
        queryKey: inventoryDocumentsQueryKeys.detail(id),
        queryFn: () => getInventoryDocumentById(id),
        enabled: !!id
    });
};

// Хук для получения товаров документа
export const useDocumentItems = (documentId: number) => {
    return useQuery({
        queryKey: inventoryDocumentsQueryKeys.items(documentId),
        queryFn: ()=>getDocumentItems(documentId),
        enabled: !!documentId
    });
};