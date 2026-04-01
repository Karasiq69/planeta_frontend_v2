'use client'

import { Plus } from 'lucide-react'
import { Suspense, useCallback, useState } from 'react'

import PageLayout from '@/components/common/PageLayout'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ServiceForm } from './forms/ServiceForm'
import ServicesDataTable from './table/ServicesDataTable'

import type { IService } from '@/features/services/types'

const ServicesPage = () => {
  const [createOpen, setCreateOpen] = useState(false)
  const [editService, setEditService] = useState<IService | null>(null)

  const handleEdit = useCallback((service: IService) => {
    setEditService(service)
  }, [])

  return (
    <PageLayout>
      <PageLayout.Header
        title='Работы'
        showBackButton
        actions={
          <Button size='sm' onClick={() => setCreateOpen(true)}>
            <Plus className='mr-1.5 size-4' />
            Добавить работу
          </Button>
        }
      />
      <PageLayout.Content>
        <Suspense>
          <ServicesDataTable onEdit={handleEdit} />
        </Suspense>
      </PageLayout.Content>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className='max-w-lg'>
          <DialogHeader>
            <DialogTitle>Новая работа</DialogTitle>
          </DialogHeader>
          <ServiceForm onSuccess={() => setCreateOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editService} onOpenChange={(open) => !open && setEditService(null)}>
        <DialogContent className='max-w-lg'>
          <DialogHeader>
            <DialogTitle>Редактирование работы</DialogTitle>
          </DialogHeader>
          {editService && (
            <ServiceForm
              serviceData={editService}
              onSuccess={() => setEditService(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </PageLayout>
  )
}

export default ServicesPage
