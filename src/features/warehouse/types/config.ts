import { AlertTriangle, ArrowRightLeft, Warehouse, Wrench } from 'lucide-react'

import { WarehouseTypeEnum } from '@/features/warehouse/types/warehouse'

import type { TypeMapping } from '@/types'

export const warehouseTypeConfig: TypeMapping = {
  [WarehouseTypeEnum.MAIN]: {
    label: 'Основной склад',
    variant: 'success',
    icon: Warehouse,
    description: 'Основной склад для хранения товаров',
  },
  [WarehouseTypeEnum.WORKSHOP]: {
    label: 'Мастерская',
    variant: 'warning',
    icon: Wrench,
    description: 'Склад мастерской',
  },
  [WarehouseTypeEnum.TRANSIT]: {
    label: 'Транзитный',
    variant: 'info',
    icon: ArrowRightLeft,
    description: 'Транзитный склад',
  },
  [WarehouseTypeEnum.DEFECTIVE]: {
    label: 'Брак',
    variant: 'destructive',
    icon: AlertTriangle,
    description: 'Склад бракованных товаров',
  },
}
