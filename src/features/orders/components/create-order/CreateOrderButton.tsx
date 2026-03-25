'use client'

import { FilePlus2, PlusCircle } from 'lucide-react'
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
        <DialogContent className="max-w-sm p-0 gap-0 overflow-hidden bg-muted">
          <DialogHeader className="px-5 pt-5 pb-0">
            <DialogTitle className="text-lg">Новый заказ-наряд</DialogTitle>
            <DialogDescription className="text-sm">
              Привяжите клиента или создайте пустой заказ
            </DialogDescription>
          </DialogHeader>

          <div className="px-4 pt-4 pb-4 space-y-3">
            <div className="rounded-lg border bg-card shadow-xs p-4">
              <p className="text-sm font-medium mb-2">Клиент</p>
              <ClientCombobox
                handleSelect={handleSelectClient}
                isPending={isPending}
                placeholder="Имя, телефон или компания..."
              />
            </div>

            <button
              onClick={handleCreateEmpty}
              disabled={isPending}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed py-3 text-sm text-muted-foreground transition-colors hover:border-solid hover:bg-card hover:text-foreground hover:shadow-xs disabled:opacity-50"
            >
              <FilePlus2 className="size-4" />
              Создать без клиента
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateOrderButton
