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

import { AddServiceDialog } from './AddServiceDialog'
import { useDeleteSpecService } from '../../api/mutations'

import type { SpecificationServiceItem } from '../../types'

interface Props {
  specId: number
  services: SpecificationServiceItem[]
}

const ServiceDeleteAction = ({ specId, item }: { specId: number; item: SpecificationServiceItem }) => {
  const [open, setOpen] = useState(false)
  const { mutate: deleteService, isPending } = useDeleteSpecService(specId)

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
            <AlertDialogTitle>Удалить услугу?</AlertDialogTitle>
            <AlertDialogDescription>
              Услуга «{item.service.name}» будет удалена из спецификации. Это действие нельзя
              отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteService(item.id, { onSuccess: () => setOpen(false) })}
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

export const ServicePositions = ({ specId, services }: Props) => {
  const [addOpen, setAddOpen] = useState(false)

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <h3 className='text-sm font-medium'>Услуги</h3>
        <Button size='sm' variant='outline' onClick={() => setAddOpen(true)}>
          <Plus className='size-4 mr-1' />
          Добавить услугу
        </Button>
      </div>

      {services.length === 0 ? (
        <p className='text-sm text-muted-foreground'>Услуги не добавлены</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Услуга</TableHead>
              <TableHead className='w-40'>Длительность (мин)</TableHead>
              <TableHead className='w-32'>Скидка (%)</TableHead>
              <TableHead className='w-16' />
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((item) => (
              <TableRow key={item.id}>
                <TableCell className='font-medium'>{item.service.name}</TableCell>
                <TableCell>{item.defaultDuration}</TableCell>
                <TableCell>{item.discountPercent ?? '—'}</TableCell>
                <TableCell>
                  <ServiceDeleteAction specId={specId} item={item} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <AddServiceDialog specId={specId} open={addOpen} onOpenChange={setAddOpen} />
    </div>
  )
}
