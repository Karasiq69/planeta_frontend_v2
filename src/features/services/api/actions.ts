"use server"

import apiClient from "@/lib/auth/client";
import {SERVICES_URL} from "@/lib/constants";
import {IService} from "@/features/services";
import {ListParams, ListResponse} from "@/types/params";


export const getAllServicesFn = async (params: ListParams): Promise<ListResponse<IService>> => {
    const response = await apiClient.get<ListResponse<IService>>(`${SERVICES_URL}`, {
        params
    });
    return response.data
}