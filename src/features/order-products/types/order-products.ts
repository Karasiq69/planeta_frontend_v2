import {Product} from "@/features/products/types";


export type OrderProductStatus = 'ESTIMATED' | 'RESERVED' | 'NEEDS_ORDERING' | 'USED' | 'CANCELLED';

export interface OrderProduct {
    id: number;
    orderId: number;
    productId: number;
    quantity: string;  // decimal as string, e.g. "3.000"
    estimatedPrice: string; // decimal as string, e.g. "3500.00"
    actualPrice: string | null; // может быть null или decimal как string
    status: OrderProductStatus;
    product: Product;
}

// Дополнительно типы для создания/обновления
export interface CreateOrderProduct {
    orderId: number;
    productId: number;
    quantity: string;
    estimatedPrice: string;
}

export interface UpdateOrderProduct {
    quantity?: string;
    estimatedPrice?: string;
    status?: OrderProductStatus;
}