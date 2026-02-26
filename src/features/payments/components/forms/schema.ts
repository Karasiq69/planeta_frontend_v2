import { z } from 'zod'

export const createPaymentSchema = z.object({
  orderId: z.number(),
  cashRegisterId: z.number({ required_error: 'Выберите кассу' }),
  amount: z.number({ required_error: 'Введите сумму' }).int('Сумма должна быть целым числом').positive('Сумма должна быть больше 0'),
  paymentMethod: z.enum(['cash', 'card', 'transfer', 'online']).default('cash'),
  comment: z.string().optional(),
})

export type CreatePaymentFormValues = z.infer<typeof createPaymentSchema>
