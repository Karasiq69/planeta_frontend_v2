import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createVatRateFn, updateVatRateFn, deleteVatRateFn } from './actions'
import { vatRatesQueryKeys } from './query-keys'

import type { CreateVatRatePayload, UpdateVatRatePayload } from '../types'

export function useCreateVatRate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateVatRatePayload) => createVatRateFn(data),
    onSuccess: () => {
      toast.success('Ставка НДС создана')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Ошибка при создании ставки НДС')
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: vatRatesQueryKeys.lists(),
      })
    },
  })
}

export function useUpdateVatRate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateVatRatePayload }) =>
      updateVatRateFn(id, data),
    onSuccess: (_, variables) => {
      toast.success('Ставка НДС обновлена')
      queryClient.invalidateQueries({
        queryKey: vatRatesQueryKeys.detail(variables.id),
      })
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Ошибка при обновлении ставки НДС')
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: vatRatesQueryKeys.lists(),
      })
    },
  })
}

export function useDeleteVatRate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteVatRateFn(id),
    onSuccess: () => {
      toast.success('Ставка НДС удалена')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Ошибка при удалении ставки НДС')
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: vatRatesQueryKeys.all,
      })
    },
  })
}
