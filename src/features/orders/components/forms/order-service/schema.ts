import { z } from "zod";

export const orderServiceSchema = z.object({
  serviceId: z.number({
    required_error: "Необходимо выбрать услугу"
  }),
  defaultDuration: z.number()
    .min(1, "Длительность должна быть больше 0")
    .max(480, "Длительность не может превышать 8 часов"),
  appliedRate: z.number()
    .min(0, "Ставка не может быть отрицательной"),
  appliedPrice: z.number()
    .min(0, "Цена не может быть отрицательной"),
  discountPercent: z.number()
    .min(0, "Скидка не может быть отрицательной")
    .max(100, "Скидка не может превышать 100%")
    .default(0),
  startTime: z.string().nullable(),
  endTime: z.string().nullable(),
});

export type OrderServiceFormData = z.infer<typeof orderServiceSchema>; 