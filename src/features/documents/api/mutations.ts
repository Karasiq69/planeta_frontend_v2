import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { addDocumentItem, createDocument, deleteDocumentItem, updateDocument, updateDocumentItem } from './actions'
import { documentsQueryKeys } from './query-keys'

import type { CreateDocumentDto, UpdateDocumentDto } from '@/features/documents/types'

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

export const useUpdateDocument = (id: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateDocumentDto) => updateDocument(id, data),
    onSuccess: () => {
      toast.success('Документ обновлён')
      queryClient.invalidateQueries({ queryKey: documentsQueryKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: documentsQueryKeys.lists() })
    },
    onError: (error) => {
      toast.error(`Ошибка при обновлении документа: ${error.message}`)
    },
  })
}

export const useAddDocumentItem = (documentId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { productId: number; quantity: number }) =>
      addDocumentItem(documentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: documentsQueryKeys.items(documentId) })
    },
    onError: (error) => {
      toast.error(`Ошибка при добавлении товара: ${error.message}`)
    },
  })
}

export const useUpdateDocumentItem = (documentId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { itemId: number; quantity?: number; price?: number; note?: string }) => {
      const { itemId, ...rest } = data
      return updateDocumentItem(documentId, itemId, rest)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: documentsQueryKeys.items(documentId) })
    },
    onError: (error) => {
      toast.error(`Ошибка при обновлении товара: ${error.message}`)
    },
  })
}

export const useDeleteDocumentItem = (documentId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (itemId: number) => deleteDocumentItem(documentId, itemId),
    onSuccess: () => {
      toast.success('Товар удалён')
      queryClient.invalidateQueries({ queryKey: documentsQueryKeys.items(documentId) })
    },
    onError: (error) => {
      toast.error(`Ошибка при удалении товара: ${error.message}`)
    },
  })
}
