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
import { documentTypeConfigs } from '@/features/documents/lib/document-config'

interface Props {
  type: string
}

const CreateDocumentDialog = ({ type }: Props) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { FormComponent } = documentTypeConfigs[type]

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
        <FormComponent
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
