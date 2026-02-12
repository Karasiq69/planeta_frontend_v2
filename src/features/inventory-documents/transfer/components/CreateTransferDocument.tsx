'use client'
import { SquarePlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

import { Button } from '@/components/ui/button'
import LoaderAnimated from '@/components/ui/LoaderAnimated'
import { useCreateTransferDocument } from '@/features/inventory-documents/transfer/api/mutations'
import { InventoryDocumentType } from '@/features/inventory-documents/types'
import { TRANSFER_DOCUMENTS_URL } from '@/lib/constants'

interface CreateDocumentButtonProps {
  type?: InventoryDocumentType
  warehouseId?: number
  redirectAfterCreate?: boolean
  onSuccess?: (documentId: number) => void
}

const CreateTransferDocumentButton = ({
  type = InventoryDocumentType.TRANSFER,
  warehouseId = 1,
  redirectAfterCreate = true,
  onSuccess,
  ...props
}: CreateDocumentButtonProps) => {
  const router = useRouter()
  const { mutate, isPending } = useCreateTransferDocument()

  const handleCreateDocument = async () => {
    const newDocument = {
      warehouseId,
      sourceWarehouseId: 1,
      destinationWarehouseId: 1,
    }

    // @ts-ignore
    mutate(newDocument, {
      onSuccess: (data) => {
        router.push(`${TRANSFER_DOCUMENTS_URL}/${data.id}`)
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

export default CreateTransferDocumentButton
