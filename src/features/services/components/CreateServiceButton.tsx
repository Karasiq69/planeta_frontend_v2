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
import { ServiceForm } from '@/features/services/components/forms/ServiceForm'

const CreateServiceButton = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">
            <CirclePlus />
            Новая услуга
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Создание услуги</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <ServiceForm />
        </DialogContent>
      </Dialog>
    </>
  )
}
export default CreateServiceButton
