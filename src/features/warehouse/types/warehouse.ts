import type { Product } from '@/features/products/types'

export const WarehouseTypeEnum = {
  MAIN: 'MAIN',
  WORKSHOP: 'WORKSHOP',
  TRANSIT: 'TRANSIT',
  DEFECTIVE: 'DEFECTIVE',
} as const

export type WarehouseTypeEnum = (typeof WarehouseTypeEnum)[keyof typeof WarehouseTypeEnum]

export interface Warehouse {
  id: number
  name: string
  description: string | null
  isActive: boolean
  type: WarehouseTypeEnum
  createdAt: string
}

export interface WarehouseItem {
  id: number
  productId: number
  warehouseId: number
  storageLocationId?: number | null
  quantity: string | number
  reservedQuantity: string | number
  minimumQuantity: string | number
  updatedAt: string

  product?: Product
  warehouse?: Warehouse
}
