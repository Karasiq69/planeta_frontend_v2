import type { DocumentsQueryParams } from '@/features/documents/types'

export const documentsQueryKeys = {
  all: ['documents'] as const,
  lists: () => [...documentsQueryKeys.all, 'list'] as const,
  list: (params: DocumentsQueryParams) => [...documentsQueryKeys.lists(), { params }] as const,
  detail: (id: number) => [...documentsQueryKeys.all, 'detail', id] as const,
  items: (documentId: number) => [...documentsQueryKeys.all, 'items', documentId] as const,
}
