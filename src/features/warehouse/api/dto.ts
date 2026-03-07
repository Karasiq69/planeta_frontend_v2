import { z } from 'zod'

import { WarehouseTypeEnum } from '@/features/warehouse/types'

export const warehouseFormSchema = z.object({
  name: z.string().min(1, 'Название обязательно'),
  description: z.string().optional(),
  type: z.nativeEnum(WarehouseTypeEnum, { required_error: 'Выберите тип склада' }),
  isActive: z.boolean(),
})

export type WarehouseFormData = z.infer<typeof warehouseFormSchema>
