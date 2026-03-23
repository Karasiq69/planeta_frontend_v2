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

import { SpecificationForm } from './forms/SpecificationForm'
import SpecificationDetailDialog from './SpecificationDetailDialog'
import SpecificationsDataTable from './table/SpecificationsDataTable'

import type { Specification } from '@/features/service-specifications/types'

const SpecificationsPage = () => {
  const [createOpen, setCreateOpen] = useState(false)
  const [editSpecId, setEditSpecId] = useState<number | null>(null)

  const handleEdit = useCallback((spec: Specification) => {
    setEditSpecId(spec.id)
  }, [])

  return (
    <PageLayout>
      <PageLayout.Header
        title='Спецификации ТО'
        showBackButton
        actions={
          <Button size='sm' onClick={() => setCreateOpen(true)}>
            <Plus className='mr-1.5 size-4' />
            Добавить
          </Button>
        }
      />
      <PageLayout.Content>
        <Suspense>
          <SpecificationsDataTable onEdit={handleEdit} />
        </Suspense>
      </PageLayout.Content>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className='max-w-lg'>
          <DialogHeader>
            <DialogTitle>Новая спецификация</DialogTitle>
          </DialogHeader>
          <SpecificationForm onSuccess={() => setCreateOpen(false)} />
        </DialogContent>
      </Dialog>

      <SpecificationDetailDialog
        specId={editSpecId}
        onOpenChange={(open) => !open && setEditSpecId(null)}
      />
    </PageLayout>
  )
}

export default SpecificationsPage
