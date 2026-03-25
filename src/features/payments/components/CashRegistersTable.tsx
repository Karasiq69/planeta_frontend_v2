'use client'

import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Pencil, Power, PowerOff } from 'lucide-react'
import { useState } from 'react'

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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useActivateCashRegister, useDeactivateCashRegister } from '@/features/payments/api/mutations'

import { cashRegisterColumns } from './cash-register-columns'
import CashRegisterForm from './forms/CashRegisterForm'
import CashRegisterTransactionsSheet from './cash-transactions/CashRegisterTransactionsSheet'

import type { CashRegister } from '@/features/payments/types'


interface CashRegistersTableProps {
  data: CashRegister[]
}

const CashRegistersTable = ({ data }: CashRegistersTableProps) => {
  const [deactivateId, setDeactivateId] = useState<number | null>(null)
  const [activateId, setActivateId] = useState<number | null>(null)
  const [editCashRegister, setEditCashRegister] = useState<CashRegister | null>(null)
  const [selectedCashRegister, setSelectedCashRegister] = useState<CashRegister | null>(null)
  const { mutate: deactivate, isPending } = useDeactivateCashRegister()
  const { mutate: activate, isPending: isActivating } = useActivateCashRegister()

  const columns = [
    ...cashRegisterColumns,
    {
      id: 'actions',
      header: '',
      cell: ({ row }: { row: { original: CashRegister } }) => {
        return (
          <div className='flex gap-1' onClick={(e) => e.stopPropagation()}>
            <Button variant='ghost' size='icon' className='size-8' onClick={() => setEditCashRegister(row.original)}>
              <Pencil className='size-4' />
            </Button>
            {row.original.isActive ? (
              <Button
                variant='ghost'
                size='icon'
                className='size-8 text-destructive hover:text-destructive'
                onClick={() => setDeactivateId(row.original.id)}
                title='Деактивировать'
              >
                <PowerOff className='size-4' />
              </Button>
            ) : (
              <Button
                variant='ghost'
                size='icon'
                className='size-8 text-green-600 hover:text-green-600'
                onClick={() => setActivateId(row.original.id)}
                title='Активировать'
              >
                <Power className='size-4' />
              </Button>
            )}
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
      <div className='rounded-md border'>
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={`${row.original.isActive ? '' : 'opacity-50'} cursor-pointer hover:bg-muted/50`}
                  onClick={() => setSelectedCashRegister(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='py-2'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  Нет касс
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deactivateId !== null} onOpenChange={() => setDeactivateId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Деактивировать кассу?</AlertDialogTitle>
            <AlertDialogDescription>
              После деактивации касса станет недоступна для приёма платежей.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              disabled={isPending}
              onClick={() => {
                if (deactivateId) {
                  deactivate(deactivateId, { onSuccess: () => setDeactivateId(null) })
                }
              }}
            >
              Деактивировать
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={activateId !== null} onOpenChange={() => setActivateId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Активировать кассу?</AlertDialogTitle>
            <AlertDialogDescription>
              После активации касса станет доступна для приёма платежей.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              disabled={isActivating}
              onClick={() => {
                if (activateId) {
                  activate(activateId, { onSuccess: () => setActivateId(null) })
                }
              }}
            >
              Активировать
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={editCashRegister !== null} onOpenChange={(open) => !open && setEditCashRegister(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактирование кассы</DialogTitle>
          </DialogHeader>
          {editCashRegister && (
            <CashRegisterForm
              cashRegister={editCashRegister}
              onSuccess={() => setEditCashRegister(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <CashRegisterTransactionsSheet
        cashRegister={selectedCashRegister}
        open={!!selectedCashRegister}
        onOpenChange={(open) => !open && setSelectedCashRegister(null)}
      />
    </>
  )
}

export default CashRegistersTable
