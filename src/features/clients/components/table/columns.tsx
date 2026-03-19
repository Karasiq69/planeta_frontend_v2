'use client'

import { ArrowRightCircle, Trash2 } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'

import { DataTableColumnHeader } from '@/components/common/table/data-table-column-header'
import { Badge } from '@/components/ui/badge'
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
import { useDeleteClient } from '@/features/clients/api/mutations'
import { CLIENT_TYPE_LABELS } from '@/features/clients/types'

import type { IClient } from '@/features/clients/types'
import type { ColumnDef } from '@tanstack/react-table'

const ClientTableActions = ({ clientId }: { clientId: number }) => {
  const { mutate: deleteClient, isPending } = useDeleteClient(clientId)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  const handleDelete = () => {
    deleteClient(undefined, {
      onSuccess: () => setIsDialogOpen(false),
    })
  }

  return (
    <div className='flex gap-2 py-0'>
      <Button size='icon' variant='secondary' className='w-full p-0' asChild>
        <Link href={`/clients/${clientId}`}>
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
              Вы уверены, что хотите удалить клиента? Это действие невозможно отменить
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

export const clientColumns: ColumnDef<IClient>[] = [
  {
    accessorKey: 'type',
    meta: 'Тип',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Тип' />,
    cell: ({ row }) => {
      const type = row.original.type
      const isOrg = type !== 'individual'
      return (
        <Badge variant={isOrg ? 'default' : 'secondary'}>
          {CLIENT_TYPE_LABELS[type] ?? type}
        </Badge>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    meta: 'Имя',
    accessorFn: (row) => {
      if (row.type !== 'individual' && row.companyName) {
        return row.companyName
      }
      return `${row.lastName} ${row.firstName}`
    },
    header: ({ column }) => <DataTableColumnHeader column={column} title='Имя' />,
    cell: ({ row }) => {
      const client = row.original
      if (client.type !== 'individual' && client.companyName) {
        return (
          <div>
            <div>{client.companyName}</div>
            <div className='text-xs text-muted-foreground'>
              {client.lastName} {client.firstName}
            </div>
          </div>
        )
      }
      return <div>{client.lastName} {client.firstName}</div>
    },
    enableSorting: false,
  },
  {
    accessorKey: 'email',
    meta: 'Email',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
    cell: ({ row }) => <div>{row.getValue('email')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'phone',
    meta: 'Телефон',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Телефон' />,
    cell: ({ row }) => <span>{row.original.phone}</span>,
    enableSorting: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => <ClientTableActions clientId={row.original.id} />,
  },
]
