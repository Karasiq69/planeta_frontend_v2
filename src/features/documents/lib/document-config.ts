import { receiptColumns } from '@/features/documents/components/columns/receipt-columns'
import { transferColumns } from '@/features/documents/components/columns/transfer-columns'
import CreateDocumentForm from '@/features/documents/components/forms/CreateDocumentForm'
import CreateTransferForm from '@/features/documents/components/forms/CreateTransferForm'
import ReceiptDocumentHeader from '@/features/documents/components/headers/ReceiptDocumentHeader'
import TransferDocumentHeader from '@/features/documents/components/headers/TransferDocumentHeader'
import ReceiptItemsSection from '@/features/documents/components/items-sections/ReceiptItemsSection'
import TransferItemsSection from '@/features/documents/components/items-sections/TransferItemsSection'
import { DocumentType } from '@/features/documents/lib/constants'

import type { Document } from '@/features/documents/types'
import type { ColumnDef } from '@tanstack/react-table'
import type { ComponentType } from 'react'

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
  ItemsSectionComponent: ComponentType<{ document: Document }>
}

export const documentTypeConfigs: Record<string, DocumentTypeConfig> = {
  receipt: {
    title: 'Приходные накладные',
    columns: receiptColumns,
    type: DocumentType.RECEIPT,
    FormComponent: CreateDocumentForm,
    HeaderComponent: ReceiptDocumentHeader,
    ItemsSectionComponent: ReceiptItemsSection,
  },
  transfer: {
    title: 'Перемещения товаров',
    columns: transferColumns,
    type: DocumentType.TRANSFER,
    FormComponent: CreateTransferForm,
    HeaderComponent: TransferDocumentHeader,
    ItemsSectionComponent: TransferItemsSection,
  },
}
