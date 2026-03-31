'use client'
import { useState } from 'react'
import { useIsMutating } from '@tanstack/react-query'
import { CheckCheck, Save } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import LoaderAnimated from '@/components/ui/LoaderAnimated'
import { useConfirmDocument } from '@/features/inventory-documents/api/mutations'
import CashRegisterSelectDialog from '@/features/inventory-documents/components/CashRegisterSelectDialog'
import { useReceiptDocument } from '@/features/inventory-documents/receipt/api/queries'
import { receiptDocumentsQueryKeys } from '@/features/inventory-documents/receipt/api/query-keys'
import { InventoryDocumentStatus } from '@/features/inventory-documents/types'

type Props = {
  documentId: number
}

const ReceiptSubmitButton = ({ documentId }: Props) => {
  const isMutating = useIsMutating()
  const [dialogOpen, setDialogOpen] = useState(false)
  const { data } = useReceiptDocument(documentId)
  const { mutate: confirm, isPending: isConfirmPending } = useConfirmDocument(documentId, [
    receiptDocumentsQueryKeys.detail(documentId),
    receiptDocumentsQueryKeys.lists(),
  ])

  const handleDialogConfirm = (cashRegisterId: number) => {
    confirm(cashRegisterId, {
      onSuccess: () => setDialogOpen(false),
    })
  }

  const isDocumentEditable = data?.status === InventoryDocumentStatus.DRAFT

  return (
    <>
      {isDocumentEditable && (
        <>
          <Button
            type="button"
            size="sm"
            onClick={() => setDialogOpen(true)}
            disabled={isConfirmPending}
          >
            {isMutating > 0 ? (
              <LoaderAnimated className="text-primary-foreground" />
            ) : (
              <CheckCheck />
            )}
            Сохранить и провести
          </Button>
          <Button
            type="submit"
            size="sm"
            form="receiptDocumentForm"
            variant="outline"
            disabled={isMutating > 0}
          >
            {isMutating > 0 ? <LoaderAnimated className="text-primary-foreground" /> : <Save />}
            Сохранить черновик
          </Button>

          <CashRegisterSelectDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            onConfirm={handleDialogConfirm}
            isPending={isConfirmPending}
          />
        </>
      )}
    </>
  )
}

export default ReceiptSubmitButton
