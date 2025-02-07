import {ClientListParams} from "@/features/clients/types/params";

export const clientQueryKeys = {
    all: ['clients'] as const,
    details: () => [...clientQueryKeys.all, 'detail'] as const,
    detail: (id: number) => [...clientQueryKeys.details(), id] as const,
    lists: () => [...clientQueryKeys.all, 'list'] as const,
    list: (params: ClientListParams) => [...clientQueryKeys.lists(), {params}] as const,
}