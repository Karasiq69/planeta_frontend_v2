import { InventoryDocumentsQuery } from "../types";

export const inventoryDocumentsQueryKeys = {
    all: ['inventory-documents'] as const,

    // Document keys
    details: () => [...inventoryDocumentsQueryKeys.all, 'document'] as const,
    detail: (id: number) => [...inventoryDocumentsQueryKeys.details(), id] as const,

    // Lists keys
    lists: () => [...inventoryDocumentsQueryKeys.all, 'list'] as const,
    list: (params: InventoryDocumentsQuery) => [...inventoryDocumentsQueryKeys.lists(), { params }] as const,

    // Items keys
    itemsAll: () => [...inventoryDocumentsQueryKeys.all, 'items'] as const,
    items: (documentId: number) => [...inventoryDocumentsQueryKeys.itemsAll(), documentId] as const,
    item: (documentId: number, itemId: number) => [...inventoryDocumentsQueryKeys.items(documentId), itemId] as const,
};