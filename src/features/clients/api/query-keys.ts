import {CarListParams} from "@/features/vehicles/types/params";

export const clientQueryKeys = {
    all: ['vehicle'] as const,
    details: () => [...clientQueryKeys.all, 'detail'] as const,
    detail: (id: number) => [...clientQueryKeys.details(), id] as const,
    lists: () => [...clientQueryKeys.all, 'list'] as const,
    list: (params: CarListParams) => [...clientQueryKeys.lists(), {params}] as const,
}