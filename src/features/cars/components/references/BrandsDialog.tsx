'use client'

import { Loader2, Pencil, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useDeleteBrand } from '@/features/cars/api/mutations'
import { useVehiclesBrands } from '@/features/cars/api/queries'
import { getBrandLogo } from '@/features/cars/utils'

import type { ICarBrand } from '@/features/cars/types'

import { BrandForm } from './BrandForm'
import { DeleteConfirmAlert } from '@/components/common/DeleteConfirmAlert'

interface BrandsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BrandsDialog({ open, onOpenChange }: BrandsDialogProps) {
  const [formOpen, setFormOpen] = useState(false)
  const [editingBrand, setEditingBrand] = useState<ICarBrand | undefined>()
  const [deletingBrand, setDeletingBrand] = useState<ICarBrand | undefined>()

  const { data: brands, isLoading } = useVehiclesBrands()
  const deleteMutation = useDeleteBrand()

  const handleCreate = () => {
    setEditingBrand(undefined)
    setFormOpen(true)
  }

  const handleEdit = (brand: ICarBrand) => {
    setEditingBrand(brand)
    setFormOpen(true)
  }

  const handleFormSuccess = () => {
    setFormOpen(false)
    setEditingBrand(undefined)
  }

  const handleDeleteConfirm = () => {
    if (!deletingBrand) return
    deleteMutation.mutate(deletingBrand.id, {
      onSuccess: () => setDeletingBrand(undefined),
    })
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className='max-w-lg'>
          <DialogHeader>
            <DialogTitle>Бренды</DialogTitle>
          </DialogHeader>

          <div className='space-y-1'>
            <Button variant='outline' size='sm' onClick={handleCreate}>
              <Plus className='mr-1 h-4 w-4' />
              Добавить
            </Button>

            {isLoading && (
              <div className='flex justify-center py-8'>
                <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
              </div>
            )}

            {!isLoading && (!brands || brands.length === 0) && (
              <p className='py-8 text-center text-sm text-muted-foreground'>
                Нет брендов
              </p>
            )}

            {brands?.map((brand) => (
              <div
                key={brand.id}
                className='flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-muted/50'
              >
                <Avatar className='h-7 w-7'>
                  <AvatarImage src={getBrandLogo(brand)} alt={brand.name} />
                  <AvatarFallback className='text-xs'>
                    {brand.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <span className='flex-1 text-sm'>{brand.name}</span>

                <Button
                  variant='ghost'
                  size='icon'
                  className='h-7 w-7'
                  onClick={() => handleEdit(brand)}
                >
                  <Pencil className='h-3.5 w-3.5' />
                </Button>

                <Button
                  variant='ghost'
                  size='icon'
                  className='h-7 w-7 text-destructive'
                  onClick={() => setDeletingBrand(brand)}
                >
                  <Trash2 className='h-3.5 w-3.5' />
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className='max-w-lg'>
          <DialogHeader>
            <DialogTitle>
              {editingBrand ? 'Редактировать бренд' : 'Новый бренд'}
            </DialogTitle>
          </DialogHeader>
          <BrandForm initialData={editingBrand} onSuccess={handleFormSuccess} />
        </DialogContent>
      </Dialog>

      <DeleteConfirmAlert
        open={!!deletingBrand}
        onOpenChange={(v) => !v && setDeletingBrand(undefined)}
        name={deletingBrand?.name ?? ''}
        onConfirm={handleDeleteConfirm}
        isPending={deleteMutation.isPending}
      />
    </>
  )
}
