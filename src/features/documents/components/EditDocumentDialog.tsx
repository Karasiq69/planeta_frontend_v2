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
import { useUpdateDocument } from '@/features/documents/api/mutations'
import { documentTypeConfigs } from '@/features/documents/lib/document-config'

import type { Document } from '@/features/documents/types'

const documentTypeToKey: Record<string, string> = {
  RECEIPT: 'receipt',
  TRANSFER: 'transfer',
}

const getDefaultValues = (document: Document) => ({
  warehouseId: document.warehouseId ?? undefined,
  fromWarehouseId: document.fromWarehouseId ?? undefined,
  supplierId: document.supplierId ?? undefined,
  organizationId: document.organizationId ?? undefined,
  orderId: document.orderId ?? undefined,
  incomingNumber: document.incomingNumber ?? '',
  incomingDate: document.incomingDate ? new Date(document.incomingDate) : undefined,
  operationType: document.operationType ?? undefined,
  note: document.note ?? '',
})

interface Props {
  document: Document
  disabled?: boolean
}

const EditDocumentDialog = ({ document, disabled }: Props) => {
  const [open, setOpen] = useState(false)
  const { mutate } = useUpdateDocument(document.id)

  const configKey = documentTypeToKey[document.type]
  const config = configKey ? documentTypeConfigs[configKey] : undefined
  if (!config) return null

  const { FormComponent } = config

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
        <FormComponent
          defaultValues={getDefaultValues(document)}
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
