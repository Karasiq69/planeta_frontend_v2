import { Pencil, Trash2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useDeleteEmployeeOrderService } from '@/features/orders/api/mutations'
import ServiceMechanicForm from '@/features/orders/components/forms/service-mechanic/ServiceMechanicForm'

import type { OrderServiceEmployee } from '@/features/orders/types'
import type { Row } from '@tanstack/react-table'

type Props = {
  row: Row<OrderServiceEmployee>
}
const OrderMechanicTableActions = ({ row }: Props) => {
  const { id } = useParams()
  const orderId = Number(id)

  const [popoverOpen, setPopoverOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const { mutate: deleteEmployee, isPending } = useDeleteEmployeeOrderService(orderId)

  function handleDeleteClick() {
    deleteEmployee({
      orderServiceId: row.original.orderServiceId,
      employeeId: row.original.employeeId,
    })
  }

  if (!row?.original) {
    return <div>Возможно произошла ошибка</div>
  }

  return (
    <div className="text-right  text-muted-foreground">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm">
            <Pencil size={16} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактировать исполнителя</DialogTitle>
          </DialogHeader>
          <DialogDescription></DialogDescription>

          <ServiceMechanicForm
            orderServiceId={row.original.orderServiceId}
            mechanicData={row.original}
          />
        </DialogContent>
      </Dialog>

      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild onClick={() => setPopoverOpen(true)}>
          <Button variant="ghost" size="sm">
            <Trash2 size={16} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto ">
          <Button
            // disabled={isPending}
            variant="destructive"
            onClick={handleDeleteClick}
            size="sm"
          >
            Удалить
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  )
}
export default OrderMechanicTableActions
