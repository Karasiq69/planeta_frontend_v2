import {ICar} from "@/features/cars/types";
import {IClient} from "@/features/clients/types";
import {Product} from "@/features/products/types";
import {Mechanic} from "@/features/mechanics/types";
import {IService} from "@/features/services";

export type OrderStatus = 'created' | 'in_progress' | 'completed' | 'cancelled';


export interface OrderService {
    serviceId: number;
    service: IService;
    assignedMechanicId: number;
    mechanic: Mechanic;
    actualCost: number;
    startTime: string;
    endTime: string | null;
}

export interface OrderProduct {
    productId: number;
    product: Product;
    quantity: number;
    unitPrice: number;
}

export interface Order {
    id: number;
    clientId: number;
    client: IClient;
    carId: number;
    car: ICar;
    status: OrderStatus;
    totalCost: number;
    recommendation: string;
    reasonToApply: string;
    createdAt: string;
    updatedAt: string;
    services: OrderService[];
    products: OrderProduct[];
}


// Query параметры для списка заказов
export interface OrdersQueryParams {
    page?: number;
    pageSize?: number;
    clientId?: number;
    status?: OrderStatus;
}

// Response типы
export interface PaginationMeta {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export interface OrdersListResponse {
    data: Order[];
    meta: PaginationMeta;
}