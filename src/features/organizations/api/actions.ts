import apiClient from "@/lib/auth/client";
import { ORGANIZATIONS_URL } from "@/lib/constants";
import { ListParams, ListResponse } from "@/types/params";
import {Organization} from "@/features/organizations/types";

// Получить список всех организаций
export const getAllOrganizationsFn = async (): Promise<ListResponse<Organization>> => {
    const response = await apiClient.get<ListResponse<Organization>>(ORGANIZATIONS_URL);
    return response.data;
};

export const getAllOrganizationsListFn = async (params: ListParams): Promise<ListResponse<Organization>> => {
    const res = await apiClient.get<ListResponse<Organization>>(ORGANIZATIONS_URL, {
        params
    });
    return res.data;
};

// Получить организацию по ID
export const getOrganizationByIdFn = async (id: number): Promise<Organization> => {
    const response = await apiClient.get<Organization>(`${ORGANIZATIONS_URL}/${id}`);
    return response.data;
};

// Создать новую организацию
export const createOrganizationFn = async (data: Partial<Organization>): Promise<Organization> => {
    const response = await apiClient.post<Organization>(ORGANIZATIONS_URL, data);
    return response.data;
};

// Обновить существующую организацию
export const updateOrganizationFn = async (id: number, data: Partial<Organization>): Promise<Organization> => {
    const response = await apiClient.put<Organization>(`${ORGANIZATIONS_URL}/${id}`, data);
    return response.data;
};

// Удалить организацию
export const deleteOrganizationFn = async (id: number): Promise<void> => {
    await apiClient.delete(`${ORGANIZATIONS_URL}/${id}`);
};