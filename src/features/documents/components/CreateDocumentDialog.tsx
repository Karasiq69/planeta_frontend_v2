'use client'

import { SquarePlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
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

import type { DocumentType } from '@/features/documents/types'

interface Props {
  type: string
  documentType: DocumentType
}

const CreateDocumentDialog = ({ type, documentType }: Props) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <SquarePlus />
          Создать документ
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Новый документ</DialogTitle>
        </DialogHeader>
        <CreateDocumentForm
          type={documentType}
          onSuccess={(id) => {
            setOpen(false)
            router.push(`/documents/${type}/${id}`)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

export default CreateDocumentDialog
