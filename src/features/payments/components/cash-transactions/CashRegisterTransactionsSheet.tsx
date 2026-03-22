'use client'

import { Wallet } from 'lucide-react'

import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useCashRegisterBalance } from '@/features/payments/api/cash-transactions-queries'
import CashTransactionsTable from './CashTransactionsTable'
import CreateTransactionDialog from './CreateTransactionDialog'

import type { CashRegister } from '@/features/payments/types'

interface Props {
  cashRegister: CashRegister | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const formatBalance = (balance: number) =>
  new Intl.NumberFormat('ru-RU').format(balance) + ' ₽'

const CashRegisterTransactionsSheet = ({ cashRegister, open, onOpenChange }: Props) => {
  const { data: balanceData } = useCashRegisterBalance(
    cashRegister?.id ?? 0,
    !!cashRegister,
  )

  const balance = balanceData?.balance ?? cashRegister?.balance ?? 0

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex flex-col sm:max-w-4xl p-0 gap-0'>
        <SheetHeader className='p-6 pb-4'>
          <div className='flex items-center justify-between'>
            <div>
              <SheetTitle className='text-left'>{cashRegister?.name}</SheetTitle>
              <SheetDescription className='text-left'>
                Журнал кассовых операций
              </SheetDescription>
            </div>
            {cashRegister && <CreateTransactionDialog cashRegisterId={cashRegister.id} />}
          </div>
        </SheetHeader>

        {cashRegister && (
          <div className='mx-6 rounded-lg border bg-muted/50 px-4 py-3'>
            <div className='flex items-center gap-2 text-sm text-muted-foreground mb-0.5'>
              <Wallet size={14} />
              Баланс
            </div>
            <div className={`text-xl font-semibold tabular-nums ${balance <= 0 ? 'text-red-600' : ''}`}>
              {formatBalance(balance)}
            </div>
          </div>
        )}

        <Separator className='mt-4' />

        <div className='flex-1 min-h-0 flex flex-col'>
          {cashRegister && <CashTransactionsTable cashRegisterId={cashRegister.id} />}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default CashRegisterTransactionsSheet
