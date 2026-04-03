export interface SmtpSettings {
  id: number
  host: string
  port: number
  secure: boolean
  user: string
  password?: string
  fromName: string
  fromEmail: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface SmtpSettingsPayload {
  host: string
  port: number
  secure: boolean
  user: string
  password: string
  fromName: string
  fromEmail: string
  isActive: boolean
}

export interface SendEmailPayload {
  recipientEmail: string
  subject: string
  body: string
  orderId?: number
  clientId?: number
  attachments?: EmailAttachment[]
}

export interface EmailAttachment {
  templateSlug: string
  entityType: string
  entityId: number
}

export interface EmailLog {
  id: number
  recipientEmail: string
  subject: string
  body: string
  status: EmailStatus
  errorMessage: string | null
  sentAt: string | null
  orderId: number | null
  clientId: number | null
  senderName: string | null
  createdAt: string
}

export type EmailStatus = 'pending' | 'sent' | 'failed'

export interface EmailLogsParams {
  page?: number
  pageSize?: number
  clientId?: number
  orderId?: number
}
