import {keepPreviousData, useQuery} from "@tanstack/react-query";
 import {getAllClientsListFn, getClientById} from "@/features/clients/api/actions";
import {ClientListParams} from "@/features/clients/types/params";
import {clientQueryKeys} from "@/features/clients/api/query-keys";



export const useClientsList = (params: ClientListParams) => {
    return useQuery({
        queryKey: clientQueryKeys.list(params),
        queryFn: ()=>getAllClientsListFn(params),
        gcTime: 1000 * 60 * 20,
        staleTime:1000 * 60 * 5,
        placeholderData: keepPreviousData
    })
}

export const useClientById = (id?: number) => {
    return useQuery({
        queryKey: clientQueryKeys.detail(id as number),
        queryFn: () => getClientById(id as number),
        enabled: !!id
    })
}
