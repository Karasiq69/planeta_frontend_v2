import {ClientListParams, ClientListResponse} from "@/features/clients/types/params";
import apiClient from "@/lib/auth/client";
import {IClient} from "@/features/clients/types";
import {CLIENTS_URL} from "@/lib/constants";

export const getAllClientsListFn = async (params: ClientListParams): Promise<ClientListResponse> => {
    const res = await apiClient.get<ClientListResponse>(`${CLIENTS_URL}`, {
        params
    });
    return res.data;

}
export const getClientById = async (id: number): Promise<IClient> => {
    const res = await apiClient.get<IClient>(`${CLIENTS_URL}/${id}`);
    return res.data;
}