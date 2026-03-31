'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { useConfirmDocument } from '@/features/documents/api/mutations'
import EditDocumentDialog from '@/features/documents/components/EditDocumentDialog'
import { DocumentStatus, DocumentType } from '@/features/documents/types'
import CashRegisterSelectDialog from '@/features/inventory-documents/components/CashRegisterSelectDialog'

import type { Document } from '@/features/documents/types'

const TYPES_REQUIRING_CASH_REGISTER = new Set<string>([
  DocumentType.RECEIPT,
  DocumentType.EXPENSE,
])

interface Props {
  document: Document
}

const DocumentActions = ({ document }: Props) => {
  const isDraft = document.status === DocumentStatus.DRAFT
  const needsCashRegister = TYPES_REQUIRING_CASH_REGISTER.has(document.type)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { mutate: confirm, isPending } = useConfirmDocument(document.id)

  const handleConfirm = () => {
    if (needsCashRegister) {
      setDialogOpen(true)
    } else {
      confirm(undefined)
    }
  }

  const handleCashRegisterConfirm = (cashRegisterId: number) => {
    confirm(cashRegisterId, {
      onSuccess: () => setDialogOpen(false),
    })
  }

  return (
    <>
      <EditDocumentDialog document={document} disabled={!isDraft} />
      <Button disabled={!isDraft || isPending} onClick={handleConfirm}>
        {isPending ? 'Проведение...' : 'Провести'}
      </Button>

      {needsCashRegister && (
        <CashRegisterSelectDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onConfirm={handleCashRegisterConfirm}
          isPending={isPending}
        />
      )}
    </>
  )
}

export default DocumentActions
