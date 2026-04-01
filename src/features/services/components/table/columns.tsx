'use client'

import { Pencil, Trash2 } from 'lucide-react'
import * as React from 'react'

import { DataTableColumnHeader } from '@/components/common/table/data-table-column-header'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useDeleteService } from '@/features/services/api/mutations'

import type { IService } from '@/features/services/types'
import type { ColumnDef } from '@tanstack/react-table'

import { formatDurationHours } from '@/shared/lib/duration'

const ServiceDeleteAction = ({ service }: { service: IService }) => {
  const [open, setOpen] = React.useState(false)
  const { mutate: deleteService, isPending } = useDeleteService()

  return (
    <>
      <Button
        variant='ghost'
        size='icon'
        className='size-8 text-destructive hover:text-destructive'
        onClick={() => setOpen(true)}
      >
        <Trash2 className='size-4' />
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить работу?</AlertDialogTitle>
            <AlertDialogDescription>
              Работа «{service.name}» будет удалена. Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteService(service.id, { onSuccess: () => setOpen(false) })}
              disabled={isPending}
            >
              {isPending ? 'Удаление...' : 'Удалить'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export const getServiceColumns = (onEdit: (service: IService) => void): ColumnDef<IService>[] => [
  {
    accessorKey: 'name',
    meta: 'Название',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Название' />,
    cell: ({ row }) => <span className='font-medium'>{row.original.name}</span>,
    enableSorting: false,
  },
  {
    accessorKey: 'description',
    meta: 'Описание',
    size: 0,
    header: ({ column }) => <DataTableColumnHeader column={column} title='Описание' />,
    cell: ({ row }) => (
      <span className='text-xs text-muted-foreground'>{row.original.description || '—'}</span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'defaultDuration',
    meta: 'Длительность',
    size: 100,
    header: ({ column }) => <DataTableColumnHeader column={column} title='Длительность' />,
    cell: ({ row }) => formatDurationHours(row.original.defaultDuration),
    enableSorting: false,
  },
  {
    id: 'actions',
    size: 80,
    cell: ({ row }) => (
      <div className='flex gap-1'>
        <Button
          variant='ghost'
          size='icon'
          className='size-8'
          onClick={() => onEdit(row.original)}
        >
          <Pencil className='size-4' />
        </Button>
        <ServiceDeleteAction service={row.original} />
      </div>
    ),
  },
]
