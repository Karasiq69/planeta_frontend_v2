import {ProductsListParams} from "@/features/products/types/params";

export const productsQueryKeys = {
    all: ['products'] as const,
    details: () => [...productsQueryKeys.all, 'detail'] as const,
    detail: (id: number) => [...productsQueryKeys.details(), id] as const,
    lists: () => [...productsQueryKeys.all, 'list'] as const,
    list: (params: ProductsListParams) => [...productsQueryKeys.lists(), {params}] as const,
}