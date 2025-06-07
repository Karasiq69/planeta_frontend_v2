import {InventoryDocumentType, ReceiptDocumentsQueryParams} from "@/features/inventory-documents/types";

export const receiptDocumentsQueryKeys = {
    all: ['inventory-documents', InventoryDocumentType.RECEIPT] as const,

    // Document keys
    details: () => [...receiptDocumentsQueryKeys.all, 'document'] as const,
    detail: (id: number) => [...receiptDocumentsQueryKeys.details(), id] as const,

    // Lists keys
    lists: () => [...receiptDocumentsQueryKeys.all, 'list'] as const,
    list: (params: ReceiptDocumentsQueryParams) => [...receiptDocumentsQueryKeys.lists(), { params }] as const,

    // Items keys
    itemsAll: () => [...receiptDocumentsQueryKeys.all, 'items'] as const,
    items: (documentId: number) => [...receiptDocumentsQueryKeys.itemsAll(), documentId] as const,
    item: (documentId: number, itemId: number) => [...receiptDocumentsQueryKeys.items(documentId), itemId] as const,
};