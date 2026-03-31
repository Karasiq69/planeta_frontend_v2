'use client'

import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { AppEmptyState } from '@/components/ds/composite/AppEmptyState'
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
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useDeletePosition } from '@/features/positions/api/mutations'
import { usePositions } from '@/features/positions/api/queries'
import PositionForm from './forms/PositionForm'
import type { Position } from '@/features/positions/types'
import type { ColumnDef } from '@tanstack/react-table'

const PositionsPage = () => {
  const { data, isLoading } = usePositions({ pageSize: 100 })
  const deleteMutation = useDeletePosition()

  const [createOpen, setCreateOpen] = useState(false)
  const [editPosition, setEditPosition] = useState<Position | null>(null)
  const [deletePosition, setDeletePosition] = useState<Position | null>(null)

  const positions = data?.data ?? []

  const columns: ColumnDef<Position>[] = [
    {
      accessorKey: 'name',
      header: 'Название',
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        const position = row.original
        return (
          <div className='flex gap-1 justify-end'>
            <Button
              variant='ghost'
              size='icon'
              className='size-8'
              onClick={() => setEditPosition(position)}
            >
              <Pencil className='size-4' />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              className='size-8 text-destructive hover:text-destructive'
              onClick={() => setDeletePosition(position)}
            >
              <Trash2 className='size-4' />
            </Button>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data: positions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleDelete = () => {
    if (!deletePosition) return
    deleteMutation.mutate(deletePosition.id, {
      onSuccess: () => setDeletePosition(null),
    })
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-medium'>Должности</h3>
        <Button size='sm' onClick={() => setCreateOpen(true)}>
          <Plus className='mr-1.5 size-4' />
          Добавить должность
        </Button>
      </div>

      <Card>
        {isLoading ? (
          <LoaderSectionAnimated className='p-10' />
        ) : positions.length > 0 ? (
          <Table>
            <TableHeader className='bg-muted border-b'>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='py-2'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <AppEmptyState title='Нет должностей' />
        )}
      </Card>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className='max-w-lg'>
          <DialogHeader>
            <DialogTitle>Новая должность</DialogTitle>
          </DialogHeader>
          <PositionForm onSuccess={() => setCreateOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editPosition} onOpenChange={(open) => !open && setEditPosition(null)}>
        <DialogContent className='max-w-lg'>
          <DialogHeader>
            <DialogTitle>Редактирование должности</DialogTitle>
          </DialogHeader>
          {editPosition && (
            <PositionForm initialData={editPosition} onSuccess={() => setEditPosition(null)} />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletePosition} onOpenChange={(open) => !open && setDeletePosition(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить должность?</AlertDialogTitle>
            <AlertDialogDescription>
              Должность &laquo;{deletePosition?.name}&raquo; будет удалена. Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? 'Удаление...' : 'Удалить'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default PositionsPage
