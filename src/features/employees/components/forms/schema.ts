import { z } from 'zod'

export const employeeFormSchema = z.object({
  lastName: z.string().min(1, 'Фамилия обязательна'),
  firstName: z.string().min(1, 'Имя обязательно'),
  middleName: z.string().optional(),
  positionId: z.number({ required_error: 'Выберите должность' }),
  organizationId: z.number({ required_error: 'Выберите организацию' }),
  phone: z.string().optional(),
  hiredAt: z.string().optional(),
  userId: z.number().nullable().optional(),
})

export type EmployeeFormValues = z.infer<typeof employeeFormSchema>
