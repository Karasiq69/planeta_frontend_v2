import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {clientQueryKeys} from "@/features/clients/api/query-keys";
import {getAllClientsListFn} from "@/features/clients/api/actions";
import {ClientListParams} from "@/features/clients/types/params";



export const useClientsList = (params: ClientListParams) => {

    return useQuery({
        queryKey: clientQueryKeys.list(params),
        queryFn: ()=>getAllClientsListFn(params),
        gcTime: 1000 * 60 * 20,
        staleTime:1000 * 60 * 5,
        placeholderData: keepPreviousData
    })
}
