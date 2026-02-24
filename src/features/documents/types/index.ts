import type { DocumentStatus, DocumentType } from '@/features/documents/lib/constants'
import type { Organization } from '@/features/organizations/types'
import type { Product } from '@/features/products/types'
import type { Supplier } from '@/features/suppliers/types'
import type { Warehouse } from '@/features/warehouse/types'
import type { User } from '@/types'

export { DocumentType, DocumentStatus } from '@/features/documents/lib/constants'

// ============================================================
// Document-specific reference types
// ============================================================

export interface OrderRef {
  id: number
  clientId: number | null
  carId: number | null
  status: string
  totalCost: number | null
  reasonToApply: string | null
  recommendation: string | null
  createdById: number | null
  createdAt: string | null
  updatedAt: string | null
}

// ============================================================
// Document Items
// ============================================================

export interface DocumentItem {
  id: number
  documentId: number
  productId: number
  quantity: string
  price: string | null
  totalPrice: string | null
  note: string | null
  createdAt: string | null
  createdById: number | null
  product: Product
  createdBy: User | null
}

// ============================================================
// Document
// ============================================================

export interface Document {
  id: number
  number: string | null
  type: DocumentType
  status: DocumentStatus
  date: string | null
  warehouseId: number
  fromWarehouseId: number | null
  supplierId: number | null
  organizationId: number | null
  orderId: number | null
  totalAmount: string | null
  note: string | null
  userId: number
  incomingNumber: string | null
  incomingDate: string | null
  operationType: string | null
  createdAt: string | null
  updatedAt: string | null
  confirmedAt: string | null
  user: User
  warehouse: Warehouse
  fromWarehouse: Warehouse | null
  supplier: Supplier | null
  organization: Organization | null
  order: OrderRef | null
  items: DocumentItem[]
}

// ============================================================
// Request DTOs (frontend → backend)
// ============================================================

export interface CreateDocumentDto {
  type: DocumentType
  warehouseId: number
  fromWarehouseId?: number
  supplierId?: number
  organizationId?: number
  orderId?: number
  note?: string
  incomingNumber?: string
  incomingDate?: string
  operationType?: string
}

export interface UpdateDocumentDto {
  warehouseId?: number
  fromWarehouseId?: number | null
  supplierId?: number | null
  organizationId?: number | null
  orderId?: number | null
  note?: string
  date?: string
  incomingNumber?: string
  incomingDate?: string
  operationType?: string
}

export interface DocumentsQueryParams {
  page?: number
  limit?: number
  type?: DocumentType
  status?: DocumentStatus
  warehouseId?: number
  supplierId?: number
  orderId?: number
  organizationId?: number
  dateFrom?: string
  dateTo?: string
}
