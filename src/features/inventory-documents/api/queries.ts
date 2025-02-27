import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {getAllServicesFn} from "@/features/services/api/actions";
import {servicesQueryKeys} from "@/features/services/api/query-keys";
import {ListParams} from "@/types/params";
import {inventoryDocumentsQueryKeys} from "@/features/inventory-documents/api/query-keys";
import {getAllInventoryDocuments} from "@/features/inventory-documents/api/actions";

export const useAllInventoryDocuments = (params: ListParams) => {
    return useQuery({
        queryKey: inventoryDocumentsQueryKeys.list(params),
        queryFn: () => getAllInventoryDocuments(params),
        gcTime: 1000 * 60 * 20,
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData
    })
}
