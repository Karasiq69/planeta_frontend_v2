import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { acceptInviteFn } from './actions'

export function useAcceptInvite(token: string) {
  return useMutation({
    mutationFn: (data: { password: string }) => acceptInviteFn(token, data),
    onError: () => {
      toast.error('Ошибка при активации аккаунта')
    },
  })
}
