import { CirclePlus } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import ClientForm from '@/features/clients/components/forms/ClientForm'

const CreateClientButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='default' size='sm'>
          <CirclePlus />
          Новый клиент
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создание клиента</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <ClientForm />
      </DialogContent>
    </Dialog>
  )
}
export default CreateClientButton
