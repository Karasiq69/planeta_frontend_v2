import { z } from "zod";

export const serviceSchema = z.object({
    name: z.string()
        .min(1, "Название услуги обязательно для заполнения")
        .max(100, "Название услуги не должно превышать 100 символов")
        .transform(value => value.trim()),
    
    description: z.string()
        .min(1, "Описание услуги обязательно для заполнения")
        .max(500, "Описание услуги не должно превышать 500 символов")
        .transform(value => value.trim()),
    
    defaultDuration: z.number()
        .min(1, "Длительность должна быть больше 0")
        .max(480, "Длительность не может превышать 8 часов"),
    
    requiredQualifications: z.string()
        .min(1, "Требуемая квалификация обязательна для заполнения")
        .max(500, "Требуемая квалификация не должна превышать 500 символов")
        .transform(value => value.trim()).optional(),
});

export type ServiceFormData = z.infer<typeof serviceSchema>; 