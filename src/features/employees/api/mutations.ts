import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createEmployeeFn, deleteEmployeeFn, inviteEmployeeFn, revokeInviteFn, transferEmployeeFn, updateEmployeeFn } from './actions'
import { employeesQueryKeys } from './query-keys'

import type { CreateEmployee, UpdateEmployee } from '@/features/employees/types'

export function useTransferEmployee() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, targetOrganizationId }: { id: number; targetOrganizationId: number }) =>
      transferEmployeeFn(id, { targetOrganizationId }),
    onSuccess: () => {
      toast.success('Сотрудник успешно переведён')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Ошибка при переводе сотрудника')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: employeesQueryKeys.lists() })
      queryClient.invalidateQueries({ queryKey: employeesQueryKeys.details() })
    },
  })
}

export function useCreateEmployee() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateEmployee) => createEmployeeFn(data),
    onSuccess: () => {
      toast.success('Сотрудник успешно создан')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Произошла ошибка при создании сотрудника')
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: employeesQueryKeys.lists(),
      })
    },
  })
}

export function useUpdateEmployee() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateEmployee }) => updateEmployeeFn(id, data),
    onSuccess: (_, variables) => {
      toast.success('Сотрудник успешно обновлён')
      queryClient.invalidateQueries({
        queryKey: employeesQueryKeys.detail(variables.id),
      })
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Произошла ошибка при обновлении сотрудника')
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: employeesQueryKeys.lists(),
      })
    },
  })
}

export function useDeleteEmployee() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteEmployeeFn(id),
    onSuccess: () => {
      toast.success('Сотрудник успешно удалён')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Произошла ошибка при удалении сотрудника')
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: employeesQueryKeys.all,
      })
    },
  })
}

export function useInviteEmployee() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ employeeId, data }: { employeeId: number; data: { email: string; role?: string } }) =>
      inviteEmployeeFn(employeeId, data),
    onSuccess: () => {
      toast.success('Приглашение создано')
    },
    onError: () => {
      toast.error('Ошибка при создании приглашения')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: employeesQueryKeys.lists() })
    },
  })
}

export function useRevokeInvite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (employeeId: number) => revokeInviteFn(employeeId),
    onSuccess: () => {
      toast.success('Приглашение отозвано')
    },
    onError: () => {
      toast.error('Ошибка при отзыве приглашения')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: employeesQueryKeys.lists() })
    },
  })
}
