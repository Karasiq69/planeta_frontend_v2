'use client'

import { Plus, Trash2 } from 'lucide-react'
import * as React from 'react'
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

import { useDeleteSpecProduct } from '../../api/mutations'
import { AddProductDialog } from './AddProductDialog'

import type { SpecificationProductItem } from '../../types'

interface Props {
  specId: number
  products: SpecificationProductItem[]
}

const ProductDeleteAction = ({ specId, item }: { specId: number; item: SpecificationProductItem }) => {
  const [open, setOpen] = useState(false)
  const { mutate: deleteProduct, isPending } = useDeleteSpecProduct(specId)

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
            <AlertDialogTitle>Удалить товар?</AlertDialogTitle>
            <AlertDialogDescription>
              Товар «{item.product.name}» будет удалён из спецификации. Это действие нельзя
              отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteProduct(item.id, { onSuccess: () => setOpen(false) })}
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

export const ProductPositions = ({ specId, products }: Props) => {
  const [addOpen, setAddOpen] = useState(false)

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <h3 className='text-sm font-medium'>Товары</h3>
        <Button size='sm' variant='outline' onClick={() => setAddOpen(true)}>
          <Plus className='size-4 mr-1' />
          Добавить товар
        </Button>
      </div>

      {products.length === 0 ? (
        <p className='text-sm text-muted-foreground'>Товары не добавлены</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Товар</TableHead>
              <TableHead className='w-32'>Количество</TableHead>
              <TableHead className='w-24'>Ед.</TableHead>
              <TableHead className='w-32'>Скидка (%)</TableHead>
              <TableHead className='w-16' />
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((item) => (
              <TableRow key={item.id}>
                <TableCell className='font-medium'>{item.product.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.product.unit}</TableCell>
                <TableCell>{item.discountPercent ?? '—'}</TableCell>
                <TableCell>
                  <ProductDeleteAction specId={specId} item={item} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <AddProductDialog specId={specId} open={addOpen} onOpenChange={setAddOpen} />
    </div>
  )
}
