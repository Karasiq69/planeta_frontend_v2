'use client'

import { Wallet } from 'lucide-react'

import { AppSheet } from '@/components/ds/base/AppSheet'
import { Separator } from '@/components/ui/separator'
import { formatMoney } from '@/lib/utils'
import { useCashRegisterBalance } from '@/features/payments/api/cash-transactions-queries'

import CashTransactionsTable from './CashTransactionsTable'
import CreateTransactionDialog from './CreateTransactionDialog'

import type { CashRegister } from '@/features/payments/types'

interface Props {
  cashRegister: CashRegister | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const CashRegisterTransactionsSheet = ({ cashRegister, open, onOpenChange }: Props) => {
  const { data: balanceData } = useCashRegisterBalance(cashRegister?.id ?? 0, !!cashRegister)

  const balance = balanceData?.balance ?? cashRegister?.balance ?? 0

  return (
    <AppSheet
      open={open}
      onOpenChange={onOpenChange}
      title={cashRegister?.name ?? ''}
      description='Журнал кассовых операций'
      size='5xl'
      headerActions={cashRegister && <CreateTransactionDialog cashRegisterId={cashRegister.id} />}
    >
      {cashRegister && (
        <div className='rounded-lg border bg-muted/50 px-4 py-3'>
          <div className='flex items-center gap-2 text-sm text-muted-foreground mb-0.5'>
            <Wallet size={14} />
            Баланс
          </div>
          <div
            className={`text-xl font-semibold tabular-nums ${balance <= 0 ? 'text-red-600' : ''}`}
          >
            {formatMoney(balance)}
          </div>
        </div>
      )}

      <Separator className='my-4' />

      <div className='flex-1 min-h-0 flex flex-col'>
        {cashRegister && <CashTransactionsTable cashRegisterId={cashRegister.id} />}
      </div>
    </AppSheet>
  )
}

export default CashRegisterTransactionsSheet
