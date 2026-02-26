'use client'

import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useDeactivateCashRegister } from '@/features/payments/api/mutations'

import { cashRegisterColumns } from './cash-register-columns'

import type { CashRegister } from '@/features/payments/types'


interface CashRegistersTableProps {
  data: CashRegister[]
}

const CashRegistersTable = ({ data }: CashRegistersTableProps) => {
  const [deactivateId, setDeactivateId] = useState<number | null>(null)
  const { mutate: deactivate, isPending } = useDeactivateCashRegister()

  const columns = [
    ...cashRegisterColumns,
    {
      id: 'actions',
      header: '',
      cell: ({ row }: { row: { original: CashRegister } }) => {
        if (!row.original.isActive) return null
        return (
          <Button variant='ghost' size='sm' onClick={() => setDeactivateId(row.original.id)}>
            Деактивировать
          </Button>
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
                <TableRow key={row.id} className={row.original.isActive ? '' : 'opacity-50'}>
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
    </>
  )
}

export default CashRegistersTable
