import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { type DocumentsQueryParams, getDocuments } from './actions'
import { documentsQueryKeys } from './query-keys'


export const useDocumentsList = (params: DocumentsQueryParams = {}) => {
  return useQuery({
    queryKey: documentsQueryKeys.list(params),
    queryFn: () => getDocuments(params),
    placeholderData: keepPreviousData,
  })
}
