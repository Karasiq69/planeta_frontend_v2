import { z } from 'zod'

export const supplierFormSchema = z.object({
  name: z.string().min(1, { message: 'Название компании обязательно' }).max(100),
  contactPerson: z.string().min(1, { message: 'Контактное лицо обязательно' }).max(100),
  phone: z.string().min(5, { message: 'Телефон должен содержать минимум 5 символов' }).max(20),
  email: z.string().email({ message: 'Некорректный email' }).max(100),
  address: z.string().optional(),
  inn: z
    .string()
    .max(12)
    .refine((val) => !val || /^\d{10}$|^\d{12}$/.test(val), {
      message: 'ИНН должен содержать 10 или 12 цифр',
    })
    .optional(),
  kpp: z
    .string()
    .max(9)
    .refine((val) => !val || /^\d{9}$/.test(val), {
      message: 'КПП должен содержать 9 цифр',
    })
    .optional(),
  isActive: z.boolean().optional().default(true),
})

export type SupplierCreation = z.infer<typeof supplierFormSchema>
export type SupplierUpdate = Partial<SupplierCreation>
