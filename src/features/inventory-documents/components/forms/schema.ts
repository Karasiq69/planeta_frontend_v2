import { z } from "zod";
import {organizationSchema} from "@/features/organizations/components/forms/schema";

// Схема для создания черновика документа
export const createDraftDocumentSchema = z.object({
    type: z.enum(['RECEIPT', 'EXPENSE', 'RETURN', 'TRANSFER', 'WRITE_OFF', 'INVENTORY']),
    warehouseId: z.coerce.number().positive(),
    targetWarehouseId: z.coerce.number().positive().optional(),
});

// Схема для обновления документа
export const updateDocumentSchema = z.object({
    warehouseId: z.coerce.number().positive().optional(),
    targetWarehouseId: z.coerce.number().positive().optional(),
    orderId: z.coerce.number().positive().optional(),
    number: z.string().optional(),
    supplierId: z.coerce.number().positive().optional(),
    incomingNumber: z.string().optional(),
    incomingDate: z.union([
        z.date(),
        z.string().transform(val => val ? new Date(val) : undefined)
    ]).optional(),
    note: z.string().optional(),
});

// Схема для товара в документе
export const documentItemSchema = z.object({
    productId: z.number().positive(),
    quantity: z.number().positive(),
    fromStorageLocationId: z.number().optional(),
    toStorageLocationId: z.number().optional(),
    note: z.string().optional(),
});

// Схема для обновления товара
export const updateDocumentItemSchema = z.object({
    quantity: z.number().positive().optional(),
    fromStorageLocationId: z.number().optional(),
    toStorageLocationId: z.number().optional(),
    note: z.string().optional(),
});

// Полная схема формы документа (для использования в формах UI)
export const inventoryDocumentFormSchema = z.object({
    type: z.enum(['RECEIPT', 'EXPENSE', 'RETURN', 'TRANSFER', 'WRITE_OFF', 'INVENTORY']),
    warehouseId: z.coerce.number().positive(),
    targetWarehouseId: z.coerce.number().positive().optional(),
    number: z.string().optional(),
    supplierId: z.coerce.number().positive().optional(),
    incomingNumber: z.string().optional(),
    incomingDate: z.union([
        z.date(),
        z.string().transform(val => val ? new Date(val) : undefined)
    ]).optional(),
    createdAt: z.union([
        z.date(),
        z.string().transform(val => val ? new Date(val) : undefined)
    ]).optional(),
    note: z.string().optional(),
    organizationId: z.coerce.number().positive().optional(),
    organization: organizationSchema,

});


// Типы для использования в приложении
export type CreateDraftDocumentFormData = z.infer<typeof createDraftDocumentSchema>;
export type UpdateDocumentFormData = z.infer<typeof updateDocumentSchema>;
export type DocumentItemFormData = z.infer<typeof documentItemSchema>;
export type UpdateDocumentItemFormData = z.infer<typeof updateDocumentItemSchema>;
export type InventoryDocumentFormData = z.infer<typeof inventoryDocumentFormSchema>;