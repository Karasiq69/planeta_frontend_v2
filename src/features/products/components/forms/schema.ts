import { z } from "zod";

export const productSchema = z.object({
    name: z.string()
        .min(1, "Название обязательно")
        .max(255, "Название должно быть короче 255 символов")
        .transform(value => value.trim()),

    description: z.string()
        .optional()
        .transform(value => value ? value.trim() : undefined),

    price: z.number()
        .min(0, "Цена не может быть отрицательной"),

    partNumber: z.string()
        .min(1, "Артикул производителя обязателен")
        .transform(value => value.trim()),

    sku: z.string()
        .min(1, "Внутренний артикул обязателен")
        .transform(value => value.trim()),

    categoryId: z.number()
        .optional()
        .default(1),

    brandId: z.number()
        .optional()
        .default(1),

    isOriginal: z.boolean()
        .optional()
        .default(false),

    weight: z.number()
        .optional().nullable(),

    dimensions: z.string()
        .optional()
        .nullable(),
});

export type ProductFormData = z.infer<typeof productSchema>;