'use client'
import { useIsMutating } from '@tanstack/react-query'
import { CheckCheck, Save } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import LoaderAnimated from '@/components/ui/LoaderAnimated'
import { useConfirmDocument } from '@/features/inventory-documents/api/mutations'
import { useTransferDocument } from '@/features/inventory-documents/transfer/api/queries'
import { transferDocumentsQueryKeys } from '@/features/inventory-documents/transfer/api/query-keys'
import { InventoryDocumentStatus } from '@/features/inventory-documents/types'

type Props = {
  documentId: number
}

const TransferSubmitButton = ({ documentId }: Props) => {
  const isMutating = useIsMutating()
  const { data } = useTransferDocument(documentId)
  const { mutate: confirm, isPending: isConfirmPending } = useConfirmDocument(documentId, [
    transferDocumentsQueryKeys.detail(documentId),
    transferDocumentsQueryKeys.lists(),
  ])

  const isDocumentEditable = data?.status === InventoryDocumentStatus.DRAFT

  return (
    <>
      {isDocumentEditable && (
        <>
          <Button
            type="button"
            size="sm"
            onClick={() => confirm(undefined)}
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
            form="transferDocumentForm"
            variant="outline"
            disabled={isMutating > 0}
          >
            {isMutating > 0 ? <LoaderAnimated className="text-primary-foreground" /> : <Save />}
            Сохранить черновик
          </Button>
        </>
      )}
    </>
  )
}

export default TransferSubmitButton
