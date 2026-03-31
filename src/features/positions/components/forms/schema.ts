import { z } from 'zod'

export const positionFormSchema = z.object({
  name: z.string().min(1, 'Название обязательно').max(100, 'Максимум 100 символов'),
})

export type PositionFormValues = z.infer<typeof positionFormSchema>
