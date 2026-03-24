import { useQuery } from '@tanstack/react-query'

import { validateInviteFn } from './actions'

export const useValidateInvite = (token: string) => {
  return useQuery({
    queryKey: ['invite', token],
    queryFn: () => validateInviteFn(token),
    retry: false,
  })
}
