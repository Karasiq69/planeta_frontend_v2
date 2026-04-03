import apiClient from '@/lib/auth/client'
import { EMAIL_LOGS_URL, EMAIL_SEND_URL, EMAIL_SETTINGS_URL } from '@/lib/constants'

import type { EmailLog, EmailLogsParams, SendEmailPayload, SmtpSettings, SmtpSettingsPayload } from '@/features/email/types'
import type { ListResponse } from '@/types/params'

export const getEmailSettings = async (): Promise<SmtpSettings> => {
  const res = await apiClient.get<SmtpSettings>(EMAIL_SETTINGS_URL)
  return res.data
}

export const createEmailSettings = async (data: SmtpSettingsPayload): Promise<SmtpSettings> => {
  const res = await apiClient.post<SmtpSettings>(EMAIL_SETTINGS_URL, data)
  return res.data
}

export const updateEmailSettings = async (data: SmtpSettingsPayload): Promise<SmtpSettings> => {
  const res = await apiClient.put<SmtpSettings>(EMAIL_SETTINGS_URL, data)
  return res.data
}

export const testEmailSettings = async (email: string): Promise<void> => {
  await apiClient.post(`${EMAIL_SETTINGS_URL}/test`, { email })
}

export const sendEmail = async (data: SendEmailPayload): Promise<EmailLog> => {
  const res = await apiClient.post<EmailLog>(EMAIL_SEND_URL, data)
  return res.data
}

export const getEmailLogs = async (params: EmailLogsParams): Promise<ListResponse<EmailLog>> => {
  const res = await apiClient.get<ListResponse<EmailLog>>(EMAIL_LOGS_URL, { params })
  return res.data
}
