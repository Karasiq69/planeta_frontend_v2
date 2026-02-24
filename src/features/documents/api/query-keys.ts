import type { DocumentsQueryParams } from './actions'

export const documentsQueryKeys = {
  all: ['documents'] as const,
  lists: () => [...documentsQueryKeys.all, 'list'] as const,
  list: (params: DocumentsQueryParams) => [...documentsQueryKeys.lists(), { params }] as const,
}
