"use server"
import {ClientListParams, ClientListResponse} from "@/features/clients/types/params";
import apiClient from "@/lib/auth/client";

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