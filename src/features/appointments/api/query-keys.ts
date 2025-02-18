import {CarListParams} from "@/features/cars/types";

export const appointmentsQueryKeys = {
    all: ['appointments'] as const,
    details: () => [...appointmentsQueryKeys.all, 'detail'] as const,
    detail: (id: number) => [...appointmentsQueryKeys.details(), id] as const,

    lists: () => [...appointmentsQueryKeys.all, 'list'] as const,
    list: (params: CarListParams) => [...appointmentsQueryKeys.lists(), {params}] as const

}