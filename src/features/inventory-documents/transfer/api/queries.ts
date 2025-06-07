import {transferDocumentsQueryKeys} from "@/features/inventory-documents/transfer/api/query-keys";
import {getTransferDocumentById, getTransferDocumentsFn} from "@/features/inventory-documents/transfer/api/actions";
import {TransferDocumentsQueryParams} from "@/features/inventory-documents/transfer/types";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {receiptDocumentsQueryKeys} from "@/features/inventory-documents/receipt/api/query-keys";
import {getReceiptDocumentById} from "@/features/inventory-documents/receipt/api/actions";
import {TransferDocumentItem} from "../types";
import apiClient from "@/lib/auth/client";
import {TRANSFER_DOCUMENTS_URL} from "@/lib/constants";

export const useTransferDocuments = (params: TransferDocumentsQueryParams) => {
    return useQuery({
        queryKey: transferDocumentsQueryKeys.list(params),
        queryFn: () => getTransferDocumentsFn(params),
        gcTime: 1000 * 60 * 20, // 20 минут
        staleTime: 1000 * 60 * 5, // 5 минут
        placeholderData: keepPreviousData
    });
};

export const useTransferDocument = (id: number) => {
    return useQuery({
        queryKey: receiptDocumentsQueryKeys.detail(id),
        queryFn: () => getTransferDocumentById(id),
        enabled: !!id
    });
};

export const useTransferDocumentItems = (documentId: number) => {
    return useQuery({
        queryKey: transferDocumentsQueryKeys.items(documentId),
        queryFn: async () => {
            const response = await apiClient.get<TransferDocumentItem[]>(`${TRANSFER_DOCUMENTS_URL}/${documentId}/items`);
            return response.data;
        }
    });
};
