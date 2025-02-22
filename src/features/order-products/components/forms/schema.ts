import { z } from "zod";

export const orderProductSchema = z.object({
    name: z.string().optional(),
    productId: z.number().min(1, "ID продукта обязателен для заполнения"),
    quantity: z.string(),
    price: z.string()    // Строка для цены
        .min(1, "Цена обязательна для заполнения")
        .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, "Цена не может быть отрицательной"),
});

export type OrderProductFormData = z.infer<typeof orderProductSchema>;