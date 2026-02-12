import apiClient from '@/lib/auth/client'
import { TRANSFER_DOCUMENTS_URL } from '@/lib/constants'


import type {
  CreateTransferDocumentDto,
  UpdateTransferDocumentDto,
} from '@/features/inventory-documents/transfer/components/forms/schema'
import type {
  TransferDocument,
  TransferDocumentsQueryParams,
  TransferItemDto,
} from '@/features/inventory-documents/transfer/types'
import type { ListResponse } from '@/types/params'

export const getTransferDocumentById = async (id: number): Promise<TransferDocument> => {
  const response = await apiClient.get<TransferDocument>(`${TRANSFER_DOCUMENTS_URL}/${id}`)
  return response.data
}

export const getTransferDocumentsFn = async (
  params: TransferDocumentsQueryParams
): Promise<ListResponse<TransferDocument>> => {
  const response = await apiClient.get<ListResponse<TransferDocument>>(TRANSFER_DOCUMENTS_URL, {
    params,
  })
  return response.data
}

// Создание нового приходного документа
export const createTransferDocumentFn = async (
  data: CreateTransferDocumentDto
): Promise<TransferDocument> => {
  const response = await apiClient.post<TransferDocument>(TRANSFER_DOCUMENTS_URL, data)
  return response.data
}

// Обновление данных приходного документа
export const updateTransferDocumentFn = async (
  id: number,
  data: UpdateTransferDocumentDto
): Promise<TransferDocument> => {
  const response = await apiClient.patch<TransferDocument>(`${TRANSFER_DOCUMENTS_URL}/${id}`, data)
  return response.data
}

// Добавление товара в документ перемещения
export const addTransferDocumentItem = async (
  documentId: number,
  data: TransferItemDto
): Promise<TransferDocument> => {
  const response = await apiClient.post<TransferDocument>(
    `${TRANSFER_DOCUMENTS_URL}/${documentId}/items`,
    data
  )
  return response.data
}

// Обновление товара в документе перемещения
export const updateTransferDocumentItem = async (
  documentId: number,
  itemId: number,
  data: Partial<TransferItemDto>
): Promise<TransferDocument> => {
  const response = await apiClient.patch<TransferDocument>(
    `${TRANSFER_DOCUMENTS_URL}/${documentId}/items/${itemId}`,
    data
  )
  return response.data
}

// Удаление товара из документа перемещения
export const removeTransferDocumentItem = async (itemId: number): Promise<void> => {
  await apiClient.delete(`${TRANSFER_DOCUMENTS_URL}/items/${itemId}`)
}

// Подтверждение документа перемещения
export const completeTransferDocument = async (id: number): Promise<TransferDocument> => {
  const response = await apiClient.post<TransferDocument>(
    `${TRANSFER_DOCUMENTS_URL}/${id}/complete`
  )
  return response.data
}

// Отмена документа перемещения
export const cancelTransferDocument = async (id: number): Promise<TransferDocument> => {
  const response = await apiClient.post<TransferDocument>(`${TRANSFER_DOCUMENTS_URL}/${id}/cancel`)
  return response.data
}
