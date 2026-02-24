import apiClient from '@/lib/auth/client'
import { DOCUMENTS_URL } from '@/lib/constants'

import type { CreateDocumentDto, Document, DocumentItem, DocumentsQueryParams, UpdateDocumentDto } from '@/features/documents/types'
import type { ListResponse } from '@/types/params'

export const getDocumentById = async (id: number): Promise<Document> => {
	const response = await apiClient.get<Document>(`${DOCUMENTS_URL}/${id}`)
	return response.data
}

export const createDocument = async (data: CreateDocumentDto): Promise<Document> => {
	const response = await apiClient.post<Document>(DOCUMENTS_URL, data)
	return response.data
}

export const getDocuments = async (
	params: DocumentsQueryParams
): Promise<ListResponse<Document>> => {
	const response = await apiClient.get<ListResponse<Document>>(DOCUMENTS_URL, { params })
	return response.data
}

export const updateDocument = async (id: number, data: UpdateDocumentDto): Promise<Document> => {
	const response = await apiClient.patch<Document>(`${DOCUMENTS_URL}/${id}`, data)
	return response.data
}

export const getDocumentItems = async (documentId: number): Promise<DocumentItem[]> => {
	const response = await apiClient.get<DocumentItem[]>(`${DOCUMENTS_URL}/${documentId}/items`)
	return response.data
}

export const addDocumentItem = async (
	documentId: number,
	data: { productId: number; quantity: number }
): Promise<DocumentItem> => {
	const response = await apiClient.post<DocumentItem>(
		`${DOCUMENTS_URL}/${documentId}/items`,
		data
	)
	return response.data
}

export const updateDocumentItem = async (
	documentId: number,
	itemId: number,
	data: { quantity?: number; price?: number; note?: string }
): Promise<DocumentItem> => {
	const response = await apiClient.patch<DocumentItem>(
		`${DOCUMENTS_URL}/${documentId}/items/${itemId}`,
		data
	)
	return response.data
}

export const deleteDocumentItem = async (
	documentId: number,
	itemId: number
): Promise<void> => {
	await apiClient.delete(`${DOCUMENTS_URL}/${documentId}/items/${itemId}`)
}
