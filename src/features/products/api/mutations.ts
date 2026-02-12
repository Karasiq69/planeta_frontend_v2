import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { productsQueryKeys } from '@/features/products/api/query-keys'
import apiClient from '@/lib/auth/client'
import { PRODUCTS_URL } from '@/lib/constants'

import type { Product } from '@/features/products/types'
import type { ApiError } from '@/types/api-error'

export function useCreateProduct() {
  const queryClient = useQueryClient()

  const createProductFn = async (data: Partial<Product>) => {
    const response = await apiClient.post<Product>(`${PRODUCTS_URL}/`, data)
    return response.data
  }

  return useMutation({
    mutationFn: createProductFn,
    onSuccess: (createdProduct, variables) => {
      toast.success('Продукт создан')
      queryClient.invalidateQueries({
        queryKey: productsQueryKeys.all,
      })
    },
    onError: (error: ApiError) => {
      const errorMessage = error.response?.data?.message || 'Произошла ошибка при создании продукта'
      toast.error(errorMessage)
    },
    onSettled: () => {},
  })
}

export function useEditProduct(productId: number) {
  const queryClient = useQueryClient()

  const editProductFn = async (updatedProduct: Partial<Product>) => {
    const response = await apiClient.put<Product>(`${PRODUCTS_URL}/${productId}/`, updatedProduct)
    return response.data
  }

  return useMutation({
    mutationFn: editProductFn,
    onSuccess: () => {
      toast.success('Продукт изменен')
      // Инвалидируем список продуктов
      queryClient.invalidateQueries({
        queryKey: productsQueryKeys.all,
      })
      // Инвалидируем детальную информацию о продукте
      queryClient.invalidateQueries({
        queryKey: productsQueryKeys.detail(productId),
      })
    },
    onError: () => {
      toast.error('Произошла ошибка, повторите попытку')
    },
    onSettled: () => {},
  })
}
