import {Warehouse, WarehouseItem} from "@/features/warehouse/types";
import {User} from "@/types";
import {Supplier} from "@/features/suppliers/types";
import {Organization} from "@/features/organizations/types";
import {Product} from "@/features/products/types";

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
    supplier?: Supplier;
    orderId?: number;
    userId: number;
    user: User;
    note?: string;
    warehouse?: Warehouse;
    targetWarehouse?: Warehouse;
    organization?: Organization;
    organizationId?: number;
    totalAmount?: number;
    items: DocumentItem[];

    createdAt: string;
    updatedAt: string;
    completedAt?: string;

}

// Расширенный тип для товара с дополнительной информацией
// export interface DocumentItem {
//     id: number;
//     documentId: number;
//     warehouseItemId: number;
//     quantity: string | number;
//     fromStorageLocationId?: number | null; // Добавлен null
//     toStorageLocationId?: number | null;   // Добавлен null
//     note?: string | null;                  // Добавлен null
//     createdAt: string;
//     updatedAt: string;
//     userId: number;
//     warehouseItem: WarehouseItem;
// }

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

export interface InventoryDocumentDetails {
    document: InventoryDocument;
    items: DocumentItem[];
}

export interface DocumentItem {
    id: number;
    documentId: number;
    productId: number;
    quantity: string;
    fromStorageLocationId: number | null;
    toStorageLocationId: number | null;
    note: string | null;
    product: Product;
    fromStorageLocation: string | number;
    toStorageLocation: string | number;
    createdBy: User;

    markupPercentage: number | null;
    price: number;
    totalPrice: number;

    createdAt: string;
    updatedAt: string;
    createdById: number;
}

// DTO для создания черновика документа
export interface CreateDraftDocumentDTO {
    type: InventoryDocumentType;
    warehouseId: number;
    targetWarehouseId?: number;
}

// DTO для обновления документа
export interface UpdateDocumentDTO {
    type?: InventoryDocumentType;
    status?: InventoryDocumentStatus;
    number?: string;
    warehouseId?: number;
    targetWarehouseId?: number;
    incomingNumber?: string;
    incomingDate?: Date | string;
    supplierId?: number;
    orderId?: number;
    note?: string;
    organizationId?: number;
    totalAmount?: number;
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


// Полная информация о документе со всеми товарами
