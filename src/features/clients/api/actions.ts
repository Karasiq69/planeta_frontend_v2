"use server"
import {ClientListParams, ClientListResponse} from "@/features/clients/types/params";
import apiClient from "@/lib/auth/client";
import {IClient} from "@/features/clients/types";

export const getAllClientsListFn = async (params: ClientListParams): Promise<ClientListResponse> => {
    try {
        const res = await apiClient.get<ClientListResponse>(`/clients`, {
            params
        });
        return res.data;
    } catch (e) {
        throw new Error('Failed to fetch clients');
    }
}
export const getClientById = async (id: number): Promise<IClient> => {
    try {
        const res = await apiClient.get<IClient>(`/clients/${id}`);
        return res.data;
    } catch (e) {
        throw new Error('Failed to fetch client');
    }
}