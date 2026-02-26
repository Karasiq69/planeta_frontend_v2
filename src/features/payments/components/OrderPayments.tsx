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
import { useOrderPayments } from '@/features/payments/api/queries'
import CreatePaymentForm from './forms/CreatePaymentForm'
import OrderPaymentsList from './OrderPaymentsList'
import PaymentSummaryCard from './PaymentSummaryCard'

interface OrderPaymentsProps {
  orderId: number
}

const OrderPayments = ({ orderId }: OrderPaymentsProps) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { data: payments, isLoading } = useOrderPayments(orderId)

  return (
    <div className='space-y-4'>
      <PaymentSummaryCard orderId={orderId} />

      <div className='space-y-3'>
        <div className='flex items-center justify-between'>
          <h4 className='text-sm font-medium'>Платежи</h4>
          <Button size='sm' onClick={() => setDialogOpen(true)}>
            <Plus className='mr-1 size-3.5' />
            Принять оплату
          </Button>
        </div>

        {isLoading ? (
          <LoaderSectionAnimated className='rounded p-6' />
        ) : (
          <OrderPaymentsList payments={payments ?? []} orderId={orderId} />
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Принять оплату</DialogTitle>
          </DialogHeader>
          <CreatePaymentForm orderId={orderId} onSuccess={() => setDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default OrderPayments
