import type { Product } from '@/features/products/types'
import type { StorageLocation } from '@/features/warehouse/types/storage-locations'

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
  storageLocationId: number | null
  supplierId: number | null
  quantity: string
  reservedQuantity: string
  minimumQuantity: string
  purchasePrice: string
  retailPrice: string
  markupPercentage: string
  updatedAt: string
  receivedAt: string | null

  product?: Product
  warehouse?: Warehouse
  storageLocation?: StorageLocation | null
}

export interface WarehouseItemsParams {
  page?: number
  limit?: number
  warehouseId?: number
  searchTerm?: string
}

export interface TransactionParams {
  page?: number
  limit?: number
  documentId?: number
  userId?: number
  warehouseItemId?: number
}
