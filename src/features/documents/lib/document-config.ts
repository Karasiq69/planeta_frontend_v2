import { expenseColumns } from '@/features/documents/components/columns/expense-columns'
import { receiptColumns } from '@/features/documents/components/columns/receipt-columns'
import { transferColumns } from '@/features/documents/components/columns/transfer-columns'
import { writeOffColumns } from '@/features/documents/components/columns/write-off-columns'
import CreateDocumentForm from '@/features/documents/components/forms/CreateDocumentForm'
import CreateExpenseForm from '@/features/documents/components/forms/CreateExpenseForm'
import CreateTransferForm from '@/features/documents/components/forms/CreateTransferForm'
import CreateWriteOffForm from '@/features/documents/components/forms/CreateWriteOffForm'
import ExpenseDocumentHeader from '@/features/documents/components/headers/ExpenseDocumentHeader'
import ReceiptDocumentHeader from '@/features/documents/components/headers/ReceiptDocumentHeader'
import TransferDocumentHeader from '@/features/documents/components/headers/TransferDocumentHeader'
import WriteOffDocumentHeader from '@/features/documents/components/headers/WriteOffDocumentHeader'
import ExpenseItemsSection from '@/features/documents/components/items-sections/ExpenseItemsSection'
import ReceiptItemsSection from '@/features/documents/components/items-sections/ReceiptItemsSection'
import TransferItemsSection from '@/features/documents/components/items-sections/TransferItemsSection'
import WriteOffItemsSection from '@/features/documents/components/items-sections/WriteOffItemsSection'
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
  expense: {
    title: 'Расходные документы',
    columns: expenseColumns,
    type: DocumentType.EXPENSE,
    FormComponent: CreateExpenseForm,
    HeaderComponent: ExpenseDocumentHeader,
    ItemsSectionComponent: ExpenseItemsSection,
  },
  'write-off': {
    title: 'Списания',
    columns: writeOffColumns,
    type: DocumentType.WRITE_OFF,
    FormComponent: CreateWriteOffForm,
    HeaderComponent: WriteOffDocumentHeader,
    ItemsSectionComponent: WriteOffItemsSection,
  },
}
