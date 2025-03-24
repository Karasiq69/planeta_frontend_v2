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
    // Создаем экземпляр URLSearchParams для корректного формирования параметров
    const urlParams = new URLSearchParams();

    // Добавляем основные параметры
    if (params.page) urlParams.append('page', params.page.toString());
    if (params.pageSize) urlParams.append('pageSize', params.pageSize.toString());
    if (params.searchTerm) urlParams.append('searchTerm', params.searchTerm);

    // Обрабатываем статусы из filters, если они есть
    if (params.filters && params.filters.status && Array.isArray(params.filters.status)) {
        params.filters.status.forEach((status: string) => {
            urlParams.append('status', status);
        });
    }

    // Если передан одиночный статус напрямую (для обратной совместимости)
    if (params.status) {
        urlParams.append('status', params.status);
    }

    // Выполняем запрос с корректно сформированными параметрами
    const res = await apiClient.get(`${ORDERS_URL}`, {params: urlParams});
    return res.data;
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


export const editOrderServiceFn = async (orderServiceId: number, data: Partial<OrderService>) => {
    const response = await apiClient.patch(`${ORDERS_URL}${SERVICES_URL}/${orderServiceId}`, data)
    return response.data
}
export const updateMechanicOrderServiceFn = async (orderServiceId: number, mechanicId: number, data: Partial<OrderServiceMechanic>) => {
    const response = await apiClient.patch(`${ORDERS_URL}${SERVICES_URL}/${orderServiceId}${MECHANICS_URL}/${mechanicId}`,
        data)
    return response.data;
}
