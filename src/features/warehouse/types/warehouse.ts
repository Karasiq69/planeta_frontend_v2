import {Product} from "@/features/products/types";

export interface Warehouse {
    id: number;
    name: string;
    description: string | null;
    isActive: boolean;
    createdAt: string;
}

// Типы для товаров на складе
export interface WarehouseItem {
    id: number;
    productId: number;
    warehouseId: number;
    quantity: string;
    reservedQuantity: string;
    minimumQuantity: string;
    updatedAt: string;
    // Связанные данные
    product?: Product;
    warehouse?: Warehouse;
}

// Типы для складских транзакций
export interface InventoryTransaction {
    id: number;
    warehouseItemId: number;
    orderId: number | null;
    type: 'RECEIPT' | 'RESERVED' | 'WRITE_OFF' | 'RETURN' | 'INVENTORY' | 'TRANSFER';
    quantity: string;
    userId: number;
    createdAt: string;
    note: string | null;
    // Связанные данные
    warehouseItem?: WarehouseItem;
}

export const TRANSACTION_TYPE_LABELS: Record<InventoryTransaction['type'], string> = {
    'RECEIPT': 'Поступление',
    'RESERVED': 'Резервирование',
    'WRITE_OFF': 'Списание',
    'RETURN': 'Возврат',
    'INVENTORY': 'Инвентаризация',
    'TRANSFER': 'Перемещение'
};

// Типы для запросов
export interface AddWarehouseItemRequest {
    productId: number;
    warehouseId: number;
    quantity: number;
    note?: string;
}

// Типы для параметров запроса транзакций
export interface GetTransactionsParams {
    page?: number;
    limit?: number;
    searchTerm?: string;
    userId?: number;
}

// Тип для ответа при добавлении товара
export interface AddWarehouseItemResponse {
    warehouseItem: WarehouseItem;
    transaction: InventoryTransaction;
}