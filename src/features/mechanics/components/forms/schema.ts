import { z } from 'zod'

export const mechanicSchema = z.object({
  name: z
    .string()
    .min(1, 'Имя обязательно для заполнения')
    .max(100, 'Имя не должно превышать 100 символов')
    .transform((value) => value.trim()),

  specialization: z
    .string()
    .min(1, 'Специализация обязательна для заполнения')
    .max(200, 'Специализация не должна превышать 200 символов'),

  qualifications: z
    .string()
    .min(1, 'Квалификация обязательна для заполнения')
    .max(500, 'Квалификация не должна превышать 500 символов'),

  hourlyRate: z
    .number()
    .min(0, 'Почасовая ставка не может быть отрицательной')
    .max(100000, 'Слишком большая почасовая ставка'),

  isActive: z.boolean().default(true),
})

export type MechanicFormData = z.infer<typeof mechanicSchema>
