import { receiptColumns } from '@/features/documents/components/columns/receipt-columns'

import type { Document } from '@/features/documents/api/actions'
import type { InventoryDocumentType } from '@/features/inventory-documents/types'
import type { ColumnDef } from '@tanstack/react-table'

export interface DocumentTypeConfig {
  title: string
  columns: ColumnDef<Document>[]
  type: InventoryDocumentType
}

export const documentTypeConfigs: Record<string, DocumentTypeConfig> = {
  receipt: {
    title: 'Приходные накладные',
    columns: receiptColumns,
    type: 'RECEIPT',
  },
  transfer: {
    title: 'Перемещения товаров',
    columns: [], // TODO: добавить колонки для перемещений
    type: 'TRANSFER',
  },
}
