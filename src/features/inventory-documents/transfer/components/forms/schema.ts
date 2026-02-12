import { z } from 'zod'

// Схема для создания документа на перемещение
export const CreateTransferDocumentSchema = z.object({
  note: z.string().optional(),
})

// Схема для обновления приходного документа
export const UpdateTransferDocumentSchema = z.object({
  // warehouseId: z.number().optional(),
  supplierId: z.number().optional(),
  organizationId: z.number().optional(),
  relatedOrderId: z.number().optional(),
  incomingNumber: z.string().optional(),
  incomingDate: z
    .union([z.date(), z.string().transform((val) => (val ? new Date(val) : undefined))])
    .optional(),
  date: z
    .union([z.date(), z.string().transform((val) => (val ? new Date(val) : undefined))])
    .optional(),
  // storageLocationId: z.number().optional(),
  number: z.string().optional(),
  note: z.string().optional(),
  // Добавим дополнительные поля, используемые в форме
  type: z.string().optional(),
  sourceWarehouse: z.coerce.number().optional(),
  operationType: z.string(),
  sourceWarehouseId: z.coerce.number().optional(),
  destinationWarehouse: z.coerce.number().optional(),
  destinationWarehouseId: z.coerce.number().optional(),

  createdAt: z.coerce.date(),
})

export const GetTransferDocumentsQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 1)),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 20)),
  status: z.string().optional(),

  warehouseId: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : undefined)),
  supplierId: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : undefined)),
  orderId: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : undefined)),
  organizationId: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : undefined)),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  searchTerm: z.string().optional(),
})

// Схема для товаров в приходном документе
export const TransferItemSchema = z.object({
  productId: z.number(),
  quantity: z.number().positive(),
  price: z.number().nonnegative().optional(),
  totalPrice: z.number().optional(),
  toStorageLocationId: z.number().optional(),
  note: z.string().optional(),
})

// Типы для использования в сервисном слое
export type CreateTransferDocumentDto = z.infer<typeof CreateTransferDocumentSchema>
export type UpdateTransferDocumentDto = z.infer<typeof UpdateTransferDocumentSchema>
export type GetTransferDocumentsQueryDto = z.infer<typeof GetTransferDocumentsQuerySchema>
export type TransferItemDto = z.infer<typeof TransferItemSchema>
