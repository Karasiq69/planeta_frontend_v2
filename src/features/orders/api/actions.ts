"use server"

import apiClient from "@/lib/auth/client";
import {MECHANICS_URL, ORDERS_URL, SERVICES_URL} from "@/lib/constants";
import {
    Order,
    OrderService,
    OrderServiceMechanic,
    OrdersListResponse,
    OrdersQueryParams
} from "@/features/orders/types";

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

export const getOrderServicesById = async (orderId: number) => {
    const response = await apiClient.get<OrderService[]>(`${ORDERS_URL}/${orderId}${SERVICES_URL}`);
    return response.data
}

export const deleteOrderServiceFn = async (id: number) => {
    const response = await apiClient.delete(`${ORDERS_URL}${SERVICES_URL}/${id}`)
    return response.data
}

export const addMechanicOrderServiceFn = async (orderServiceId: number, mechanicId: number) => {
    const response = await apiClient.post(`${ORDERS_URL}${SERVICES_URL}/${orderServiceId}${MECHANICS_URL}`, {mechanicId})
    return response.data;
}

export const deleteMechanicOrderServiceFn = async (orderServiceId: number, mechanicId: number) => {
    const response = await apiClient.delete(`${ORDERS_URL}${SERVICES_URL}/${orderServiceId}${MECHANICS_URL}/${mechanicId}`)
    return response.data
}

export const addOrderServiceFn = async (orderId: number, serviceId: number) => {
    const response = await apiClient.post(`${ORDERS_URL}/${orderId}${SERVICES_URL}`, {serviceId: serviceId});
    return response.data;
}

export const updateMechanicOrderServiceFn = async (orderServiceId: number, mechanicId: number, data: Partial<OrderServiceMechanic>) => {
    console.log('RESPONSEE::::url', `${ORDERS_URL}${SERVICES_URL}/${orderServiceId}${MECHANICS_URL}/${mechanicId}`)
    console.log(data, 'DATAAAAA::::')
    const response = await apiClient.patch(`${ORDERS_URL}${SERVICES_URL}/${orderServiceId}${MECHANICS_URL}/${mechanicId}`,
        data)
    return response.data;
}
