'use client'

import { FilePlus2, PlusCircle, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import ClientCombobox from '@/components/clients/ClientCombobox'
import { AppButton } from '@/components/ds/base/AppButton'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useCreateOrder } from '@/features/orders/api/mutations'
import { ORDERS_URL } from '@/lib/constants'

import type { IClient } from '@/features/clients/types'

const CreateOrderButton = ({ label = 'Новый заказ' }: { label?: string }) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { mutate: createOrder, isPending } = useCreateOrder()

  const handleSelectClient = (client: IClient) => {
    createOrder(
      { clientId: client.id },
      {
        onSuccess: (createdOrder) => {
          setOpen(false)
          router.push(`${ORDERS_URL}/${createdOrder.id}`)
        },
      }
    )
  }

  const handleCreateEmpty = () => {
    createOrder(
      {},
      {
        onSuccess: (createdOrder) => {
          setOpen(false)
          router.push(`${ORDERS_URL}/${createdOrder.id}`)
        },
      }
    )
  }

  return (
    <>
      <AppButton icon={PlusCircle} size="sm" onClick={() => setOpen(true)}>
        {label}
      </AppButton>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md p-0 gap-0 overflow-hidden">
          <div className="bg-primary/5 px-8 pt-8 pb-6 border-b">
            <DialogHeader>
              <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <Search className="size-5" />
              </div>
              <DialogTitle className="text-xl">Новый заказ-наряд</DialogTitle>
              <DialogDescription className="mt-1">
                Найдите клиента для привязки к заказу
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="px-8 py-8 space-y-6">
            <ClientCombobox
              handleSelect={handleSelectClient}
              isPending={isPending}
              placeholder="Имя, телефон или компания..."
            />

            <div className="relative flex items-center py-1">
              <div className="flex-1 border-t" />
              <span className="px-4 text-xs text-muted-foreground">или</span>
              <div className="flex-1 border-t" />
            </div>

            <button
              onClick={handleCreateEmpty}
              disabled={isPending}
              className="flex w-full items-center justify-center gap-2 py-2 text-sm text-muted-foreground rounded-md transition-colors hover:text-foreground hover:bg-muted disabled:opacity-50"
            >
              <FilePlus2 className="size-3.5" />
              Создать без клиента
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateOrderButton
