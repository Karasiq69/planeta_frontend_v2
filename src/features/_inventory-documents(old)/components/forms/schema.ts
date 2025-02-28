import { z } from "zod";

export const inventoryDocumentFormSchema = z.object({
    type: z.enum(['RECEIPT', 'EXPENSE', 'RETURN', 'TRANSFER', 'WRITE_OFF', 'INVENTORY']),
    warehouseId: z.coerce.number().positive(),
    targetWarehouseId: z.coerce.number().positive().optional(),
    orderId: z.coerce.number().positive().optional(),
    number: z.string().optional(),
    supplierId: z.coerce.number().positive().optional(),
    incomingNumber: z.string().optional(),
    incomingDate: z.date().optional(),
    note: z.string().optional(),
    items: z.array(z.object({
        productId: z.number().positive(),
        quantity: z.number().positive(),
        fromStorageLocationId: z.number().optional(),
        toStorageLocationId: z.number().optional(),
        note: z.string().optional(),
    })).default([]),
});

export type InventoryDocumentFormData = z.infer<typeof inventoryDocumentFormSchema>;

