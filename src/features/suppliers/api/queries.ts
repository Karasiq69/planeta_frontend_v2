import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {getActiveSuppliersFn, getAllSuppliersListFn, getSupplierByIdFn} from "./actions";
import {suppliersQueryKeys} from "./query-keys";
import {ListParams} from "@/types/params";

// Хук для получения всех поставщиков
export const useSuppliers = (params: ListParams) => {
    return useQuery({
        queryKey: suppliersQueryKeys.list(params),
        queryFn: () => getAllSuppliersListFn(params),
        staleTime: 5 * 60 * 1000, // 5 минут
        placeholderData: keepPreviousData
    });
};

// Хук для получения только активных поставщиков
export const useActiveSuppliers = () => {
    return useQuery({
        queryKey: suppliersQueryKeys.active(),
        queryFn: () => getActiveSuppliersFn(),
        staleTime: 5 * 60 * 1000, // 5 минут
    });
};

// Хук для получения конкретного поставщика по ID
export const useSupplier = (id: number) => {
    return useQuery({
        queryKey: suppliersQueryKeys.detail(id),
        queryFn: () => getSupplierByIdFn(id),
        enabled: !!id, // Запрос выполняется только если id определен
    });
};