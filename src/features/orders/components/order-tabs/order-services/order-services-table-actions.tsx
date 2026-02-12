import { Check, Copy, Pencil, Trash2, UserPlus } from 'lucide-react'
import { DialogBody } from 'next/dist/next-devtools/dev-overlay/components/dialog'
import { useParams } from 'next/navigation'
import * as React from 'react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useAllMechanics } from '@/features/mechanics/api/queries'
import {
  useAddOrderServiceMechanic,
  useDeleteMechanicOrderService,
  useDeleteOrderService,
  useUpdateOrderService,
} from '@/features/orders/api/mutations'
import { OrderServiceForm } from '@/features/orders/components/forms/order-service/OrderServiceForm'
import { cn } from '@/lib/utils'

import type { Mechanic } from '@/features/mechanics/types'
import type { OrderService } from '@/features/orders/types'
import type { Row } from '@tanstack/react-table'

type Props = {
  rowInstance: Row<OrderService>
}
const OrderServicesTableActions = ({ rowInstance }: Props) => {
  const [open, setOpen] = useState(false)
  const { id } = useParams()
  const orderId = Number(id)

  const [popoverOpen, setPopoverOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const serviceId = rowInstance?.original?.id

  const { data: mechanics, isLoading } = useAllMechanics()

  const { mutate: deleteService, isPending } = useDeleteOrderService(orderId)
  const { mutate: updateMutation, isPending: updatePending } = useUpdateOrderService(orderId)
  const { mutate: addMechanic, isPending: isAdding } = useAddOrderServiceMechanic(orderId)

  const { mutate: deleteMechanic, isPending: isDeleting } = useDeleteMechanicOrderService(orderId)

  function handleDeleteClick() {
    deleteService(serviceId, {
      onSettled: () => {
        setPopoverOpen(false)
      },
    })
  }

  function handleCheckedChange(mechanic: Mechanic, isChecked: boolean) {
    if (isChecked) {
      addMechanic({
        orderServiceId: serviceId,
        mechanicId: mechanic.id,
      })
    } else {
      const orderServiceEmployee = rowInstance?.original?.mechanics?.some(
        (m) => m.mechanic.id === mechanic.id
      )
      if (orderServiceEmployee) {
        deleteMechanic({
          orderServiceId: serviceId,
          mechanicId: mechanic.id,
        })
      }
    }
  }

  function handleUpdateService() {}

  return (
    <div className='  text-nowrap flex   '>
      <div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            {/* -- привязать мастера к услуге --  */}
            <Button variant='ghost' size='icon'>
              <UserPlus className='h-4 w-4' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[200px] p-0' align='start' side='right'>
            <Command>
              <CommandInput></CommandInput>
              <CommandList>
                <CommandEmpty>Не найдено.</CommandEmpty>
                <CommandGroup>
                  {mechanics?.map((mechanic: Mechanic) => (
                    <CommandItem
                      disabled={isAdding || isDeleting}
                      key={mechanic.id}
                      value={mechanic.name}
                      className='cursor-pointer'
                      onSelect={() => {
                        const isCurrentlySelected = rowInstance?.original?.mechanics.some(
                          (m) => m.mechanic.id === mechanic.id
                        )
                        handleCheckedChange(mechanic, !isCurrentlySelected)
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          rowInstance?.original?.mechanics?.some(
                            (m) => m.mechanic.id === mechanic.id
                          )
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                      {mechanic.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          {/*-- Редактировать услугу --*/}
          <Button size='icon' variant='ghost' className='p-0'>
            <Pencil />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактирование услуги</DialogTitle>
            <DialogDescription>Отредактируйте услугу и нажмите сохранить</DialogDescription>
          </DialogHeader>
          <DialogContent>
            <OrderServiceForm orderServiceData={rowInstance.original} orderId={orderId} />
          </DialogContent>
          {/*<DialogFooter>*/}
          {/*    <Button variant="outline">*/}
          {/*        Отмена*/}
          {/*    </Button>*/}
          {/*    <Button variant="destructive">*/}
          {/*        /!*{isPending ? <LoaderAnimated/> : "Удалить"}*!/*/}
          {/*        Удалить*/}
          {/*    </Button>*/}
          {/*</DialogFooter>*/}
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button size='icon' variant='ghost' className='p-0'>
            <Copy />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактирование</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить заказ? Это действие невозможно отменить
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline'>Отмена</Button>
            <Button variant='destructive'>
              {/*{isPending ? <LoaderAnimated/> : "Удалить"}*/}
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/*<Dialog>*/}
      {/*    <DialogTrigger asChild>*/}
      {/*        <Button size="icon" variant="ghost" className="p-0">*/}
      {/*            <Trash2/>*/}
      {/*        </Button>*/}
      {/*    </DialogTrigger>*/}
      {/*    <DialogContent>*/}
      {/*        <DialogHeader>*/}
      {/*            <DialogTitle>Подтвердить удаление</DialogTitle>*/}
      {/*            <DialogDescription>*/}
      {/*                Вы уверены, что хотите удалить заказ? Это действие невозможно отменить*/}
      {/*            </DialogDescription>*/}
      {/*        </DialogHeader>*/}
      {/*        <DialogFooter>*/}
      {/*            <Button variant="outline">*/}
      {/*                Отмена*/}
      {/*            </Button>*/}
      {/*            <Button variant="destructive">*/}
      {/*                /!*{isPending ? <LoaderAnimated/> : "Удалить"}*!/*/}
      {/*                Удалить*/}
      {/*            </Button>*/}
      {/*        </DialogFooter>*/}
      {/*    </DialogContent>*/}
      {/*</Dialog>*/}
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild onClick={() => setPopoverOpen(true)}>
          <Button variant='ghost' size='sm'>
            <Trash2 size={16} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto '>
          <Button disabled={isPending} variant='destructive' onClick={handleDeleteClick} size='sm'>
            Удалить
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  )
}
export default OrderServicesTableActions
