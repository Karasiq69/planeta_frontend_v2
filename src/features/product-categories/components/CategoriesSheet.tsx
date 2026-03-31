'use client'

import { Pencil, Plus, Trash2 } from 'lucide-react'
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
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useDeleteCategory } from '@/features/product-categories/api/mutations'
import { useProductCategories } from '@/features/product-categories/api/queries'
import { CategoryForm } from './CategoryForm'

import type { ProductCategory } from '@/features/products/types'

type View = { type: 'list' } | { type: 'form'; category?: ProductCategory }

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const CategoriesSheet = ({ open, onOpenChange }: Props) => {
  const { data: categories, isLoading } = useProductCategories()
  const deleteMutation = useDeleteCategory()

  const [view, setView] = useState<View>({ type: 'list' })
  const [deleteCategory, setDeleteCategory] = useState<ProductCategory | null>(null)

  const handleDelete = () => {
    if (!deleteCategory) return
    deleteMutation.mutate(deleteCategory.id, {
      onSuccess: () => setDeleteCategory(null),
    })
  }

  const handleFormSuccess = () => {
    setView({ type: 'list' })
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) setView({ type: 'list' })
    onOpenChange(open)
  }

  return (
    <>
      <AppSheet
        open={open}
        onOpenChange={handleOpenChange}
        title={view.type === 'list' ? 'Категории товаров' : view.category ? 'Редактирование категории' : 'Новая категория'}
        size='3xl'
      >
        {view.type === 'form' ? (
          <CategoryForm
            category={view.category}
            onSuccess={handleFormSuccess}
            onCancel={() => setView({ type: 'list' })}
          />
        ) : isLoading ? (
          <LoaderSectionAnimated className='rounded p-10' />
        ) : categories && categories.length > 0 ? (
          <div className='space-y-3'>
            <Button size='sm' onClick={() => setView({ type: 'form' })}>
              <Plus className='mr-1.5 size-4' />
              Добавить категорию
            </Button>

            <div className='rounded-lg border'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Название</TableHead>
                    <TableHead>Описание</TableHead>
                    <TableHead className='w-20'>Товары</TableHead>
                    <TableHead className='w-20' />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className='font-medium'>{category.name}</TableCell>
                      <TableCell className='text-xs text-muted-foreground'>
                        {category.description || '—'}
                      </TableCell>
                      <TableCell>
                        <Badge variant='secondary'>{category.productCount ?? 0}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className='flex gap-1'>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='size-8'
                            onClick={() => setView({ type: 'form', category })}
                          >
                            <Pencil className='size-4' />
                          </Button>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='size-8 text-destructive hover:text-destructive'
                            onClick={() => setDeleteCategory(category)}
                          >
                            <Trash2 className='size-4' />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ) : (
          <div className='space-y-3'>
            <Button size='sm' onClick={() => setView({ type: 'form' })}>
              <Plus className='mr-1.5 size-4' />
              Добавить категорию
            </Button>
            <AppEmptyState title='Нет категорий' />
          </div>
        )}
      </AppSheet>

      <AlertDialog open={!!deleteCategory} onOpenChange={(open) => !open && setDeleteCategory(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить категорию?</AlertDialogTitle>
            <AlertDialogDescription>
              Категория «{deleteCategory?.name}» будет удалена. Это действие нельзя отменить.
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
    </>
  )
}
