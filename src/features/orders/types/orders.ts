import {ICar} from "@/features/cars/types";
import {IClient} from "@/features/clients/types";
import {Mechanic} from "@/features/mechanics/types";
import {IService} from "@/features/services/types";
import {User} from "@/types";

export type OrderStatus =
    | 'application'     // Заявка
    | 'order'           // Заказ-наряд
    | 'in_progress'     // В работе
    | 'waiting_warehouse'  // Ждет склад
    | 'awaiting_payment'   // Ждет оплаты
    | 'completed'       // Завершен
    | 'closed'          // Закрыт/Архив
    | 'cancelled';      // Отменен


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
    createdById: number;
    creator: User
}


// Query параметры для списка заказов
export interface OrdersQueryParams {
    page?: number;
    pageSize?: number;
    clientId?: number;
    status?: OrderStatus;
    searchTerm?: string | undefined;
    filters?: {
        status?: string[];
        [key: string]: unknown;
    };
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