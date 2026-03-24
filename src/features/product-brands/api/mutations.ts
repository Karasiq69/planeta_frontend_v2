import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createProductBrandFn } from '@/features/product-brands/api/actions'
import { productBrandQueryKeys } from '@/features/product-brands/api/query-keys'

import type { CreateProductBrandPayload } from '@/features/product-brands/api/actions'
import type { ApiError } from '@/types/api-error'

export function useCreateProductBrand() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateProductBrandPayload) => createProductBrandFn(data),
    onSuccess: () => {
      toast.success('Бренд создан')
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.message || 'Ошибка при создании бренда')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: productBrandQueryKeys.all })
    },
  })
}
