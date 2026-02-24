import { z } from 'zod'

export const appointmentSchema = z.object({
  title: z.string().min(1, 'Обязательное поле'),
  description: z.string().optional(),
  start: z.date({
    required_error: 'Выберите дату начала',
  }),
  end: z.date({
    required_error: 'Выберите дату окончания',
  }),
  allDay: z.boolean().default(false),
  resource: z.string().min(1, 'Выберите станцию'),
})

export type AppointmentFormData = z.infer<typeof appointmentSchema>
