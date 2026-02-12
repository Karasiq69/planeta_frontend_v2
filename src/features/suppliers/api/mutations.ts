import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'


import { createSupplierFn, updateSupplierFn, deleteSupplierFn } from './actions'
import { suppliersQueryKeys } from './query-keys'

import type { Supplier } from '@/features/suppliers/types'

// Хук для создания нового поставщика
export function useCreateSupplier() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<Supplier>) => createSupplierFn(data),
    onSuccess: () => {
      toast.success('Поставщик успешно создан')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Произошла ошибка при создании поставщика')
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: suppliersQueryKeys.lists(),
      })
    },
  })
}

// Хук для обновления существующего поставщика
export function useUpdateSupplier() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Supplier> }) =>
      updateSupplierFn(id, data),
    onSuccess: (_, variables) => {
      toast.success('Поставщик успешно обновлен')
      queryClient.invalidateQueries({
        queryKey: suppliersQueryKeys.detail(variables.id),
      })
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Произошла ошибка при обновлении поставщика')
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: suppliersQueryKeys.lists(),
      })
    },
  })
}

// Хук для удаления поставщика
export function useDeleteSupplier() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteSupplierFn(id),
    onSuccess: () => {
      toast.success('Поставщик успешно удален')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Произошла ошибка при удалении поставщика')
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: suppliersQueryKeys.all,
      })
    },
  })
}

// Хук для переключения статуса активности поставщика
export function useToggleSupplierActive() {
  const queryClient = useQueryClient()
  const updateMutation = useUpdateSupplier()

  return useMutation({
    mutationFn: ({ id, isActive }: { id: number; isActive: boolean }) =>
      updateSupplierFn(id, { isActive }),
    onSuccess: (_, variables) => {
      toast.success(`Поставщик ${variables.isActive ? 'активирован' : 'деактивирован'}`)
      queryClient.invalidateQueries({
        queryKey: suppliersQueryKeys.detail(variables.id),
      })
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Произошла ошибка')
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: suppliersQueryKeys.lists(),
      })
      queryClient.invalidateQueries({
        queryKey: suppliersQueryKeys.active(),
      })
    },
  })
}
