import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {getAllServicesFn} from "@/features/services/api/actions";
import {servicesQueryKeys} from "@/features/services/api/query-keys";
import {ListParams} from "@/types/params";

export const useAllServices = (params: ListParams) => {
    return useQuery({
        queryKey: servicesQueryKeys.list(params),
        queryFn: () => getAllServicesFn(params),
        gcTime: 1000 * 60 * 20,
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData
    })
}
