import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'


import { createOrganizationFn, updateOrganizationFn, deleteOrganizationFn } from './actions'
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
      toast.error(error.response?.data?.message || 'Произошла ошибка при удалении организации')
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: organizationsQueryKeys.all,
      })
    },
  })
}
