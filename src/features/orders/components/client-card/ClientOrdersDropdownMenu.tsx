import { ClipboardList, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

import PopoverPanel from '@/components/common/PopoverPanel'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getStatusData } from '@/features/orders/lib/statuses'
import { Order } from '@/features/orders/types'
import { pluralize, words } from '@/lib/pluralize'
import { cn, formatPrice } from '@/lib/utils'

import { useClientOrders } from '../../api/queries'

type Props = {
  clientId: number
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

const OrderItem = ({ order }: { order: Order }) => {
  const { icon: StatusIcon, color, label } = getStatusData(order.status)

  return (
    <div className="flex items-center gap-3 py-2.5 px-3">
      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="font-mono font-semibold text-xs bg-muted rounded px-1.5 py-0.5">
            #{order.id}
          </span>
          <Badge variant="outline" className={color}>
            {StatusIcon && <StatusIcon className="w-3 h-3 mr-1" />}
            {label}
          </Badge>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{formatDate(order.createdAt)}</span>
          <span className="font-medium text-foreground tabular-nums">
            {formatPrice(order.totalCost)}
          </span>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="shrink-0 h-7 w-7" asChild>
        <Link href={`/orders/${order.id}`}>
          <ExternalLink className="size-3.5" />
        </Link>
      </Button>
    </div>
  )
}

const ClientOrdersDropdownMenu = ({ clientId }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const { data: orders } = useClientOrders(clientId)

  const count = orders?.length ?? 0
  const hasOrders = count > 0

  return (
    <PopoverPanel
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Заказы клиента"
      subtitle={hasOrders ? pluralize(count, words.record) : undefined}
      trigger={
        <Button
          variant="ghost"
          className={cn(
            'text-sm text-muted-foreground h-8 flex items-center gap-2',
            isOpen && 'bg-accent text-accent-foreground'
          )}
          disabled={!hasOrders}
        >
          <ClipboardList className="text-muted-foreground" size={16} />
          {pluralize(count, words.order)}
        </Button>
      }
    >
      {orders?.map((order, idx) => (
        <React.Fragment key={order.id}>
          {idx > 0 && <Separator />}
          <OrderItem order={order} />
        </React.Fragment>
      ))}
    </PopoverPanel>
  )
}

export default ClientOrdersDropdownMenu
