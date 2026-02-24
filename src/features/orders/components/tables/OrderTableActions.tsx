import { ArrowRightCircle, Trash2 } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import LoaderAnimated from '@/components/ui/LoaderAnimated'
import { useDeleteOrder } from '@/features/orders/api/mutations'

type Props = {
  orderId: number
}

const OrderTableActions = ({ orderId }: Props) => {
  const { mutate: deleteOrder, isPending } = useDeleteOrder(orderId)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  const handleDelete = () => {
    deleteOrder()
    setIsDialogOpen(false)
  }

  return (
    <div className='flex gap-2 py-0 '>
      <Button variant='default' className='w-full p-0 opacity-0 group-hover:opacity-100' asChild>
        <Link href={`/orders/${orderId}`} className="px-4">
          <ArrowRightCircle />
        </Link>
      </Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button size='icon' variant='ghost' className='p-0'>
            <Trash2 />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Подтвердить удаление</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить заказ? Это действие невозможно отменить
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={() => setIsDialogOpen(false)}>
              Отмена
            </Button>
            <Button variant='destructive' onClick={handleDelete} disabled={isPending}>
              {isPending ? <LoaderAnimated /> : 'Удалить'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default OrderTableActions
