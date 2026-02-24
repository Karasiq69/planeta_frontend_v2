export const DocumentType = {
  RECEIPT: 'RECEIPT',
  TRANSFER: 'TRANSFER',
  EXPENSE: 'EXPENSE',
  WRITE_OFF: 'WRITE_OFF',
} as const
export type DocumentType = (typeof DocumentType)[keyof typeof DocumentType]

export const DocumentStatus = {
  DRAFT: 'DRAFT',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
} as const
export type DocumentStatus = (typeof DocumentStatus)[keyof typeof DocumentStatus]
