import apiClient from '@/lib/auth/client'

import type {
  DocumentTemplate,
  GenerateByEntityPayload,
  GenerateDocumentPayload,
  UpdateTemplatePayload,
  UploadTemplatePayload,
} from '@/features/document-templates/types'

const TEMPLATES_URL = '/templates'

export const getTemplates = async (category?: string) => {
  const params = category ? { document_category: category } : undefined
  const response = await apiClient.get<DocumentTemplate[]>(TEMPLATES_URL, { params })
  return response.data
}

export const getTemplateById = async (id: number) => {
  const response = await apiClient.get<DocumentTemplate>(`${TEMPLATES_URL}/${id}`)
  return response.data
}

export const uploadTemplate = async (payload: UploadTemplatePayload) => {
  const formData = new FormData()
  formData.append('template', payload.file)
  formData.append('name', payload.name)
  formData.append('slug', payload.slug)
  formData.append('documentCategory', payload.documentCategory)
  formData.append('outputFormat', payload.outputFormat)
  if (payload.description) {
    formData.append('description', payload.description)
  }

  const response = await apiClient.post<DocumentTemplate>(`${TEMPLATES_URL}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}

export const updateTemplate = async (id: number, data: UpdateTemplatePayload) => {
  const response = await apiClient.put<DocumentTemplate>(`${TEMPLATES_URL}/${id}`, data)
  return response.data
}

export const replaceTemplateFile = async (id: number, file: File) => {
  const formData = new FormData()
  formData.append('template', file)

  const response = await apiClient.put<DocumentTemplate>(`${TEMPLATES_URL}/${id}/file`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}

export const deleteTemplate = async (id: number) => {
  await apiClient.delete(`${TEMPLATES_URL}/${id}`)
}

export const getTemplatePreview = async (id: number) => {
  const response = await apiClient.get(`${TEMPLATES_URL}/${id}/preview`, {
    responseType: 'blob',
  })
  return response.data as Blob
}

export const generateDocument = async (payload: GenerateDocumentPayload) => {
  const response = await apiClient.post(`${TEMPLATES_URL}/generate`, payload, {
    responseType: 'blob',
  })
  return response.data as Blob
}

export const generateByEntity = async (payload: GenerateByEntityPayload) => {
  const response = await apiClient.post(`${TEMPLATES_URL}/generate-by-entity`, payload, {
    responseType: 'blob',
  })
  return response.data as Blob
}
