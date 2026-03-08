import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'


import {
  createOrganizationFn,
  updateOrganizationFn,
  deleteOrganizationFn,
  toggleOrganizationActiveFn,
} from './actions'
import { organizationsQueryKeys } from './query-keys'

import type { Organization } from '@/features/organizations/types'

// Хук для создания новой организации
export function useCreateOrganization() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<Organization>) => createOrganizationFn(data),
    onSuccess: () => {
      toast.success('Организация успешно создана')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Произошла ошибка при создании организации')
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: organizationsQueryKeys.lists(),
      })
    },
  })
}

// Хук для обновления существующей организации
export function useUpdateOrganization() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Organization> }) =>
      updateOrganizationFn(id, data),
    onSuccess: (_, variables) => {
      toast.success('Организация успешно обновлена')
      queryClient.invalidateQueries({
        queryKey: organizationsQueryKeys.detail(variables.id),
      })
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Произошла ошибка при обновлении организации')
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: organizationsQueryKeys.lists(),
      })
    },
  })
}

// Хук для удаления организации
export function useDeleteOrganization() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteOrganizationFn(id),
    onSuccess: () => {
      toast.success('Организация успешно удалена')
    },
    onError: (error: any) => {
      const message = error.response?.data?.message
      if (error.response?.status === 400 && message) {
        toast.error(message, {
          description: 'Вы можете отключить организацию вместо удаления',
        })
      } else {
        toast.error(message || 'Произошла ошибка при удалении организации')
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: organizationsQueryKeys.all,
      })
    },
  })
}

// Хук для переключения активности организации
export function useToggleOrganizationActive() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, isActive }: { id: number; isActive: boolean }) =>
      toggleOrganizationActiveFn(id, isActive),
    onSuccess: (_, variables) => {
      toast.success(variables.isActive ? 'Организация включена' : 'Организация отключена')
      queryClient.invalidateQueries({
        queryKey: organizationsQueryKeys.detail(variables.id),
      })
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || 'Произошла ошибка при изменении статуса организации'
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: organizationsQueryKeys.lists(),
      })
    },
  })
}
