import {useParams} from "next/navigation";
import {useMutation, useQueryClient} from "@tanstack/react-query";
 import {toast} from "sonner";
import {ordersQueryKeys} from "@/features/orders/api/query-keys";
import {Order} from "@/features/orders/types";
import apiClient from "@/lib/auth/client";
import {ORDERS_URL} from "@/lib/constants";

export function useEditOrder() {
    const {id} = useParams();
    const queryClient = useQueryClient();

    const editOrderFn = async (updatedOrder: Partial<Order>) => {
        const response = await apiClient.patch<Order>(`${ORDERS_URL}/${id}/`, updatedOrder);
        return response.data;
    }

    return useMutation({
        mutationFn: editOrderFn,
        onSuccess: () => {
            toast.success('Заказ изменен')
        },
        onError: () => {
            toast.error('Произошла ошибка, повторите попытку')
        },
        onSettled: () => {

            queryClient.invalidateQueries({
                queryKey: ordersQueryKeys.all
            });
            queryClient.invalidateQueries({
                queryKey: ordersQueryKeys.detail(Number(id))
            });
        },
    })
}