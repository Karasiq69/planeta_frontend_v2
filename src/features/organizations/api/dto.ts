import { z } from 'zod';

export const organizationFormSchema = z.object({
    name: z.string().min(1, { message: "Название организации обязательно" }).max(100),
    inn: z.string().min(10, { message: "ИНН обязателен" })
        .refine(val => /^\d{10}$|^\d{12}$/.test(val), {
            message: "ИНН должен содержать 10 или 12 цифр",
        }),
    kpp: z.string().max(9)
        .refine(val => !val || /^\d{9}$/.test(val), {
            message: "КПП должен содержать 9 цифр",
        })
        .optional(),
    ogrn: z.string()
        .refine(val => !val || /^\d{13}$|^\d{15}$/.test(val), {
            message: "ОГРН должен содержать 13 или 15 цифр",
        })
        .optional(),
    legalAddress: z.string().optional(),
    actualAddress: z.string().optional(),
    phone: z.string().max(20).optional(),
    email: z.string().email({ message: "Некорректный email" }).max(100).optional(),
    bankName: z.string().max(100).optional(),
    bankBik: z.string()
        .refine(val => !val || /^\d{9}$/.test(val), {
            message: "БИК должен содержать 9 цифр",
        })
        .optional(),
    bankAccount: z.string()
        .refine(val => !val || /^\d{20}$/.test(val), {
            message: "Номер счета должен содержать 20 цифр",
        })
        .optional(),
    logo: z.string().optional(),
});

export type OrganizationCreation = z.infer<typeof organizationFormSchema>;
export type OrganizationUpdate = Partial<OrganizationCreation>;