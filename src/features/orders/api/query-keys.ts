import {OrdersQueryParams} from "@/features/orders/types";

export const ordersQueryKeys = {
    all: ['orders'] as const,
    details: () => [...ordersQueryKeys.all, 'order'] as const,
    detail: (id: number) => [...ordersQueryKeys.details(), id] as const,

    lists: () => [...ordersQueryKeys.all, 'list'] as const,
    list: (params: OrdersQueryParams) => [...ordersQueryKeys.lists(), {params}] as const,

    services: (orderId: number) => [...ordersQueryKeys.detail(orderId), 'services'] as const,
    products: (orderId: number) => [...ordersQueryKeys.detail(orderId), 'products'] as const,
    // service: (id: number) => [...ordersQueryKeys.services(), id] as const,

}