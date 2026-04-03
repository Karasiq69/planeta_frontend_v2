import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getEmailLogs, getEmailSettings } from '@/features/email/api/actions'
import { emailQueryKeys } from '@/features/email/api/query-keys'

import type { EmailLogsParams } from '@/features/email/types'

export function useEmailSettings() {
  return useQuery({
    queryKey: emailQueryKeys.settings(),
    queryFn: getEmailSettings,
    retry: false,
  })
}

export function useEmailLogs(params: EmailLogsParams) {
  return useQuery({
    queryKey: emailQueryKeys.logsList(params),
    queryFn: () => getEmailLogs(params),
    placeholderData: keepPreviousData,
  })
}
