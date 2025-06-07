import {Product} from "@/features/products/types";
import {InventoryDocumentStatus, InventoryDocumentType} from "@/features/inventory-documents/types";

export const WarehouseTypeEnum = {
    MAIN: 'MAIN',
    WORKSHOP: 'WORKSHOP',
    TRANSIT: 'TRANSIT',
    DEFECTIVE: 'DEFECTIVE'
} as const

export type WarehouseTypeEnum = (typeof WarehouseTypeEnum)[keyof typeof WarehouseTypeEnum];


export interface Warehouse {
    id: number;
    name: string;
    description: string | null;
    isActive: boolean;
    type: WarehouseTypeEnum
    createdAt: string;
}


export interface WarehouseItem {
    id: number;
    productId: number;
    warehouseId: number;
    storageLocationId?: number | null;
    quantity: string | number;
    reservedQuantity: string | number;
    minimumQuantity: string | number;
    updatedAt: string;

    product?: Product;
    warehouse?: Warehouse;
}

export interface BaseDocument {
    id: number;
    number: string | null;
    date: string;
    userId: number;
    status: InventoryDocumentStatus;
    type: InventoryDocumentType;
    warehouseId: number | null;
    totalAmount: number;
    organizationId: number;
    operationType: OperationTypeEnum;
    note: string | null;
    createdAt: string;
    completedAt: string | null;
    updatedAt: string;
}


export interface InventoryTransaction {
    id: number;
    documentId: number;
    warehouseItemId: number;
    document: BaseDocument;
    type: 'RECEIPT' | 'RESERVED' | 'WRITE_OFF' | 'RETURN' | 'INVENTORY' | 'TRANSFER';
    quantity: string;
    price: string;
    totalPrice: string;
    fromStorageLocationId: number | null;
    toStorageLocationId: number | null;
    userId: number;
    createdAt: string;
    note: string | null;

    warehouseItem?: WarehouseItem;
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


export const TRANSACTION_TYPE_LABELS: Record<InventoryTransaction['type'], string> = {
    'RECEIPT': 'Поступление',
    'RESERVED': 'Резервирование',
    'WRITE_OFF': 'Списание',
    'RETURN': 'Возврат',
    'INVENTORY': 'Инвентаризация',
    'TRANSFER': 'Перемещение'
};
