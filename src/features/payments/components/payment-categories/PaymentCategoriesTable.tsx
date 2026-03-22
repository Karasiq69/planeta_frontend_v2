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
import { useDeletePaymentCategory, useUpdatePaymentCategory } from '@/features/payments/api/cash-transactions-mutations'
import { paymentCategoryColumns } from './payment-category-columns'
import PaymentCategoryForm from './PaymentCategoryForm'

import type { PaymentCategory } from '@/features/payments/types'

interface PaymentCategoriesTableProps {
  data: PaymentCategory[]
}

const PaymentCategoriesTable = ({ data }: PaymentCategoriesTableProps) => {
  const [deleteCategory, setDeleteCategory] = useState<PaymentCategory | null>(null)
  const [editCategory, setEditCategory] = useState<PaymentCategory | null>(null)
  const { mutate: remove, isPending: isDeleting } = useDeletePaymentCategory()
  const { mutate: update } = useUpdatePaymentCategory()

  const columns = [
    ...paymentCategoryColumns,
    {
      id: 'actions',
      header: '',
      cell: ({ row }: { row: { original: PaymentCategory } }) => {
        const cat = row.original
        return (
          <div className='flex gap-1'>
            {!cat.isSystem && (
              <Button variant='ghost' size='sm' onClick={() => setEditCategory(cat)}>
                Редактировать
              </Button>
            )}
            {cat.isSystem && (
              <Button
                variant='ghost'
                size='sm'
                onClick={() =>
                  update({ id: cat.id, data: { isActive: !cat.isActive } })
                }
              >
                {cat.isActive ? 'Деактивировать' : 'Активировать'}
              </Button>
            )}
            {!cat.isSystem && (
              <Button variant='ghost' size='sm' onClick={() => setDeleteCategory(cat)}>
                Удалить
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
                <TableRow key={row.id}>
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
                  Нет категорий
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteCategory} onOpenChange={() => setDeleteCategory(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить категорию «{deleteCategory?.name}»?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeleting}
              onClick={() => {
                if (deleteCategory) {
                  remove(deleteCategory.id, { onSuccess: () => setDeleteCategory(null) })
                }
              }}
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={!!editCategory} onOpenChange={(open) => !open && setEditCategory(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактирование категории</DialogTitle>
          </DialogHeader>
          {editCategory && (
            <PaymentCategoryForm
              category={editCategory}
              onSuccess={() => setEditCategory(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PaymentCategoriesTable
