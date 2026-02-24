import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createDocument } from './actions'
import { documentsQueryKeys } from './query-keys'

import type { CreateDocumentDto } from './actions'

export const useCreateDocument = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateDocumentDto) => createDocument(data),
    onSuccess: () => {
      toast.success('Документ создан')
      queryClient.invalidateQueries({ queryKey: documentsQueryKeys.lists() })
    },
    onError: (error) => {
      toast.error(`Ошибка при создании документа: ${error.message}`)
    },
  })
}
