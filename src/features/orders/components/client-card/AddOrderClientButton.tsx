import { CirclePlus, Search, UserRoundPlus } from 'lucide-react'
import { useParams } from 'next/navigation'
import React from 'react'

import ClientCombobox from '@/components/clients/ClientCombobox'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ClientForm from '@/features/clients/components/forms/ClientForm'
import { useEditOrderClient } from '@/features/orders/api/mutations'

import type { IClient } from '@/features/clients/types'


type Props = {}
const AddOrderClientButton = (props: Props) => {
  const { id } = useParams()
  const { mutate, isPending } = useEditOrderClient(Number(id))

  const handleSelect = (client: IClient) => {
    mutate({ clientId: client.id })
  }

  const onCreate = (client: IClient) => {
    mutate({ clientId: client.id })
  }
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='secondary' className='flex items-center gap-2'>
            <UserRoundPlus size={16} />
            Добавить клиента
          </Button>
        </DialogTrigger>
        <DialogContent className='w-full   h-auto '>
          <DialogHeader>
            <DialogTitle>Добавление клиента</DialogTitle>
            <DialogDescription>Выберите необходимую опцию</DialogDescription>
          </DialogHeader>
          <div>
            <Tabs defaultValue='findClient' className=''>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value='findClient' className="gap-1">
                  <Search size={16} /> Найти клиента
                </TabsTrigger>
                <TabsTrigger value='newClient' className="gap-1">
                  <CirclePlus size={16} />
                  Создать клиента
                </TabsTrigger>
              </TabsList>
              <TabsContent value='findClient'>
                <ClientCombobox handleSelect={handleSelect} />
              </TabsContent>
              <TabsContent value='newClient'>
                <ClientForm onCreate={onCreate} />
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
export default AddOrderClientButton
