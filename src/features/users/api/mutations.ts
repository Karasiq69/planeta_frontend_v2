import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createUserFn, deleteUserFn, updateUserFn } from './actions'
import { usersQueryKeys } from './query-keys'

import type { CreateUser, UpdateUser } from '@/features/users/types'

export function useCreateUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateUser) => createUserFn(data),
    onSuccess: () => {
      toast.success('Пользователь успешно создан')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Ошибка при создании пользователя')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: usersQueryKeys.lists() })
      queryClient.invalidateQueries({ queryKey: usersQueryKeys.unlinked() })
    },
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUser }) => updateUserFn(id, data),
    onSuccess: (_, variables) => {
      toast.success('Пользователь успешно обновлён')
      queryClient.invalidateQueries({ queryKey: usersQueryKeys.detail(variables.id) })
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Ошибка при обновлении пользователя')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: usersQueryKeys.lists() })
      queryClient.invalidateQueries({ queryKey: usersQueryKeys.unlinked() })
    },
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteUserFn(id),
    onSuccess: () => {
      toast.success('Пользователь деактивирован')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Ошибка при деактивации пользователя')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: usersQueryKeys.all })
    },
  })
}
