import {Warehouse, WarehouseItem} from "@/features/warehouse/types";
import {User} from "@/types";

export const InventoryDocumentType = {
    RECEIPT: 'RECEIPT',
    EXPENSE: 'EXPENSE',
    RETURN: 'RETURN',
    TRANSFER: 'TRANSFER',
    WRITE_OFF: 'WRITE_OFF',
    INVENTORY: 'INVENTORY'
} as const;

export type InventoryDocumentType = (typeof InventoryDocumentType)[keyof typeof InventoryDocumentType];

export const InventoryDocumentStatus = {
    DRAFT: 'DRAFT',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED'
} as const;

export type InventoryDocumentStatus = (typeof InventoryDocumentStatus)[keyof typeof InventoryDocumentStatus];


// Основной документ
export interface InventoryDocument {
    id: number;
    type: InventoryDocumentType;
    status: InventoryDocumentStatus;
    number?: string;
    warehouseId: number;
    targetWarehouseId?: number;
    incomingNumber?: string;
    incomingDate?: string;
    supplierId?: number;
    orderId?: number;
    userId: number;
    user: User;
    note?: string;
    createdAt: string;
    updatedAt: string;
    completedAt?: string;
    warehouse?: Warehouse;
    targetWarehouse?: Warehouse;
}

// Параметры для запроса списка документов
export interface InventoryDocumentsQuery {
    page?: number;
    limit?: number; // Переименовано с pageSize для соответствия бэкенду
    type?: InventoryDocumentType;
    status?: InventoryDocumentStatus;
    warehouseId?: number;
    orderId?: number;
    dateFrom?: string;
    dateTo?: string;
    searchTerm?: string;
}

// DTO для создания черновика документа
export interface CreateDraftDocumentDTO {
    type: InventoryDocumentType;
    warehouseId: number;
    targetWarehouseId?: number;
}

// DTO для обновления документа
export interface UpdateDocumentDTO {
    warehouseId?: number;
    targetWarehouseId?: number;
    orderId?: number;
    number?: string;
    note?: string;
    supplierId?: number;
    incomingNumber?: string;
    incomingDate?: Date | string;
}

// DTO для добавления товара в документ
export interface DocumentItemDTO {
    productId: number;
    quantity: number;
    fromStorageLocationId?: number;
    toStorageLocationId?: number;
    note?: string;
}

// DTO для обновления товара в документе
export interface UpdateDocumentItemDTO {
    quantity?: number;
    fromStorageLocationId?: number;
    toStorageLocationId?: number;
    note?: string;
}

// Расширенный тип для товара с дополнительной информацией
export interface InventoryDocumentItem {
    id: number;
    documentId: number;
    warehouseItemId: number;
    quantity: string | number;
    fromStorageLocationId?: number | null; // Добавлен null
    toStorageLocationId?: number | null;   // Добавлен null
    note?: string | null;                  // Добавлен null
    createdAt: string;
    updatedAt: string;
    userId: number;
    warehouseItem: WarehouseItem;
}

// Полная информация о документе со всеми товарами
export interface InventoryDocumentDetails {
    document: InventoryDocument;
    items: InventoryDocumentItem[];
}

// Для удобства использования в компонентах, объединим информацию о товаре
export interface InventoryDocumentProductItem {
    id: number; // ID транзакции
    productId: number;
    productName: string;
    partNumber?: string;
    brandName?: string;
    quantity: number;
    fromStorageLocationId?: number;
    toStorageLocationId?: number;
    note?: string;
}