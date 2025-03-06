import {Warehouse} from "@/features/warehouse/types/warehouse";

export interface StorageLocation {
    id: number;
    warehouseId: number;
    zone: string | null;
    rack: string | null;
    shelf: string | null;
    position: string | null;
    description: string | null;
    isActive: boolean;
    createdAt: Date;
    warehouse: Warehouse
}
