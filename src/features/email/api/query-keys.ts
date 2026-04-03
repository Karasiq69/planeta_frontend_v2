import type { EmailLogsParams } from '@/features/email/types'

export const emailQueryKeys = {
  all: ['email'] as const,
  settings: () => [...emailQueryKeys.all, 'settings'] as const,
  logs: () => [...emailQueryKeys.all, 'logs'] as const,
  logsList: (params: EmailLogsParams) => [...emailQueryKeys.logs(), { params }] as const,
}
