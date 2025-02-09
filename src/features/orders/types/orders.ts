import {ICar} from "@/features/cars/types";
import {IClient} from "@/features/clients/types";
import {Product} from "@/features/products/types";
import {IService} from "@/features/services";
import {Mechanic} from "@/features/mechanics/types";

export type OrderStatus =
    | 'application'     // Заявка
    | 'order'           // Заказ-наряд
    | 'in_progress'     // В работе
    | 'waiting_warehouse'  // Ждет склад
    | 'awaiting_payment'   // Ждет оплаты
    | 'completed'       // Завершен
    | 'closed'          // Закрыт/Архив
    | 'cancelled';      // Отменен


export interface OrderProduct {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    appliedPrice: number;
    product: Product;
}

export interface Order {
    id: number;
    clientId?: number;
    client?: IClient;
    carId?: number;
    car?: ICar;
    status: OrderStatus;
    totalCost: number;
    recommendation?: string;
    reasonToApply?: string;
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
    searchTerm?: string | undefined
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


export interface OrderService {
    id: number;
    orderId: number;
    serviceId: number;
    defaultDuration: number;
    appliedRate: number;
    appliedPrice: number;
    discountPercent: number;
    startTime: string | null;
    endTime: string | null;
    service: IService;
    mechanics: OrderServiceMechanic[];
}


export interface OrderServiceMechanic {
    id: number;
    orderServiceId: number;
    mechanicId: number;
    participationPercentage: number;
    paymentType: 'percent' | 'fixed';
    paymentRate: number;
    mechanic: Mechanic;
}