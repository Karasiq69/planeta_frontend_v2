import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createWarehouseFn, updateWarehouseFn } from './actions'
import { warehouseQueryKeys } from './query-keys'

import type { Warehouse } from '@/features/warehouse/types'

export function useCreateWarehouse() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<Warehouse>) => createWarehouseFn(data),
    onSuccess: () => {
      toast.success('Склад создан')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: warehouseQueryKeys.list() })
    },
  })
}

export function useUpdateWarehouse() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Warehouse> }) =>
      updateWarehouseFn(id, data),
    onSuccess: () => {
      toast.success('Склад обновлён')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: warehouseQueryKeys.list() })
    },
  })
}
