'use client'
import { SquarePlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

import { Button } from '@/components/ui/button'
import LoaderAnimated from '@/components/ui/LoaderAnimated'
import { useCreateReceiptDocument } from '@/features/inventory-documents/receipt/api/mutations'
import { InventoryDocumentType } from '@/features/inventory-documents/types'
import { RECEIPT_DOCUMENTS_URL } from '@/lib/constants'

interface CreateDocumentButtonProps {
  type?: InventoryDocumentType
  warehouseId?: number
  redirectAfterCreate?: boolean
  onSuccess?: (documentId: number) => void
}

const CreateReceiptDocumentButton = ({
  type = InventoryDocumentType.RECEIPT,
  warehouseId = 1,
  redirectAfterCreate = true,
  onSuccess,
  ...props
}: CreateDocumentButtonProps) => {
  const router = useRouter()
  const { mutate, isPending } = useCreateReceiptDocument()

  const handleCreateDocument = async () => {
    const newDocument = {
      warehouseId,
    }

    mutate(newDocument, {
      onSuccess: (data) => {
        router.push(`${RECEIPT_DOCUMENTS_URL}/${data.id}`)
      },
    })
  }

  return (
    <Button onClick={handleCreateDocument} disabled={isPending} {...props}>
      {isPending ? <LoaderAnimated className='mr-2' /> : <SquarePlus />}
      Создать документ
    </Button>
  )
}

export default CreateReceiptDocumentButton
