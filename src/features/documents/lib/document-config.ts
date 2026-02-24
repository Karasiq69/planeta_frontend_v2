import { DocumentType } from '@/features/documents/lib/constants'
import { receiptColumns } from '@/features/documents/components/columns/receipt-columns'

import type { Document } from '@/features/documents/types'
import type { ColumnDef } from '@tanstack/react-table'

export interface DocumentTypeConfig {
  title: string
  columns: ColumnDef<Document>[]
  type: DocumentType
}

export const documentTypeConfigs: Record<string, DocumentTypeConfig> = {
  receipt: {
    title: 'Приходные накладные',
    columns: receiptColumns,
    type: DocumentType.RECEIPT,
  },
  transfer: {
    title: 'Перемещения товаров',
    columns: [],
    type: DocumentType.TRANSFER,
  },
}
