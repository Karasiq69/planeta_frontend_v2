"use server"

import apiClient from "@/lib/auth/client";
import {ORDERS_URL} from "@/lib/constants";
import {Order, OrdersListResponse, OrdersQueryParams} from "@/features/orders/types";

export const getOrderById = async (orderId: number) => {
    const response = await apiClient.get<Order>(`${ORDERS_URL}/${orderId}`);
    return response.data
}

export const deleteOrderFn = async (orderId: number) => {

}

export const editOrderFn = async (orderId: number, data: Partial<Order>) => {
    return apiClient.patch(`${ORDERS_URL}/${orderId}`, data)
}

export const getAllOrdersListFn = async (params: OrdersQueryParams): Promise<OrdersListResponse> => {
    const res = await apiClient.get(`${ORDERS_URL}`, {params});
    return res.data
}