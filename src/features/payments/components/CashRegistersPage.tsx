'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import PageHeader from '@/components/common/PageHeader'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import { useCashRegisters } from '@/features/payments/api/queries'
import { formatAmount } from './columns'
import CashRegistersTable from './CashRegistersTable'
import CreateCashRegisterForm from './forms/CreateCashRegisterForm'

const CashRegistersPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { data, isLoading } = useCashRegisters()

  return (
    <div className='space-y-6'>
      <PageHeader
        title='Кассы'
        showBackButton
        elements={[
          <Button key='add' size='sm' onClick={() => setDialogOpen(true)}>
            <Plus className='mr-1.5 size-4' />
            Добавить кассу
          </Button>,
        ]}
      />

      {isLoading ? (
        <LoaderSectionAnimated className='rounded p-10' />
      ) : data ? (
        <>
          <div className='rounded-lg border bg-muted/50 px-4 py-3 text-sm'>
            <span className='text-muted-foreground'>Общий баланс: </span>
            <span className='font-semibold'>
              {formatAmount(data.reduce((sum, cr) => sum + cr.balance, 0))}
            </span>
          </div>
          <CashRegistersTable data={data} />
        </>
      ) : (
        <div className='p-4'>Данные недоступны</div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Новая касса</DialogTitle>
          </DialogHeader>
          <CreateCashRegisterForm onSuccess={() => setDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CashRegistersPage
