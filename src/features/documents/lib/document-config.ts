import { DocumentType } from '@/features/documents/lib/constants'
import CreateDocumentForm from '@/features/documents/components/CreateDocumentForm'
import CreateTransferForm from '@/features/documents/components/CreateTransferForm'
import ReceiptDocumentHeader from '@/features/documents/components/ReceiptDocumentHeader'
import TransferDocumentHeader from '@/features/documents/components/TransferDocumentHeader'
import { receiptColumns } from '@/features/documents/components/columns/receipt-columns'
import { transferColumns } from '@/features/documents/components/columns/transfer-columns'

import type { ComponentType } from 'react'
import type { Document } from '@/features/documents/types'
import type { ColumnDef } from '@tanstack/react-table'

export interface DocumentFormProps {
  defaultValues?: Record<string, unknown>
  onSubmit?: (values: any) => void
  submitLabel?: string
  onSuccess?: (documentId: number) => void
}

export interface DocumentTypeConfig {
  title: string
  columns: ColumnDef<Document>[]
  type: DocumentType
  FormComponent: ComponentType<DocumentFormProps>
  HeaderComponent: ComponentType<{ document: Document }>
}

export const documentTypeConfigs: Record<string, DocumentTypeConfig> = {
  receipt: {
    title: 'Приходные накладные',
    columns: receiptColumns,
    type: DocumentType.RECEIPT,
    FormComponent: CreateDocumentForm,
    HeaderComponent: ReceiptDocumentHeader,
  },
  transfer: {
    title: 'Перемещения товаров',
    columns: transferColumns,
    type: DocumentType.TRANSFER,
    FormComponent: CreateTransferForm,
    HeaderComponent: TransferDocumentHeader,
  },
}
