import { z } from 'zod'

export const specificationSchema = z.object({
  name: z
    .string()
    .min(1, 'Название спецификации обязательно')
    .max(255, 'Название не должно превышать 255 символов')
    .transform((v) => v.trim()),
  description: z
    .string()
    .transform((v) => v.trim())
    .optional(),
  modelId: z.number().int().positive().optional().nullable(),
  engineId: z.number().int().positive().optional().nullable(),
  isActive: z.boolean().optional().default(true),
})

export type SpecificationFormData = z.infer<typeof specificationSchema>

export const addSpecServiceSchema = z.object({
  serviceId: z.number().int().positive('Выберите услугу'),
  defaultDuration: z.coerce.number().int().min(1, 'Длительность должна быть > 0'),
  discountPercent: z.coerce.number().int().min(0).max(100).optional(),
})

export type AddSpecServiceFormData = z.infer<typeof addSpecServiceSchema>

export const addSpecProductSchema = z.object({
  productId: z.number().int().positive('Выберите товар'),
  quantity: z.coerce.number().positive('Количество должно быть > 0'),
  discountPercent: z.coerce.number().min(0).max(100).optional(),
})

export type AddSpecProductFormData = z.infer<typeof addSpecProductSchema>
