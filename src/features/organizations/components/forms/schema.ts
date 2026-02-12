import { z } from 'zod'

export const organizationSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    inn: z.string(),
    kpp: z.string().optional(),
    ogrn: z.string().optional(),
    legalAddress: z.string().optional(),
    actualAddress: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    bankName: z.string().optional(),
    bankBik: z.string().optional(),
    bankAccount: z.string().optional(),
    logo: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  })
  .optional()
