"use server"

import apiClient from "@/lib/auth/client";
import {ORDER_PRODUCTS_URL, ORDERS_URL, SERVICES_URL} from "@/lib/constants";
import {OrderProduct} from "@/features/order-products/types";


export const getOrderProductsByOrderIdFn = async (orderId: number) => {
    const response = await apiClient.get<OrderProduct[]>(`${ORDER_PRODUCTS_URL}/order/${orderId}`)
    return response.data
}

export const addOrderProductFn = async (orderId: number, productId: number) => {
    const response = await apiClient.post(`${ORDER_PRODUCTS_URL}`, {
        orderId,
        productId
    });
    return response.data;
}