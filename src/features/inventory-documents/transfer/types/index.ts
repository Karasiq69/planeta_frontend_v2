import {User} from "@/types";
import {Organization} from "@/features/organizations/types";
import {StorageLocation, Warehouse} from "@/features/warehouse/types";
import {InventoryDocumentStatus, InventoryDocumentType} from "@/features/inventory-documents/types";
import {Product} from "@/features/products/types";

export interface TransferDocument {
    // Базовые поля документа
    id: number;
    number: string | null;
    date: string;
    userId: number;
    status: InventoryDocumentStatus
    type: InventoryDocumentType;
    warehouseId: number | null;
    totalAmount: string;
    organizationId: number | null;
    operationType: OperationTypeEnum;
    note: string | null;
    createdAt: string;
    completedAt: string | null;
    updatedAt: string;

    // Связанные объекты
    user: User;
    organization: Organization | null;
    warehouse: Warehouse | null;

    transferDocument: TransferDocumentExt
    items: TransferDocumentItem[]
}


// todo fix
export interface TransferDocumentItem {
    id: number;
    documentId: number;
    productId: number;
    quantity: string;
    price?: string | null;
    totalPrice?: string | null;
    toStorageLocationId?: number | null;
    note?: string | null;
    createdById: number;
    createdAt: string;
    updatedAt: string;

    // Связанные объекты
    product: Product;
    toStorageLocation?: StorageLocation | null;
    createdBy: User;
}


export interface TransferDocumentExt {
    id: number
    documentId: number
    sourceWarehouseId: number,
    sourceLocationId?: number,
    destinationWarehouseId?: number,
    destinationLocationId?: number,
    relatedOrderId?: number
}

export interface TransferDocumentsQueryParams {
    page?: number;
    limit?: number;
    status?: InventoryDocumentStatus;
    warehouseId?: number;
    supplierId?: number;
    orderId?: number;
    organizationId?: number;
    dateFrom?: string;
    dateTo?: string;
    searchTerm?: string;
}

export interface TransferItemDto {
    productId: number;
    quantity: string;
    price?: string;
    toStorageLocationId?: number;
    note?: string;
}


export const OperationType = {
    TRANSFER: 'TRANSFER',                    // Перемещение
    WRITE_OFF: 'WRITE_OFF',                 // Списание
    SEND_TO_REPAIR: 'SEND_TO_REPAIR',       // Передача в ремонт (основное)
    TRANSFER_IN_REPAIR: 'TRANSFER_IN_REPAIR', // Передача внутри ремонта
    RETURN_FROM_REPAIR: 'RETURN_FROM_REPAIR', // Возврат из ремонта
    RETURN_FROM_OPERATION: 'RETURN_FROM_OPERATION' // Возврат из эксплуатации
} as const

export type OperationTypeEnum = (typeof OperationType)[keyof typeof OperationType];