import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {createServiceFn} from "@/features/services/api/actions";
import {ServiceFormData} from "@/features/services/components/forms/schema";
import {servicesQueryKeys} from "@/features/services/api/query-keys";
import {addOrderServiceFn} from "@/features/orders/api/actions";
import {ordersQueryKeys} from "@/features/orders/api/query-keys";
import {orderProductsQueryKeys} from "@/features/order-products/api/query-keys";
import {addOrderProductFn} from "@/features/order-products/api/actions";

export function useCreateOrderProduct(orderId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (productId: number) => addOrderProductFn(orderId, productId),
        onSuccess: () => {
            toast.success('Товар добавлен')
        },
        onError: () => {
            toast.error('Произошла ошибка, повторите попытку')
        },
        onSettled: () => {
            // queryClient.invalidateQueries({
            //     queryKey: ordersQueryKeys.all
            // });
            queryClient.invalidateQueries({
                queryKey: orderProductsQueryKeys.all
            });
        },
    })
}

