import apiClient from "@/lib/auth/client";
import {SUPPLIER_URL} from "@/lib/constants";
import {ListParams, ListResponse} from "@/types/params";
import {Supplier} from "@/features/suppliers/types";

// Получить список всех поставщиков
export const getAllSuppliersFn = async (): Promise<ListResponse<Supplier>> => {
    const response = await apiClient.get<ListResponse<Supplier>>(SUPPLIER_URL);
    return response.data;
};

export const getAllSuppliersListFn = async (params: ListParams): Promise<ListResponse<Supplier>> => {
    const res = await apiClient.get<ListResponse<Supplier>>(SUPPLIER_URL, {
        params
    });
    return res.data;

}

// Получить поставщика по ID
export const getSupplierByIdFn = async (id: number): Promise<Supplier> => {
    const response = await apiClient.get<Supplier>(`${SUPPLIER_URL}/${id}`);
    return response.data;
};

// Создать нового поставщика
export const createSupplierFn = async (data: Partial<Supplier>): Promise<Supplier> => {
    const response = await apiClient.post<Supplier>(SUPPLIER_URL, data);
    return response.data;
};

// Обновить существующего поставщика
export const updateSupplierFn = async (id: number, data: Partial<Supplier>): Promise<Supplier> => {
    const response = await apiClient.patch<Supplier>(`${SUPPLIER_URL}/${id}`, data);
    return response.data;
};

// Удалить поставщика
export const deleteSupplierFn = async (id: number): Promise<void> => {
    await apiClient.delete(`${SUPPLIER_URL}/${id}`);
};

// Получить только активных поставщиков
export const getActiveSuppliersFn = async (): Promise<ListResponse<Supplier>> => {
    const response = await apiClient.get<ListResponse<Supplier>>(`${SUPPLIER_URL}?isActive=true`);
    return response.data;
};