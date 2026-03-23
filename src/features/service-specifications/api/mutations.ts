import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  addSpecProductFn,
  addSpecServiceFn,
  createSpecificationFn,
  deleteSpecProductFn,
  deleteSpecServiceFn,
  deleteSpecificationFn,
  updateSpecificationFn,
  updateSpecServiceFn,
  updateSpecProductFn,
} from './actions'
import { specificationQueryKeys } from './query-keys'

import type { CreateSpecification, CreateSpecProduct, CreateSpecService } from '@/features/service-specifications/types'

export function useCreateSpecification() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateSpecification) => createSpecificationFn(data),
    onSuccess: () => toast.success('Спецификация создана'),
    onError: () => toast.error('Произошла ошибка, повторите попытку'),
    onSettled: () => queryClient.invalidateQueries({ queryKey: specificationQueryKeys.all }),
  })
}

export function useUpdateSpecification() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreateSpecification> }) =>
      updateSpecificationFn(id, data),
    onSuccess: () => toast.success('Спецификация обновлена'),
    onError: () => toast.error('Произошла ошибка, повторите попытку'),
    onSettled: () => queryClient.invalidateQueries({ queryKey: specificationQueryKeys.all }),
  })
}

export function useDeleteSpecification() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteSpecificationFn(id),
    onSuccess: () => toast.success('Спецификация удалена'),
    onError: () => toast.error('Произошла ошибка, повторите попытку'),
    onSettled: () => queryClient.invalidateQueries({ queryKey: specificationQueryKeys.all }),
  })
}

export function useAddSpecService(specId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateSpecService) => addSpecServiceFn(specId, data),
    onSuccess: () => toast.success('Услуга добавлена'),
    onError: (error) => toast.error(error.message || 'Произошла ошибка'),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: specificationQueryKeys.detail(specId) }),
  })
}

export function useUpdateSpecService(specId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ itemId, data }: { itemId: number; data: { defaultDuration?: number; discountPercent?: number } }) =>
      updateSpecServiceFn(specId, itemId, data),
    onSuccess: () => toast.success('Услуга обновлена'),
    onError: () => toast.error('Произошла ошибка'),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: specificationQueryKeys.detail(specId) }),
  })
}

export function useDeleteSpecService(specId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (itemId: number) => deleteSpecServiceFn(specId, itemId),
    onSuccess: () => toast.success('Услуга удалена'),
    onError: () => toast.error('Произошла ошибка'),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: specificationQueryKeys.detail(specId) }),
  })
}

export function useAddSpecProduct(specId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateSpecProduct) => addSpecProductFn(specId, data),
    onSuccess: () => toast.success('Товар добавлен'),
    onError: (error) => toast.error(error.message || 'Произошла ошибка'),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: specificationQueryKeys.detail(specId) }),
  })
}

export function useUpdateSpecProduct(specId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ itemId, data }: { itemId: number; data: { quantity?: number; discountPercent?: number } }) =>
      updateSpecProductFn(specId, itemId, data),
    onSuccess: () => toast.success('Товар обновлен'),
    onError: () => toast.error('Произошла ошибка'),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: specificationQueryKeys.detail(specId) }),
  })
}

export function useDeleteSpecProduct(specId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (itemId: number) => deleteSpecProductFn(specId, itemId),
    onSuccess: () => toast.success('Товар удален'),
    onError: () => toast.error('Произошла ошибка'),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: specificationQueryKeys.detail(specId) }),
  })
}
