import apiClient from "@/lib/auth/client";
import {MECHANICS_URL} from "@/lib/constants";
import {Mechanic} from "@/features/mechanics/types";


export const getAllMechanicsFn = async () => {
    const response = await apiClient.get<Mechanic[]>(`${MECHANICS_URL}`);
    return response.data
}