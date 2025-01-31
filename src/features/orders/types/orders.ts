import {ICar} from "@/features/cars/types";
import {IClient} from "@/features/clients/types";
import {Product} from "@/features/products/types";
import {IService} from "@/features/services";

export type OrderStatus =
    | 'application'     // Заявка
    | 'order'           // Заказ-наряд
    | 'in_progress'     // В работе
    | 'waiting_warehouse'  // Ждет склад
    | 'awaiting_payment'   // Ждет оплаты
    | 'completed'       // Завершен
    | 'closed'          // Закрыт/Архив
    | 'cancelled';      // Отменен

export interface OrderService {
    id: number
    serviceId: number
    service: IService
    defaultDuration: number
    appliedRate: number
    appliedPrice: number
    discountPercent?: number
    startTime?: Date
    endTime?: Date
}

export interface OrderProduct {
    id: number
    productId: number
    product: Product
    quantity: number
    appliedPrice: number
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