'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCashRegisters } from '@/features/payments/api/queries'
import { useCashRegisterBalance } from '@/features/payments/api/cash-transactions-queries'
import { formatMoney } from '@/lib/utils'
import { usePayPayroll } from '@/features/payrolls/api/mutations'

interface PayPayrollDialogProps {
  payrollId: number
  totalAmount: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

const PayPayrollDialog = ({ payrollId, totalAmount, open, onOpenChange }: PayPayrollDialogProps) => {
  const [cashRegisterId, setCashRegisterId] = useState<number | null>(null)
  const { data: cashRegisters } = useCashRegisters()
  const { data: balanceData } = useCashRegisterBalance(cashRegisterId ?? 0, !!cashRegisterId)
  const { mutate: pay, isPending } = usePayPayroll(payrollId)

  const activeCashRegisters = cashRegisters?.filter((cr) => cr.isActive) ?? []
  const balance = balanceData?.balance
  const insufficientFunds = balance !== undefined && balance < totalAmount

  const handlePay = () => {
    if (!cashRegisterId) return
    pay(cashRegisterId, {
      onSuccess: () => {
        onOpenChange(false)
        setCashRegisterId(null)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) setCashRegisterId(null) }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Выплата ведомости</DialogTitle>
        </DialogHeader>

        <div className='space-y-4'>
          <div className='rounded-lg border bg-muted/50 px-4 py-3 text-sm'>
            <span className='text-muted-foreground'>Сумма к выплате: </span>
            <span className='font-semibold'>{formatMoney(totalAmount)}</span>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium'>Касса</label>
            <Select
              value={cashRegisterId?.toString() ?? ''}
              onValueChange={(val) => setCashRegisterId(Number(val))}
            >
              <SelectTrigger>
                <SelectValue placeholder='Выберите кассу' />
              </SelectTrigger>
              <SelectContent>
                {activeCashRegisters.map((cr) => (
                  <SelectItem key={cr.id} value={cr.id.toString()}>
                    {cr.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {cashRegisterId && balance !== undefined && (
            <div className={`rounded-lg border px-4 py-3 text-sm ${insufficientFunds ? 'border-red-200 bg-red-50' : 'bg-muted/50'}`}>
              <span className='text-muted-foreground'>Баланс кассы: </span>
              <span className={`font-semibold ${insufficientFunds ? 'text-red-600' : ''}`}>
                {formatMoney(balance)}
              </span>
              {insufficientFunds && (
                <p className='text-red-600 text-xs mt-1'>Недостаточно средств в кассе</p>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button
            onClick={handlePay}
            disabled={!cashRegisterId || insufficientFunds || isPending}
          >
            {isPending ? 'Выплата...' : 'Выплатить'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PayPayrollDialog
