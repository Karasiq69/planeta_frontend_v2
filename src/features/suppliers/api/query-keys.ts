import { ListParams } from "@/types/params";

export const suppliersQueryKeys = {
    all: ['suppliers'] as const,

    lists: () => [...suppliersQueryKeys.all, 'list'] as const,
    list: (params?: ListParams) => [...suppliersQueryKeys.lists(), { params }] as const,

    details: () => [...suppliersQueryKeys.all, 'detail'] as const,
    detail: (id: number) => [...suppliersQueryKeys.details(), id] as const,

    active: () => [...suppliersQueryKeys.all, 'active'] as const,
};