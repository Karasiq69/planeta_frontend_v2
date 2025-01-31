"use server"

import apiClient from "@/lib/auth/client";
import {ORDERS_URL} from "@/lib/constants";
import {Order} from "@/features/orders/types";

export const getOrderById = async (orderId: number) => {
    const response = await apiClient.get<Order>(`${ORDERS_URL}/${orderId}`);
    return response.data
}

export const deleteOrderFn = async (orderId: number) => {

}

export const editOrderFn = async (orderId: number, data: Partial<Order>) => {
    const response = apiClient.patch(`${ORDERS_URL}/${orderId}`, data)
    return response
}