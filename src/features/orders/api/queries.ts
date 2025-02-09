import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {ordersQueryKeys} from "@/features/orders/api/query-keys";
import {getAllOrdersListFn, getOrderById, getOrderServicesById} from "@/features/orders/api/actions";
import {OrderProduct, OrderService, OrdersQueryParams} from "@/features/orders/types";
import apiClient from "@/lib/auth/client";
import {ORDERS_URL, PRODUCTS_URL, SERVICES_URL} from "@/lib/constants";

export const useOrderById = (orderId?: number) => {
    return useQuery({
        queryKey: ordersQueryKeys.detail(orderId as number),
        queryFn: () => getOrderById(orderId as number),
        enabled: !!orderId,
    })
}

export const useOrderServicesById = (orderId: number) => {
    return useQuery({
        queryKey: ordersQueryKeys.services(orderId),
        queryFn: () => getOrderServicesById(orderId),
        enabled: !!orderId,
    })
}


export const useOrdersList = (params: OrdersQueryParams) => {
    return useQuery({
        queryKey: ordersQueryKeys.list(params),
        queryFn: () => getAllOrdersListFn(params),
        gcTime: 1000 * 60 * 20,
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData
    })
}


export function useOrderServices(id?: number) {
    // const { id } = useParams();
    const getOrderServicesFn = async (id: number) => {
        const response = await apiClient.get<OrderService[]>(`${ORDERS_URL}/${id}${SERVICES_URL}/`);
        return response.data;
    }

    return useQuery<OrderService[], Error>({
        queryKey: ordersQueryKeys.detail(Number(id)),
        queryFn: () => getOrderServicesFn(Number(id)),
        enabled: !!id,
    });
}

export function useOrderProducts(id?: number) {
    // const {id} = useParams();
    const getOrderProductsFn = async (id: number) => {
        const response = await apiClient.get<OrderProduct[]>(`${ORDERS_URL}/${id}${PRODUCTS_URL}/`);
        return response.data;
    }

    return useQuery({
        queryKey: ordersQueryKeys.detail(Number(id)),
        queryFn: () => getOrderProductsFn(Number(id)),
        enabled: !!id,
    });
}