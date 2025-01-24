import { z } from "zod";

export const clientSchema = z.object({
  firstName: z.string()
    .min(1, "Имя обязательно для заполнения")
    .max(100, "Имя не должно превышать 100 символов")
    .transform(value => value.trim()),

  lastName: z.string()
    .min(1, "Фамилия обязательна для заполнения")
    .max(100, "Фамилия не должна превышать 100 символов")
    .transform(value => value.trim()),

  email: z.string()
    .min(1, "Email обязателен для заполнения")
    .max(255, "Email не должен превышать 255 символов")
    .email("Неверный формат email адреса")
    .transform(value => value.toLowerCase().trim()),

  phone: z.string()
    .min(1, "Номер телефона обязателен для заполнения")
    .max(20, "Номер телефона не должен превышать 20 символов")
  .regex(/^\+?[0-9\s()-]{10,}$/, "Неверный формат номера телефона")
    .transform(value => value.replace(/\s+/g, ' ').trim()),
});

// Тип данных формы
export type ClientFormData = z.infer<typeof clientSchema>;
