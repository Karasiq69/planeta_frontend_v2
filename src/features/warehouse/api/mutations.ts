import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createServiceFn } from '@/features/services/api/actions'
import { servicesQueryKeys } from '@/features/services/api/query-keys'

import type { ServiceFormData } from '@/features/services/components/forms/schema'

export function useCreateService() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ServiceFormData) => createServiceFn(data),
    onSuccess: () => {
      toast.success('Услуга создана')
    },
    onError: () => {
      toast.error('Произошла ошибка, повторите попытку')
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: servicesQueryKeys.all,
      })
    },
  })
}
