import { z } from 'zod'

export const employeeFormSchema = z.object({
  lastName: z.string().min(1, 'Фамилия обязательна'),
  firstName: z.string().min(1, 'Имя обязательно'),
  middleName: z.string().optional(),
  position: z.enum(['mechanic', 'manager', 'warehouse_worker', 'admin'], {
    required_error: 'Выберите должность',
  }),
  organizationId: z.number({ required_error: 'Выберите организацию' }),
  phone: z.string().optional(),
  hiredAt: z.string().optional(),
})

export type EmployeeFormValues = z.infer<typeof employeeFormSchema>

export const POSITION_LABELS: Record<string, string> = {
  mechanic: 'Механик',
  manager: 'Менеджер',
  warehouse_worker: 'Кладовщик',
  admin: 'Администратор',
}
