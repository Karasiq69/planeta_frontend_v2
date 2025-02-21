import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {orderProductsQueryKeys} from "@/features/order-products/api/query-keys";
import {addOrderProductFn} from "@/features/order-products/api/actions";
import apiClient from "@/lib/auth/client";
import {ORDER_PRODUCTS_URL} from "@/lib/constants";
import {ordersQueryKeys} from "@/features/orders/api/query-keys";

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
                queryKey: ordersQueryKeys.products(orderId)
            });
        },
    })
}


export function useDeleteOrderProduct(orderId: number) {
    const queryClient = useQueryClient();

    const deleteOrderProductFn = async (productId: number) => {
        const response = await apiClient.delete(`${ORDER_PRODUCTS_URL}/${productId}`);
        return response.data
    }

    return useMutation({
        mutationFn: deleteOrderProductFn,
        onSuccess: () => {
            toast.success('Товар удален')
        },
        onError: (error) => {
            toast.error(error.message)
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ordersQueryKeys.products(orderId)
            });
        },
    })

}