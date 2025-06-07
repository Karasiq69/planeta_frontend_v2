import {z} from 'zod';

// Схема для создания приходного документа
export const CreateReceiptDocumentSchema = z.object({
    warehouseId: z.number(),
    organizationId: z.number().optional(),
    supplierId: z.number().optional(),
    orderId: z.number().optional(),
    incomingNumber: z.string().optional(),
    incomingDate: z.union([
        z.date(),
        z.string().transform((val) => val ? new Date(val) : undefined)
    ]).optional(),
    storageLocationId: z.number().optional(),
    note: z.string().optional(),
});

// Схема для обновления приходного документа
export const UpdateReceiptDocumentSchema = z.object({
    warehouseId: z.number().optional(),
    supplierId: z.number().optional(),
    organizationId: z.number().optional(),
    orderId: z.number().optional(),
    incomingNumber: z.string().optional(),
    incomingDate: z.union([
        z.date(),
        z.string().transform((val) => val ? new Date(val) : undefined)
    ]).optional(),
    date: z.union([
        z.date(),
        z.string().transform((val) => val ? new Date(val) : undefined)
    ]).optional(),
    storageLocationId: z.number().optional(),
    number: z.string().optional(),
    note: z.string().optional(),
    // Добавим дополнительные поля, используемые в форме
    type: z.string().optional(),
    createdAt: z.date().optional(),
    targetWarehouseId: z.coerce.number().optional(),
});

export const GetReceiptDocumentsQuerySchema = z.object({
    page: z.string().optional().transform(val => (val ? parseInt(val) : 1)),
    limit: z.string().optional().transform(val => (val ? parseInt(val) : 20)),
    status: z.string().optional(),

    warehouseId: z.string().optional().transform(val => (val ? parseInt(val) : undefined)),
    supplierId: z.string().optional().transform(val => (val ? parseInt(val) : undefined)),
    orderId: z.string().optional().transform(val => (val ? parseInt(val) : undefined)),
    organizationId: z.string().optional().transform(val => (val ? parseInt(val) : undefined)),
    dateFrom: z.string().optional(),
    dateTo: z.string().optional(),
    searchTerm: z.string().optional(),
});

// Схема для товаров в приходном документе
export const ReceiptItemSchema = z.object({
    productId: z.number(),
    quantity: z.number().positive(),
    price: z.number().nonnegative().optional(),
    totalPrice: z.number().optional(),
    toStorageLocationId: z.number().optional(),
    note: z.string().optional(),
});

// Типы для использования в сервисном слое
export type CreateReceiptDocumentDto = z.infer<typeof CreateReceiptDocumentSchema>;
export type UpdateReceiptDocumentDto = z.infer<typeof UpdateReceiptDocumentSchema>;
export type GetReceiptDocumentsQueryDto = z.infer<typeof GetReceiptDocumentsQuerySchema>;
export type ReceiptItemDto = z.infer<typeof ReceiptItemSchema>;