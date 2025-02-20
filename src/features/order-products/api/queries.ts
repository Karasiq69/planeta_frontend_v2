import {useQuery} from "@tanstack/react-query";
import {orderProductsQueryKeys} from "@/features/order-products/api/query-keys";
import {getOrderProductsByOrderIdFn} from "@/features/order-products/api/actions";

export const useOrderProductsByOrderId = (orderId: number) => {
    return useQuery({
        queryKey: orderProductsQueryKeys.all,
        queryFn: () => getOrderProductsByOrderIdFn(orderId)
    })
}
