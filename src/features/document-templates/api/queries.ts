import { useQuery } from '@tanstack/react-query'

import { getTemplateById, getTemplates } from '@/features/document-templates/api/actions'
import { templateQueryKeys } from '@/features/document-templates/api/query-keys'

export function useTemplates(category?: string) {
  return useQuery({
    queryKey: templateQueryKeys.list(category),
    queryFn: () => getTemplates(category),
  })
}

export function useTemplate(id: number) {
  return useQuery({
    queryKey: templateQueryKeys.detail(id),
    queryFn: () => getTemplateById(id),
    enabled: id > 0,
  })
}
