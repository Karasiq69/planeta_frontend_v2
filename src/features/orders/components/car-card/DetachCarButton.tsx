import { CircleMinus } from 'lucide-react'
import React from 'react'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import LoaderAnimated from '@/components/ui/LoaderAnimated'
import { useDetachOrderCar } from '@/features/orders/api/mutations'

type Props = {
  orderId: number
}
export const DetachCarButton = ({ orderId }: Props) => {
  const { mutate: detachCar, isPending } = useDetachOrderCar(orderId)

  return (
    <>
      <DropdownMenuItem
        disabled={isPending}
        className="text-destructive"
        onClick={() => detachCar()}
      >
        {isPending ? (
          <LoaderAnimated />
        ) : (
          <CircleMinus size={16} strokeWidth={2} className='opacity-60' aria-hidden='true' />
        )}
        Отвязать авто
      </DropdownMenuItem>
    </>
  )
}
