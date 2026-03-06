import { z } from 'zod'

const POSITIONS = ['mechanic', 'manager', 'warehouse_worker', 'admin'] as const

const accountSchema = z.object({
  email: z.string().min(1, 'Email обязателен').email('Некорректный email'),
  password: z
    .string()
    .optional()
    .refine((v) => !v || v.length >= 8, 'Минимум 8 символов'),
  role: z.enum(POSITIONS).optional(),
})

export const employeeFormSchema = z
  .object({
    lastName: z.string().min(1, 'Фамилия обязательна'),
    firstName: z.string().min(1, 'Имя обязательно'),
    middleName: z.string().optional(),
    position: z.enum(POSITIONS, {
      required_error: 'Выберите должность',
    }),
    organizationId: z.number({ required_error: 'Выберите организацию' }),
    phone: z.string().optional(),
    hiredAt: z.string().optional(),
    createAccount: z.boolean().optional(),
    account: accountSchema.optional(),
  })
  .refine(
    (data) => !data.createAccount || (data.account?.email && data.account.email.length > 0),
    { message: 'Заполните данные аккаунта', path: ['account'] },
  )
  .refine(
    (data) => {
      if (!data.createAccount || !data.account) return true
      if (data.account.password && data.account.password.length > 0) return true
      return false
    },
    { message: 'Пароль обязателен при создании аккаунта', path: ['account', 'password'] },
  )

export type EmployeeFormValues = z.infer<typeof employeeFormSchema>

export const POSITION_LABELS: Record<string, string> = {
  mechanic: 'Механик',
  manager: 'Менеджер',
  warehouse_worker: 'Кладовщик',
  admin: 'Администратор',
}

export const ROLE_LABELS = POSITION_LABELS
