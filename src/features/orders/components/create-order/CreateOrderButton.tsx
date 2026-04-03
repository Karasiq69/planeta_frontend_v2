'use client'

import { FilePlus2, PlusCircle, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import ClientCombobox from '@/components/clients/ClientCombobox'
import { AppButton } from '@/components/ds/base/AppButton'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useCreateOrder } from '@/features/orders/api/mutations'
import { ORDERS_URL } from '@/lib/constants'
import ClientCarSelect from './ClientCarSelect'

import type { IClient } from '@/features/clients/types'
import type { ICar } from '@/features/cars/types/vehicle'

const CreateOrderButton = ({ label = 'Новый заказ' }: { label?: string }) => {
  const [open, setOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<IClient | null>(null)
  const [selectedCar, setSelectedCar] = useState<ICar | null>(null)
  const router = useRouter()
  const { mutate: createOrder, isPending } = useCreateOrder()

  const handleSelectClient = (client: IClient) => {
    setSelectedClient(client)
    setSelectedCar(null)
  }

  const handleClearClient = () => {
    setSelectedClient(null)
    setSelectedCar(null)
  }

  const handleCreateOrder = () => {
    createOrder(
      {
        clientId: selectedClient?.id,
        carId: selectedCar?.id,
      },
      {
        onSuccess: (createdOrder) => {
          setOpen(false)
          setSelectedClient(null)
          setSelectedCar(null)
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
          setSelectedClient(null)
          setSelectedCar(null)
          router.push(`${ORDERS_URL}/${createdOrder.id}`)
        },
      }
    )
  }

  const clientDisplayName = selectedClient
    ? selectedClient.type !== 'individual'
      ? selectedClient.companyName
      : `${selectedClient.lastName ?? ''} ${selectedClient.firstName}`.trim()
    : null

  return (
    <>
      <AppButton icon={PlusCircle} size="sm" onClick={() => setOpen(true)}>
        {label}
      </AppButton>

      <Dialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value)
          if (!value) {
            setSelectedClient(null)
            setSelectedCar(null)
          }
        }}
      >
        <DialogContent className="max-w-sm p-0 gap-0 overflow-hidden bg-muted">
          <DialogHeader className="px-5 pt-5 pb-0">
            <DialogTitle className="text-lg">Новый заказ-наряд</DialogTitle>
            <DialogDescription className="text-sm">
              Выберите клиента и автомобиль для заказа
            </DialogDescription>
          </DialogHeader>

          <div className="px-4 pt-4 pb-4 space-y-3">
            <div className="rounded-lg border bg-card shadow-xs p-4 space-y-3">
              <p className="text-sm font-medium">Клиент</p>

              {selectedClient ? (
                <div className="flex items-center justify-between rounded-md border bg-background px-3 py-2">
                  <span className="text-sm">{clientDisplayName}</span>
                  <button
                    type="button"
                    onClick={handleClearClient}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ) : (
                <ClientCombobox
                  handleSelect={handleSelectClient}
                  placeholder="Имя, телефон или компания..."
                />
              )}

              {selectedClient && (
                <>
                  <p className="text-sm font-medium">Автомобиль</p>
                  <ClientCarSelect
                    clientId={selectedClient.id}
                    onSelect={setSelectedCar}
                  />
                </>
              )}
            </div>

            {selectedClient && (
              <Button
                onClick={handleCreateOrder}
                disabled={isPending}
                className="w-full"
              >
                Создать заказ
              </Button>
            )}

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
