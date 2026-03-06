import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createCategoryFn, deleteCategoryFn, updateCategoryFn } from '@/features/product-categories/api/actions'
import { categoryQueryKeys } from '@/features/product-categories/api/query-keys'

import type { CategoryPayload } from '@/features/product-categories/api/actions'
import type { ApiError } from '@/types/api-error'

export function useCreateCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CategoryPayload) => createCategoryFn(data),
    onSuccess: () => {
      toast.success('Категория создана')
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.message || 'Ошибка при создании категории')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.all })
    },
  })
}

export function useUpdateCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CategoryPayload> }) => updateCategoryFn(id, data),
    onSuccess: () => {
      toast.success('Категория обновлена')
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.message || 'Ошибка при обновлении категории')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.all })
    },
  })
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteCategoryFn(id),
    onSuccess: () => {
      toast.success('Категория удалена')
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.message || 'Ошибка при удалении категории')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.all })
    },
  })
}
