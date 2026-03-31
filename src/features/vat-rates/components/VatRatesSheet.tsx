'use client'

import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Pencil, Plus, Settings2, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { AppSheet } from '@/components/ds/base/AppSheet'
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useDeleteVatRate } from '@/features/vat-rates/api/mutations'
import { useVatRates } from '@/features/vat-rates/api/queries'

import VatRateForm from './forms/VatRateForm'
import { vatRateColumns } from './vat-rate-columns'

import type { VatRate } from '@/features/vat-rates/types'

export default function VatRatesSheet() {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [editRate, setEditRate] = useState<VatRate | null>(null)
  const [deleteRate, setDeleteRate] = useState<VatRate | null>(null)

  const { data, isLoading } = useVatRates()
  const deleteMutation = useDeleteVatRate()

  const vatRates = data ?? []

  const columns = [
    ...vatRateColumns,
    {
      id: 'actions',
      header: '',
      cell: ({ row }: { row: { original: VatRate } }) => {
        const rate = row.original
        return (
          <div className='flex gap-1'>
            <Button
              variant='ghost'
              size='icon'
              className='size-8'
              onClick={() => setEditRate(rate)}
            >
              <Pencil className='size-4' />
            </Button>
            {rate.isDefault ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='size-8 text-destructive hover:text-destructive'
                        disabled
                      >
                        <Trash2 className='size-4' />
                      </Button>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>Нельзя удалить ставку по умолчанию</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <Button
                variant='ghost'
                size='icon'
                className='size-8 text-destructive hover:text-destructive'
                onClick={() => setDeleteRate(rate)}
              >
                <Trash2 className='size-4' />
              </Button>
            )}
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data: vatRates,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleDelete = () => {
    if (!deleteRate) return
    deleteMutation.mutate(deleteRate.id, {
      onSuccess: () => setDeleteRate(null),
    })
  }

  return (
    <>
      <Button variant='outline' size='sm' onClick={() => setSheetOpen(true)}>
        <Settings2 className='mr-1.5 size-4' />
        Управление ставками
      </Button>

      <AppSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        title='Ставки НДС'
        description='Управление ставками НДС для организации'
        size='4xl'
        headerActions={
          <Button size='sm' onClick={() => setCreateOpen(true)}>
            <Plus className='mr-1.5 size-4' />
            Добавить ставку
          </Button>
        }
      >
        {isLoading ? (
          <LoaderSectionAnimated className='p-10' />
        ) : vatRates.length > 0 ? (
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
                <TableRow key={row.id} className={row.original.isActive ? '' : 'opacity-50'}>
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
          <AppEmptyState title='Нет ставок НДС' />
        )}
      </AppSheet>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className='max-w-lg'>
          <DialogHeader>
            <DialogTitle>Новая ставка НДС</DialogTitle>
          </DialogHeader>
          <VatRateForm onSuccess={() => setCreateOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editRate} onOpenChange={(open) => !open && setEditRate(null)}>
        <DialogContent className='max-w-lg'>
          <DialogHeader>
            <DialogTitle>Редактирование ставки НДС</DialogTitle>
          </DialogHeader>
          {editRate && <VatRateForm initialData={editRate} onSuccess={() => setEditRate(null)} />}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteRate} onOpenChange={(open) => !open && setDeleteRate(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Деактивировать ставку?</AlertDialogTitle>
            <AlertDialogDescription>
              Ставка &laquo;{deleteRate?.name}&raquo; будет деактивирована и перемещена в архив.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? 'Деактивация...' : 'Деактивировать'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
