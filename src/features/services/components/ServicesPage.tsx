'use client'

import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

import PageHeader from '@/components/common/PageHeader'
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
import { Input } from '@/components/ui/input'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useDeleteService } from '@/features/services/api/mutations'
import { useAllServices } from '@/features/services/api/queries'
import { ServiceForm } from './forms/ServiceForm'

import type { IService } from '@/features/services/types'

const ServicesPage = () => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const { data, isLoading } = useAllServices({ page, pageSize: 20, searchTerm: search || undefined })
  const deleteMutation = useDeleteService()

  const [createOpen, setCreateOpen] = useState(false)
  const [editService, setEditService] = useState<IService | null>(null)
  const [deleteService, setDeleteService] = useState<IService | null>(null)

  const services = data?.data ?? []
  const meta = data?.meta

  const handleDelete = () => {
    if (!deleteService) return
    deleteMutation.mutate(deleteService.id, {
      onSuccess: () => setDeleteService(null),
    })
  }

  const formatDuration = (minutes: number) => {
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    if (h === 0) return `${m} мин`
    if (m === 0) return `${h} ч`
    return `${h} ч ${m} мин`
  }

  return (
    <div className='space-y-6'>
      <PageHeader
        title='Услуги'
        showBackButton
        elements={[
          <Button key='add' size='sm' onClick={() => setCreateOpen(true)}>
            <Plus className='mr-1.5 size-4' />
            Добавить услугу
          </Button>,
        ]}
      />

      <div className='flex gap-3'>
        <Input
          placeholder='Поиск по названию...'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          className='max-w-xs'
        />
      </div>

      {isLoading ? (
        <LoaderSectionAnimated className='rounded p-10' />
      ) : services.length > 0 ? (
        <>
          <div className='rounded-lg border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Название</TableHead>
                  <TableHead>Описание</TableHead>
                  <TableHead>Длительность</TableHead>
                  <TableHead className='w-20' />
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className='font-medium'>{service.name}</TableCell>
                    <TableCell className='text-muted-foreground'>
                      {service.description || '—'}
                    </TableCell>
                    <TableCell>{formatDuration(service.defaultDuration)}</TableCell>
                    <TableCell>
                      <div className='flex gap-1'>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='size-8'
                          onClick={() => setEditService(service)}
                        >
                          <Pencil className='size-4' />
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='size-8 text-destructive hover:text-destructive'
                          onClick={() => setDeleteService(service)}
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

          {meta && meta.totalPages > 1 && (
            <div className='flex items-center justify-center gap-2'>
              <Button
                variant='outline'
                size='sm'
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Назад
              </Button>
              <span className='text-sm text-muted-foreground'>
                {page} / {meta.totalPages}
              </span>
              <Button
                variant='outline'
                size='sm'
                disabled={page >= meta.totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Вперёд
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className='rounded-lg border p-8 text-center text-muted-foreground'>
          Нет услуг
        </div>
      )}

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className='max-w-lg'>
          <DialogHeader>
            <DialogTitle>Новая услуга</DialogTitle>
          </DialogHeader>
          <ServiceForm onSuccess={() => setCreateOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editService} onOpenChange={(open) => !open && setEditService(null)}>
        <DialogContent className='max-w-lg'>
          <DialogHeader>
            <DialogTitle>Редактирование услуги</DialogTitle>
          </DialogHeader>
          {editService && (
            <ServiceForm
              serviceData={editService}
              onSuccess={() => setEditService(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteService} onOpenChange={(open) => !open && setDeleteService(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить услугу?</AlertDialogTitle>
            <AlertDialogDescription>
              Услуга «{deleteService?.name}» будет удалена. Это действие нельзя отменить.
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

export default ServicesPage
