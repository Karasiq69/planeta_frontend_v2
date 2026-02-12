import { ClipboardList } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useClientOrders } from '../../api/queries'


type Props = {
  clientId: number
}

const ClientOrdersDropdownMenu = (props: Props) => {
  const { data: orders } = useClientOrders(Number(props.clientId))

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="link"
            size="sm"
            className="p-0 font-semibold text-muted-foreground"
          >
            <ClipboardList size={16} />
            {orders?.length} заказов
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start">
          {orders?.map((order) => {
            return (
              <DropdownMenuItem key={order.id}>
                <Link href={`/orders/${order.id}`}>Заказ №{order.id}</Link>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
export default ClientOrdersDropdownMenu
