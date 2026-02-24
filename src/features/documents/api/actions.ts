import apiClient from '@/lib/auth/client'
import { DOCUMENTS_URL } from '@/lib/constants'

import type { InventoryDocumentType } from '@/features/inventory-documents/types'
import type { ListResponse } from '@/types/params'

export interface DocumentsQueryParams {
  page?: number
  limit?: number
  type?: InventoryDocumentType
}

export interface Document {
  id: number
  number: string | null
  date: string
  status: string
  type: InventoryDocumentType
  warehouseId: number | null
  totalAmount: string
  organizationId: number | null
  note: string | null
  incomingNumber: string | null
  incomingDate: string | null
  createdAt: string
  completedAt: string | null
  updatedAt: string
}

export interface CreateDocumentDto {
  type: InventoryDocumentType
  warehouseId: number
  fromWarehouseId?: number
  supplierId?: number
  organizationId?: number
  orderId?: number
  note?: string
  incomingNumber?: string
  incomingDate?: string
}

export const getDocumentById = async (id: number): Promise<Document> => {
  const response = await apiClient.get<Document>(`${DOCUMENTS_URL}/${id}`)
  return response.data
}

export const createDocument = async (data: CreateDocumentDto): Promise<Document> => {
  const response = await apiClient.post<Document>(DOCUMENTS_URL, data)
  console.log(response.data)
  return response.data
}

export const getDocuments = async (
  params: DocumentsQueryParams
): Promise<ListResponse<Document>> => {
  const response = await apiClient.get<ListResponse<Document>>(DOCUMENTS_URL, { params })
  return response.data
}
