import {ListParams} from "@/types/params";

export const orderProductsQueryKeys = {
    all: ['order-products'] as const,
    details: () => [...orderProductsQueryKeys.all, 'product'] as const,
    detail: (id: number) => [...orderProductsQueryKeys.details(), id] as const,

    lists: () => [...orderProductsQueryKeys.all, 'list'] as const,
    list: (params: ListParams) => [...orderProductsQueryKeys.lists(), {params}] as const
}