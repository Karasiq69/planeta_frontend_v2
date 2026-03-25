import { getTypeConfig } from '@/helpers/get-type-config'

import type { TypeConfig, TypeMapping } from '@/types'

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

export const OperationType = {
  TRANSFER: 'TRANSFER',
  WRITE_OFF: 'WRITE_OFF',
  SEND_TO_REPAIR: 'SEND_TO_REPAIR',
  TRANSFER_IN_REPAIR: 'TRANSFER_IN_REPAIR',
  RETURN_FROM_REPAIR: 'RETURN_FROM_REPAIR',
  RETURN_FROM_OPERATION: 'RETURN_FROM_OPERATION',
} as const
export type OperationType = (typeof OperationType)[keyof typeof OperationType]

export const operationLabels: Record<string, string> = {
  [OperationType.TRANSFER]: 'Перемещение',
  [OperationType.WRITE_OFF]: 'Списание',
  [OperationType.SEND_TO_REPAIR]: 'Передача в ремонт',
  [OperationType.TRANSFER_IN_REPAIR]: 'Передача внутри ремонта',
  [OperationType.RETURN_FROM_REPAIR]: 'Возврат из ремонта',
  [OperationType.RETURN_FROM_OPERATION]: 'Возврат из эксплуатации',
}

export const documentTypeConfig: TypeMapping = {
  [DocumentType.RECEIPT]: {
    label: 'Поступление',
    variant: 'success',
    description: 'Поступление товаров',
  },
  [DocumentType.TRANSFER]: {
    label: 'Перемещение',
    variant: 'info',
    description: 'Перемещение товаров',
  },
  [DocumentType.EXPENSE]: {
    label: 'Расход',
    variant: 'warning',
    description: 'Расход товаров',
  },
  [DocumentType.WRITE_OFF]: {
    label: 'Списание',
    variant: 'destructive',
    description: 'Списание товаров',
  },
}

export const getDocumentTypeConfig = (type: DocumentType): TypeConfig => {
  return getTypeConfig(type, documentTypeConfig, 'Неизвестный тип документа')
}

export const getDocumentTypeLabel = (type: DocumentType): string => {
  return getDocumentTypeConfig(type).label
}
