import {useQuery} from "@tanstack/react-query";
import {mechanicsQueryKeys} from "@/features/mechanics/api/query-keys";
import {getAllMechanicsFn} from "@/features/mechanics/api/actions";

export const useAllMechanics = () => {
    return useQuery({
        queryKey: mechanicsQueryKeys.all,
        queryFn: () => getAllMechanicsFn(),
    })
}
