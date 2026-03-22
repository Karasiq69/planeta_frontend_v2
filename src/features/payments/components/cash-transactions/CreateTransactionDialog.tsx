'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import CreateTransactionForm from './CreateTransactionForm'

interface CreateTransactionDialogProps {
  cashRegisterId: number
}

const CreateTransactionDialog = ({ cashRegisterId }: CreateTransactionDialogProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button size='sm' onClick={() => setOpen(true)}>
        <Plus className='size-4 mr-1.5' />
        Новая операция
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='max-w-lg'>
          <DialogHeader>
            <DialogTitle>Новая операция</DialogTitle>
          </DialogHeader>
          <CreateTransactionForm
            cashRegisterId={cashRegisterId}
            onSuccess={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateTransactionDialog
