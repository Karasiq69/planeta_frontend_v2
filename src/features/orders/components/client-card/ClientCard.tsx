import { Mail, Phone, UserIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import React from 'react'

import OrderSkeletonCard from '@/components/skeletons/order-card-skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { useOrderById } from '@/features/orders/api/queries'
import AddOrderClientButton from '@/features/orders/components/client-card/AddOrderClientButton'
import ClientCardDropdownMenu from '@/features/orders/components/client-card/ClientCardDropdownMenu'
import { formatPhone } from '@/lib/utils'

import ClientOrdersDropdownMenu from './ClientOrdersDropdownMenu'

const ClientCard = () => {
  const params = useParams()

  if (!params.id || typeof params.id !== 'string') {
    return <OrderSkeletonCard />
  }

  const { data: order, isLoading } = useOrderById(+params.id)

  if (isLoading) return <OrderSkeletonCard />
  if (!order?.client) return <EmptyClientCard />

  const { client } = order

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar className="size-9 shrink-0">
            <AvatarImage src="" />
            <AvatarFallback className="text-xs">
              <UserIcon className="size-4" />
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">
              {client.firstName} {client.lastName}
            </p>
            <div className="flex items-center gap-3 mt-0.5">
              {client.email && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground truncate">
                  <Mail className="size-3 shrink-0" />
                  {client.email}
                </span>
              )}
            </div>
          </div>
        </div>
        <ClientCardDropdownMenu />
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Phone className="size-3" />
          {formatPhone(client.phone)}
        </span>
        {order.clientId && <ClientOrdersDropdownMenu clientId={order.clientId} />}
      </div>
    </Card>
  )
}

export default ClientCard

const EmptyClientCard = () => {
  return (
    <Card className="border border-dashed border-gray-200 flex items-center justify-center p-8">
      <AddOrderClientButton />
    </Card>
  )
}
