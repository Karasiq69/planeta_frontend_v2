import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createEmailSettings, sendEmail, testEmailSettings, updateEmailSettings } from '@/features/email/api/actions'
import { emailQueryKeys } from '@/features/email/api/query-keys'

import type { SendEmailPayload, SmtpSettingsPayload } from '@/features/email/types'
import type { ApiError } from '@/types/api-error'

export function useSaveEmailSettings(isUpdate: boolean) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: SmtpSettingsPayload) =>
      isUpdate ? updateEmailSettings(data) : createEmailSettings(data),
    onSuccess: () => {
      toast.success('Настройки сохранены')
      queryClient.invalidateQueries({ queryKey: emailQueryKeys.settings() })
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.message || 'Ошибка сохранения настроек')
    },
  })
}

export function useTestEmail() {
  return useMutation({
    mutationFn: testEmailSettings,
    onSuccess: () => {
      toast.success('Тестовое письмо отправлено')
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.message || 'Ошибка отправки тестового письма')
    },
  })
}

export function useSendEmail() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: SendEmailPayload) => sendEmail(data),
    onSuccess: () => {
      toast.success('Письмо отправлено')
      queryClient.invalidateQueries({ queryKey: emailQueryKeys.logs() })
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.message || 'Ошибка отправки письма')
    },
  })
}
