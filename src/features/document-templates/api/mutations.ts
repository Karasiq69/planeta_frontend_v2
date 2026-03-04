import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  deleteTemplate,
  generateByEntity,
  generateDocument,
  getTemplatePreview,
  replaceTemplateFile,
  updateTemplate,
  uploadTemplate,
} from '@/features/document-templates/api/actions'
import { templateQueryKeys } from '@/features/document-templates/api/query-keys'

import type {
  GenerateByEntityPayload,
  GenerateDocumentPayload,
  UpdateTemplatePayload,
  UploadTemplatePayload,
} from '@/features/document-templates/types'

export function useUploadTemplate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UploadTemplatePayload) => uploadTemplate(payload),
    onSuccess: () => {
      toast.success('Шаблон загружен')
      queryClient.invalidateQueries({ queryKey: templateQueryKeys.all })
    },
    onError: () => {
      toast.error('Ошибка загрузки шаблона')
    },
  })
}

export function useUpdateTemplate(id: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateTemplatePayload) => updateTemplate(id, data),
    onSuccess: () => {
      toast.success('Шаблон обновлён')
      queryClient.invalidateQueries({ queryKey: templateQueryKeys.all })
    },
    onError: () => {
      toast.error('Ошибка обновления шаблона')
    },
  })
}

export function useReplaceTemplateFile(id: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (file: File) => replaceTemplateFile(id, file),
    onSuccess: () => {
      toast.success('Файл шаблона заменён')
      queryClient.invalidateQueries({ queryKey: templateQueryKeys.all })
    },
    onError: () => {
      toast.error('Ошибка замены файла')
    },
  })
}

export function useDeleteTemplate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteTemplate(id),
    onSuccess: () => {
      toast.success('Шаблон удалён')
      queryClient.invalidateQueries({ queryKey: templateQueryKeys.all })
    },
    onError: () => {
      toast.error('Ошибка удаления шаблона')
    },
  })
}

export function usePreviewTemplate() {
  return useMutation({
    mutationFn: (id: number) => getTemplatePreview(id),
    onError: () => {
      toast.error('Ошибка генерации превью')
    },
  })
}

export function useGenerateDocument() {
  return useMutation({
    mutationFn: (payload: GenerateDocumentPayload) => generateDocument(payload),
    onError: () => {
      toast.error('Ошибка генерации документа')
    },
  })
}

export function useGenerateByEntity() {
  return useMutation({
    mutationFn: (payload: GenerateByEntityPayload) => generateByEntity(payload),
    onError: () => {
      toast.error('Ошибка генерации документа по сущности')
    },
  })
}
