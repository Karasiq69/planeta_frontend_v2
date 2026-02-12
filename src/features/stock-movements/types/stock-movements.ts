import {BaseDocument, DocumentTypes} from "@/features/inventory-documents/types";
import {WarehouseItem} from "@/features/warehouse/types";

export interface StockMovements {
    id: number;
    documentId: number;
    warehouseItemId: number;
    document: BaseDocument;
    type: DocumentTypes
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

