'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import CreateDocumentForm from '@/features/documents/components/CreateDocumentForm'
import { useUpdateReceiptDocument } from '@/features/inventory-documents/receipt/api/mutations'

import type { Document } from '@/features/documents/types'

interface Props {
  document: Document
  disabled?: boolean
}

const EditDocumentDialog = ({ document, disabled }: Props) => {
  const [open, setOpen] = useState(false)
  const { mutate, isPending } = useUpdateReceiptDocument(document.id)

  const defaultValues = {
    warehouseId: document.warehouseId ?? undefined,
    supplierId: document.supplierId ?? undefined,
    organizationId: document.organizationId ?? undefined,
    orderId: document.orderId ?? undefined,
    incomingNumber: document.incomingNumber ?? '',
    incomingDate: document.incomingDate
      ? new Date(document.incomingDate)
      : undefined,
    note: document.note ?? '',
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' disabled={disabled}>
          Редактировать
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактирование документа #{document.id}</DialogTitle>
        </DialogHeader>
        <CreateDocumentForm
          type={document.type}
          defaultValues={defaultValues}
          submitLabel='Сохранить'
          onSubmit={(values) => {
            mutate(values, {
              onSuccess: () => setOpen(false),
            })
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

export default EditDocumentDialog
