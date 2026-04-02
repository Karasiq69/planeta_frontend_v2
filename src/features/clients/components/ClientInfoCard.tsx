'use client'

import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Pencil, UserIcon } from 'lucide-react'
import { useState } from 'react'

import { AppDialog } from '@/components/ds/base/AppDialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import ClientForm from '@/features/clients/components/forms/ClientForm'
import { CLIENT_TYPE_LABELS } from '@/features/clients/types'
import { formatPhone } from '@/lib/utils'

import type { IClient } from '@/features/clients/types'

interface ClientInfoCardProps {
  client: IClient
}

const getInitials = (client: IClient): string => {
  if (client.type !== 'individual' && client.companyName) {
    return client.companyName.slice(0, 2).toUpperCase()
  }
  const first = client.firstName?.charAt(0) ?? ''
  const last = client.lastName?.charAt(0) ?? ''
  return (last + first).toUpperCase() || 'КЛ'
}

const getDisplayName = (client: IClient): string => {
  if (client.type !== 'individual' && client.companyName) {
    return client.companyName
  }
  return [client.lastName, client.firstName, client.middleName].filter(Boolean).join(' ')
}

const ClientInfoCard = ({ client }: ClientInfoCardProps) => {
  const [editOpen, setEditOpen] = useState(false)
  const isOrg = client.type !== 'individual'

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <div className="flex flex-row flex-wrap gap-4 items-center">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>
                {isOrg ? getInitials(client) : <UserIcon className="size-4" />}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="flex items-center gap-2">
                {getDisplayName(client)}
                <Badge variant="outline" className="text-xs font-normal">
                  {CLIENT_TYPE_LABELS[client.type]}
                </Badge>
              </CardTitle>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground mt-1">
                <span>{formatPhone(client.phone)}</span>
                {client.email && <span>{client.email}</span>}
              </div>
            </div>
          </div>
          <Button variant="default" size="sm" onClick={() => setEditOpen(true)}>
            <Pencil className="size-4 mr-1.5" />
            Редактировать
          </Button>
        </CardHeader>

        {isOrg && (
          <CardContent className="pt-0">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              {client.inn && <span>ИНН: {client.inn}</span>}
              {client.kpp && <span>КПП: {client.kpp}</span>}
            </div>
            {(client.firstName || client.lastName) && (
              <p className="text-sm text-muted-foreground mt-1">
                Контактное лицо: {[client.lastName, client.firstName, client.middleName].filter(Boolean).join(' ')}
              </p>
            )}
          </CardContent>
        )}

        {!isOrg && client.address && (
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground">{client.address}</p>
          </CardContent>
        )}

        <CardFooter>
          <p className="text-xs text-muted-foreground">
            Клиент с {format(parseISO(client.createdAt), 'dd MMMM yyyy', { locale: ru })}
          </p>
        </CardFooter>
      </Card>

      <AppDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Редактировать клиента"
        description="Изменение данных клиента"
      >
        <ClientForm clientId={client.id} clientData={client} />
      </AppDialog>
    </>
  )
}

export default ClientInfoCard
