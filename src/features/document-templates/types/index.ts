export type DocumentTemplate = {
  id: number
  name: string
  slug: string
  description: string | null
  documentCategory: string
  fileExtension: string
  outputFormat: string
  carboneTemplateId: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export type UploadTemplatePayload = {
  file: File
  name: string
  slug: string
  description?: string
  documentCategory: string
  outputFormat: string
}

export type UpdateTemplatePayload = {
  name?: string
  slug?: string
  description?: string
  documentCategory?: string
  outputFormat?: string
  isActive?: boolean
}

export type GenerateDocumentPayload = {
  templateId: number
  data: Record<string, unknown>
  outputFormat?: string
}

export type GenerateByEntityPayload = {
  templateSlug: string
  entityType: string
  entityId: number
  outputFormat?: string
}
