import {useQuery} from "@tanstack/react-query";
import {ordersQueryKeys} from "@/features/orders/api/query-keys";
import {getOrderById} from "@/features/orders/api/actions";

export const useOrderById = (orderId?: number) => {
    return useQuery({
        queryKey: ordersQueryKeys.detail(orderId as number),
        queryFn: () => getOrderById(orderId as number),
        enabled: !!orderId,
    })
}