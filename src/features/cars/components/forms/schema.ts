import {z} from "zod";

export const carFormSchema = z.object({
    brandId: z.coerce.number(),
    modelId: z.coerce.number(),
    year: z.coerce.number().transform(val=> Number(val)).optional().refine(val => !val || (val >= 1900 && val <= new Date().getFullYear()), {
        message: "Год должен быть между 1900 и текущим годом",
    }),
    vin: z.string().optional().refine(val => !val || val.length >= 12, {
     message: "VIN должен содержать не более 22 символов",
    }),
    licensePlate: z.string().optional().refine(val => !val || /^[A-Z0-9]{1,10}$/.test(val), {
        message: "Некорректный номерной знак",
    }),
    // current_mileage: z.string().optional().refine(val => !val || (parseInt(val) >= 0 && parseInt(val) <= 1000000), {
    //   message: "Пробег должен быть между 0 и 1,000,000",
    // }),
    // custom_brand: z.string().optional(),
});

export type CarFormData = z.infer<typeof carFormSchema>;
