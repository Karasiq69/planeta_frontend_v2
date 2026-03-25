'use client'

import { FilePlus2, PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import ClientCombobox from '@/components/clients/ClientCombobox'
import { AppButton } from '@/components/ds/base/AppButton'
import { AppDialog } from '@/components/ds/base/AppDialog'
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

      <AppDialog
        open={open}
        onOpenChange={setOpen}
        title="Новый заказ-наряд"
        description="Найдите клиента или создайте заказ без привязки"
        size="sm"
      >
        <div className="space-y-4">
          <ClientCombobox
            handleSelect={handleSelectClient}
            isPending={isPending}
            placeholder="Поиск клиента по имени или телефону..."
          />

          <div className="relative flex items-center">
            <div className="flex-1 border-t border-border" />
            <span className="px-3 text-xs text-muted-foreground">или</span>
            <div className="flex-1 border-t border-border" />
          </div>

          <AppButton
            variant="ghost"
            icon={FilePlus2}
            loading={isPending}
            onClick={handleCreateEmpty}
            className="w-full text-muted-foreground"
          >
            Создать без клиента
          </AppButton>
        </div>
      </AppDialog>
    </>
  )
}

export default CreateOrderButton
