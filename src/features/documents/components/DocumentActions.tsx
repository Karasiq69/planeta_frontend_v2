'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { useConfirmDocument, usePayDocument } from '@/features/documents/api/mutations'
import EditDocumentDialog from '@/features/documents/components/EditDocumentDialog'
import CashRegisterSelectDialog from '@/features/documents/components/CashRegisterSelectDialog'
import { DocumentStatus, DocumentType } from '@/features/documents/types'

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
  const isConfirmed = document.status === DocumentStatus.CONFIRMED
  const needsCashRegister = TYPES_REQUIRING_CASH_REGISTER.has(document.type)
  const canPay = isConfirmed && needsCashRegister

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [payDialogOpen, setPayDialogOpen] = useState(false)

  const { mutate: confirm, isPending: isConfirming } = useConfirmDocument(document.id)
  const { mutate: pay, isPending: isPaying } = usePayDocument(document.id)

  const handleConfirm = () => {
    if (needsCashRegister) {
      setConfirmDialogOpen(true)
    } else {
      confirm(undefined)
    }
  }

  const handleCashRegisterConfirm = (cashRegisterId: number) => {
    confirm(cashRegisterId, {
      onSuccess: () => setConfirmDialogOpen(false),
    })
  }

  const handlePay = (cashRegisterId: number) => {
    pay(cashRegisterId, {
      onSuccess: () => setPayDialogOpen(false),
    })
  }

  return (
    <>
      <EditDocumentDialog document={document} disabled={!isDraft} />
      <Button disabled={!isDraft || isConfirming} onClick={handleConfirm}>
        {isConfirming ? 'Проведение...' : 'Провести'}
      </Button>

      {canPay && (
        <Button disabled={isPaying} onClick={() => setPayDialogOpen(true)}>
          {isPaying ? 'Оплата...' : 'Оплатить'}
        </Button>
      )}

      {needsCashRegister && (
        <CashRegisterSelectDialog
          open={confirmDialogOpen}
          onOpenChange={setConfirmDialogOpen}
          onConfirm={handleCashRegisterConfirm}
          isPending={isConfirming}
        />
      )}

      {canPay && (
        <CashRegisterSelectDialog
          open={payDialogOpen}
          onOpenChange={setPayDialogOpen}
          onConfirm={handlePay}
          isPending={isPaying}
          confirmLabel="Оплатить"
        />
      )}
    </>
  )
}

export default DocumentActions
