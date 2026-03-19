import { z } from 'zod'

export const vatRateSchema = z.object({
  name: z.string().min(1, 'Название обязательно').max(50, 'Максимум 50 символов'),
  rate: z.coerce.number().min(0, 'Не может быть отрицательной').max(100, 'Максимум 100%'),
  isDefault: z.boolean().default(false),
})

export type VatRateFormValues = z.infer<typeof vatRateSchema>
