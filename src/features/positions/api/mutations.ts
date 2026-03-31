import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createPositionFn, updatePositionFn, deletePositionFn } from './actions'
import { positionsQueryKeys } from './query-keys'
import type { CreatePositionPayload, UpdatePositionPayload } from '../types'

export function useCreatePosition() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreatePositionPayload) => createPositionFn(data),
    onSuccess: () => {
      toast.success('Должность создана')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Ошибка при создании должности')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: positionsQueryKeys.lists() })
    },
  })
}

export function useUpdatePosition() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePositionPayload }) =>
      updatePositionFn(id, data),
    onSuccess: () => {
      toast.success('Должность обновлена')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Ошибка при обновлении должности')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: positionsQueryKeys.lists() })
    },
  })
}

export function useDeletePosition() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deletePositionFn(id),
    onSuccess: () => {
      toast.success('Должность удалена')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Ошибка при удалении должности')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: positionsQueryKeys.all })
    },
  })
}
