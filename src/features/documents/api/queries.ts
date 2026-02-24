import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getDocumentItems, getDocuments } from './actions'
import { documentsQueryKeys } from './query-keys'

import type { DocumentsQueryParams } from '@/features/documents/types'

export const useDocumentsList = (params: DocumentsQueryParams = {}) => {
  return useQuery({
    queryKey: documentsQueryKeys.list(params),
    queryFn: () => getDocuments(params),
    placeholderData: keepPreviousData,
  })
}

export const useDocumentItems = (documentId: number) => {
  return useQuery({
    queryKey: documentsQueryKeys.items(documentId),
    queryFn: () => getDocumentItems(documentId),
    enabled: !!documentId,
  })
}
