'use client'

import { Trash2 } from 'lucide-react'
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
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useDeleteSpecification } from '@/features/service-specifications/api/mutations'

import type { Specification } from '@/features/service-specifications/types'
import type { ColumnDef } from '@tanstack/react-table'

const SpecificationDeleteAction = ({ spec }: { spec: Specification }) => {
  const [open, setOpen] = React.useState(false)
  const { mutate: deleteSpecification, isPending } = useDeleteSpecification()

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
            <AlertDialogTitle>Удалить спецификацию?</AlertDialogTitle>
            <AlertDialogDescription>
              Спецификация «{spec.name}» будет удалена. Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteSpecification(spec.id, { onSuccess: () => setOpen(false) })}
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

export const getSpecificationColumns = (): ColumnDef<Specification>[] => [
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
    accessorKey: 'isActive',
    meta: 'Статус',
    size: 120,
    header: ({ column }) => <DataTableColumnHeader column={column} title='Статус' />,
    cell: ({ row }) =>
      row.original.isActive ? (
        <Badge variant='default' className='bg-green-600 hover:bg-green-600'>
          Активна
        </Badge>
      ) : (
        <Badge variant='secondary'>Неактивна</Badge>
      ),
    enableSorting: false,
  },
  {
    id: 'actions',
    size: 50,
    cell: ({ row }) => (
      <div className='flex justify-end' onClick={(e) => e.stopPropagation()}>
        <SpecificationDeleteAction spec={row.original} />
      </div>
    ),
  },
]
