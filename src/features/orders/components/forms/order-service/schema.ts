import { z } from 'zod'

export const orderServiceSchema = z.object({
  defaultDuration: z.coerce.number().max(480, 'Длительность не может превышать 8 часов'),
  appliedRate: z.coerce.number(),
  appliedPrice: z.coerce.number(),
  discountPercent: z.coerce.number().max(100, 'Скидка не может превышать 100%'),
})

export type OrderServiceFormData = z.infer<typeof orderServiceSchema>
