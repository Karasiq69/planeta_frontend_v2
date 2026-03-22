'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import { usePaymentCategories } from '@/features/payments/api/cash-transactions-queries'
import PaymentCategoriesTable from './PaymentCategoriesTable'
import PaymentCategoryForm from './PaymentCategoryForm'

const PaymentCategoriesPage = () => {
  const [createOpen, setCreateOpen] = useState(false)
  const { data, isLoading } = usePaymentCategories()

  if (isLoading) return <LoaderSectionAnimated className='rounded p-10' />

  return (
    <Card className='space-y-4 p-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold'>Категории платежей</h3>
        <Button size='sm' onClick={() => setCreateOpen(true)}>
          <Plus className='mr-1.5 size-4' />
          Добавить категорию
        </Button>
      </div>

      {data && <PaymentCategoriesTable data={data} />}

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Новая категория</DialogTitle>
          </DialogHeader>
          <PaymentCategoryForm onSuccess={() => setCreateOpen(false)} />
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default PaymentCategoriesPage
