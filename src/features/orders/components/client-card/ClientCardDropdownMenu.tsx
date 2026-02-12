import { Bolt, CopyPlus, EllipsisVertical, Layers2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import React from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DetachClient } from '@/features/orders/components/client-card/DetachClient'

type Props = {}
const ClientCardDropdownMenu = (props: Props) => {
  const { id: orderId } = useParams()

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start">
          <DropdownMenuItem disabled>
            <CopyPlus size={16} strokeWidth={2} className='opacity-60' aria-hidden='true' />
            Сменить клиента
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Bolt size={16} strokeWidth={2} className='opacity-60' aria-hidden='true' />
            Ред. клиента
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Layers2 size={16} strokeWidth={2} className='opacity-60' aria-hidden='true' />
            Перейти к автомобилям
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DetachClient orderId={+orderId} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
export default ClientCardDropdownMenu
