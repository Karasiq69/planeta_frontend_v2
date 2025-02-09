"use server"

import apiClient from "@/lib/auth/client";
import {MECHANICS_URL, SERVICES_URL} from "@/lib/constants";
import {Mechanic} from "@/features/mechanics/types";
import {IService} from "@/features/services";


export const getAllServicesFn = async () => {
    const response = await apiClient.get<IService[]>(`${SERVICES_URL}`);
    return response.data
}