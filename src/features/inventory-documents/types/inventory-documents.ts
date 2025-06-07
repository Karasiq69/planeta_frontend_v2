import {z} from "zod";
import {
    CreateReceiptDocumentSchema, GetReceiptDocumentsQuerySchema, ReceiptItemSchema,
    UpdateReceiptDocumentSchema
} from "@/features/inventory-documents/receipt/components/forms/schema";
import {Product} from "@/features/products/types";
import {StorageLocation, Warehouse} from "@/features/warehouse/types";
import {User} from "@/types";
import {Supplier} from "@/features/suppliers/types";
import {Order} from "@/features/orders/types";
import {Organization} from "@/features/organizations/types";

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


// Типы для использования в сервисном слое
export type CreateReceiptDocumentDto = z.infer<typeof CreateReceiptDocumentSchema>;
export type UpdateReceiptDocumentDto = z.infer<typeof UpdateReceiptDocumentSchema>;
export type GetReceiptDocumentsQueryDto = z.infer<typeof GetReceiptDocumentsQuerySchema>;
export type ReceiptItemDto = z.infer<typeof ReceiptItemSchema>;




export interface ReceiptDocumentItem {
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

// Дополнительная информация для приходного документа
export interface ReceiptDocumentExt {
    id: number;
    documentId: number;
    supplierId?: number | null;
    incomingNumber?: string | null;
    incomingDate?: string | null;
    storageLocationId?: number | null;
    paymentTerms?: string | null;
    orderId?: number | null;

    // Связанные объекты
    supplier?: Supplier | null;
    storageLocation?: StorageLocation | null;
    order?: Order | null;
}

// Полная структура приходного документа
export interface ReceiptDocument {
    // Базовые поля документа
    id: number;
    number: string | null;
    date: string;
    userId: number;
    status: InventoryDocumentStatus | string;
    type: InventoryDocumentType;
    warehouseId: number | null;
    totalAmount: string;
    organizationId: number | null;
    operationType: string | null;
    note: string | null;
    createdAt: string;
    completedAt: string | null;
    updatedAt: string;

    // Связанные объекты
    user: User;
    organization: Organization | null;
    warehouse: Warehouse | null;

    // Расширение для приходных документов
    receiptDocument: ReceiptDocumentExt | null;

    // Товарные позиции
    items: ReceiptDocumentItem[];
}

// Параметры для фильтрации и поиска приходных документов
export interface ReceiptDocumentsQueryParams {
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

