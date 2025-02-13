import { z } from "zod";

export const orderServiceMechanicSchema = z.object({
  mechanicId: z.number({
    required_error: "Выберите механика",
    invalid_type_error: "Выберите механика",
  }),
  
  participationPercentage: z.number()
    .min(0, "Процент участия не может быть отрицательным")
    .max(100, "Процент участия не может превышать 100%"),
  
  paymentType: z.enum(['percent', 'fixed'], {
    required_error: "Выберите тип оплаты",
    invalid_type_error: "Неверный тип оплаты",
  }),
  
  paymentRate: z.coerce.number()
    .min(0, "Ставка не может быть отрицательной"),
});

export type OrderServiceMechanicFormData = z.infer<typeof orderServiceMechanicSchema>;