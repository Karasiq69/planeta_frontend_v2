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

export interface IWarehouse {
    id: number;
    name: string;
}

export interface InventoryDocument {
    id: number;
    type: InventoryDocumentType;
    status: InventoryDocumentStatus;
    number?: string;
    warehouseId: number;
    targetWarehouseId?: number;
    orderId?: number;
    userId: number;
    note?: string;
    createdAt: string;
    updatedAt: string;
    completedAt?: string;
    warehouse?: IWarehouse;
    targetWarehouse?: IWarehouse;
}

export interface InventoryDocumentsResponse {
    data: InventoryDocument[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface InventoryDocumentsQuery {
    page?: number;
    pageSize?: number;
    type?: InventoryDocumentType;
    status?: InventoryDocumentStatus;
    warehouseId?: number;
    orderId?: number;
    dateFrom?: string;
    dateTo?: string;
    searchTerm?: string;
}