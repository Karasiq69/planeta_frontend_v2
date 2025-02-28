import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {ListParams} from "@/types/params";
import {inventoryDocumentsQueryKeys} from "@/features/inventory-documents/api/query-keys";
import {getAllInventoryDocuments, getInventoryDocumentByIdFn} from "@/features/inventory-documents/api/actions";

export const useAllInventoryDocuments = (params: ListParams) => {
    return useQuery({
        queryKey: inventoryDocumentsQueryKeys.list(params),
        queryFn: () => getAllInventoryDocuments(params),
        gcTime: 1000 * 60 * 20,
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData
    })
}


export const useInventoryDocumentById = (id: number) => {
    return useQuery({
        queryKey: inventoryDocumentsQueryKeys.detail(id),
        queryFn: () => getInventoryDocumentByIdFn(id),
        enabled: !!id
    })
}