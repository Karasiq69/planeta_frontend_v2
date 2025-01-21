"use server"
import axios from "axios";
import {ClientListParams, ClientListResponse} from "@/features/clients/types/params";

export const getAllClientsListFn = async (params: ClientListParams): Promise<ClientListResponse> => {
    try {
        const res = await axios.get<ClientListResponse>(`http://localhost:8000/api/clients/`, {
            withCredentials: true,
            params
        });
        return res.data;
    } catch (e) {
        throw new Error('Failed to fetch clients');
    }
}