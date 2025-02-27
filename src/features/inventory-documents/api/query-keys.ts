import {ListParams} from "@/types/params";

export const inventoryDocumentsQueryKeys = {
    all: ['inventory-documents'] as const,
    details: () => [...inventoryDocumentsQueryKeys.all, 'document'] as const,
    detail: (id: number) => [...inventoryDocumentsQueryKeys.details(), id] as const,

    lists: () => [...inventoryDocumentsQueryKeys.all, 'list'] as const,
    list: (params: ListParams) => [...inventoryDocumentsQueryKeys.lists(), {params}] as const
}