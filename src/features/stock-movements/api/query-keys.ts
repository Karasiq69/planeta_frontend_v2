import {ListParams} from "@/types/params";

export const warehouseQueryKeys = {
    all: ['warehouse'] as const,
    details: () => [...warehouseQueryKeys.all, 'warehouse'] as const,
    detail: (id: number) => [...warehouseQueryKeys.details(), id] as const,

    transactions: () => [...warehouseQueryKeys.all, 'transactions'] as const,
    transaction_list: (params: ListParams) => [...warehouseQueryKeys.transactions(), {params}] as const,

    items: () => [...warehouseQueryKeys.all, 'items'] as const,
    items_list: (params: ListParams) => [...warehouseQueryKeys.items(), {params}] as const,
}