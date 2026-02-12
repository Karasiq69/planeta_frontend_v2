'use client'
import { PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

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
import { Separator } from '@/components/ui/separator'
import { useCreateOrder } from '@/features/orders/api/mutations'
import WithEmptyFields from '@/features/orders/components/create-order/with-empty-fields'
import WithSearchClient from '@/features/orders/components/create-order/with-search-client'
import { ORDERS_URL } from '@/lib/constants'

import type { IClient } from '@/features/clients/types'




const CreateOrderButton = () => {
  const router = useRouter()
  const { mutate: createOrder, isPending } = useCreateOrder()

  const handleSelectClient = (client: IClient) => {
    createOrder(
      { clientId: client.id },
      {
        onSuccess: (createdOrder) => {
          router.push(`${ORDERS_URL}/${createdOrder.id}`)
        },
      }
    )
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='default'>
          <PlusCircle className='mr-2 h-4 w-4' />
          Новый заказ
        </Button>
      </DialogTrigger>
      <DialogContent className='w-full max-w-4xl h-auto bg-muted'>
        <DialogHeader>
          <DialogTitle>Добавление нового заказа</DialogTitle>
          <DialogDescription>Выберите необходимую опцию и создайте заказ</DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-2 md:flex-row md:space-x-7'>
          {/*<WithSearchClient/>*/}
          <ClientCombobox handleSelect={handleSelectClient} />
          <Separator orientation="vertical" className="hidden md:block" />
          <WithEmptyFields />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateOrderButton
