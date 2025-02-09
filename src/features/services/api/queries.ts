import {useQuery} from "@tanstack/react-query";
import {getAllServicesFn} from "@/features/services/api/actions";
import {servicesQueryKeys} from "@/features/services/api/query-keys";

export const useAllServices = () => {
    return useQuery({
        queryKey: servicesQueryKeys.all,
        queryFn: () => getAllServicesFn(),
    })
}
