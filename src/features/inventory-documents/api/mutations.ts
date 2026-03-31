import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { confirmDocument } from './actions'

import type { QueryKey } from '@tanstack/react-query'

export const useConfirmDocument = (id: number, queryKeysToInvalidate: QueryKey[]) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (cashRegisterId?: number) => confirmDocument(id, cashRegisterId),
    onSuccess: () => {
      toast.success('Документ проведён')
      queryKeysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      )
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
