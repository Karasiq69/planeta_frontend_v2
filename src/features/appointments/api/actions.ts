"use server"
import apiClient from "@/lib/auth/client";
import {APPOINTMENTS_URL} from "@/lib/constants";

export const getAppointmentsFn = async () => {
    const response = await apiClient.get(APPOINTMENTS_URL);
    return response.data;
}