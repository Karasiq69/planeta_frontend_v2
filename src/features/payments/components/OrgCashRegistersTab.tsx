'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

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
import CashRegisterForm from './forms/CashRegisterForm'

const OrgCashRegistersTab = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { data, isLoading } = useCashRegisters()

  if (isLoading) return <LoaderSectionAnimated className='rounded p-10' />

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='rounded-lg border bg-muted/50 px-4 py-3 text-sm'>
          <span className='text-muted-foreground'>Общий баланс: </span>
          <span className='font-semibold'>
            {formatAmount(data?.reduce((sum, cr) => sum + cr.balance, 0) ?? 0)}
          </span>
        </div>
        <Button size='sm' onClick={() => setDialogOpen(true)}>
          <Plus className='mr-1.5 size-4' />
          Добавить кассу
        </Button>
      </div>

      {data && <CashRegistersTable data={data} />}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Новая касса</DialogTitle>
          </DialogHeader>
          <CashRegisterForm onSuccess={() => setDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default OrgCashRegistersTab
