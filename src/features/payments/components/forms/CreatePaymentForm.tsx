'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowRightLeft,
  Banknote,
  CreditCard,
  Globe,
  Loader2,
  MessageSquare,
} from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useCreatePayment } from '@/features/payments/api/mutations'
import { useCashRegisters } from '@/features/payments/api/queries'
import { formatMoney } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { createPaymentSchema } from './schema'

import type { CreatePaymentFormValues } from './schema'

const PAYMENT_METHODS = [
  { value: 'cash', label: 'Наличные', icon: Banknote },
  { value: 'card', label: 'Карта', icon: CreditCard },
  { value: 'transfer', label: 'Перевод', icon: ArrowRightLeft },
  { value: 'online', label: 'Онлайн', icon: Globe },
] as const

interface CreatePaymentFormProps {
  orderId: number
  remainingAmount?: number
  totalCost?: number
  onSuccess?: () => void
}

const CreatePaymentForm = ({ orderId, remainingAmount, totalCost, onSuccess }: CreatePaymentFormProps) => {
  const { mutate, isPending } = useCreatePayment(orderId)
  const { data: cashRegisters } = useCashRegisters()
  const [showComment, setShowComment] = useState(false)

  const activeCashRegisters = cashRegisters?.filter((cr) => cr.isActive) ?? []

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreatePaymentFormValues>({
    resolver: zodResolver(createPaymentSchema),
    defaultValues: {
      orderId,
      paymentMethod: 'cash',
      amount: remainingAmount && remainingAmount > 0 ? remainingAmount : undefined,
    },
  })

  const selectedMethod = watch('paymentMethod')

  const onSubmit = (data: CreatePaymentFormValues) => {
    mutate(data, { onSuccess })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
      {/* Payment summary bar */}
      {totalCost != null && remainingAmount != null && (
        <div className='flex items-center justify-between rounded-lg bg-muted/60 px-4 py-2.5 text-sm'>
          <div className='text-muted-foreground'>
            К оплате: <span className='font-medium text-foreground'>{formatMoney(totalCost)}</span>
          </div>
          <div className='text-muted-foreground'>
            Остаток:{' '}
            <span className={cn(
              'font-medium',
              remainingAmount > 0 ? 'text-red-500' : 'text-emerald-600'
            )}>
              {formatMoney(remainingAmount)}
            </span>
          </div>
        </div>
      )}

      {/* Hero amount input */}
      <div className='space-y-2'>
        <div className='relative'>
          <input
            id='amount'
            type='number'
            min='1'
            placeholder='0'
            {...register('amount')}
            className={cn(
              'w-full rounded-xl border-2 bg-muted/30 px-5 py-5 pr-14 text-center text-4xl font-semibold tracking-tight tabular-nums transition-colors',
              'placeholder:text-muted-foreground/30',
              'focus:border-emerald-500 focus:bg-background focus:outline-none',
              errors.amount ? 'border-destructive' : 'border-border'
            )}
          />
          <span className='pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-2xl font-medium text-muted-foreground/50'>
            ₽
          </span>
        </div>
        {errors.amount && <p className='text-center text-sm text-destructive'>{errors.amount.message}</p>}
      </div>

      {/* Payment method toggles */}
      <div className='space-y-2'>
        <Label className='text-xs text-muted-foreground'>Способ оплаты</Label>
        <div className='grid grid-cols-4 gap-2'>
          {PAYMENT_METHODS.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type='button'
              onClick={() => setValue('paymentMethod', value)}
              className={cn(
                'flex flex-col items-center gap-1.5 rounded-lg border-2 px-2 py-3 text-xs font-medium transition-all',
                selectedMethod === value
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                  : 'border-transparent bg-muted/50 text-muted-foreground hover:bg-muted'
              )}
            >
              <Icon className='size-5' />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Cash register select */}
      <div className='space-y-2'>
        <Label className='text-xs text-muted-foreground'>Касса</Label>
        <Select onValueChange={(v) => setValue('cashRegisterId', Number(v))}>
          <SelectTrigger className='h-11'>
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
        {errors.cashRegisterId && (
          <p className='text-sm text-destructive'>{errors.cashRegisterId.message}</p>
        )}
      </div>

      {/* Collapsible comment */}
      {showComment ? (
        <div className='space-y-2'>
          <Label className='text-xs text-muted-foreground'>Комментарий</Label>
          <Textarea placeholder='Необязательно' rows={2} {...register('comment')} />
        </div>
      ) : (
        <button
          type='button'
          onClick={() => setShowComment(true)}
          className='flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors'
        >
          <MessageSquare className='size-3.5' />
          Добавить комментарий
        </button>
      )}

      {/* Submit */}
      <Button
        type='submit'
        disabled={isPending}
        className='h-12 w-full bg-emerald-600 text-base font-semibold hover:bg-emerald-700 text-white'
      >
        {isPending ? (
          <>
            <Loader2 className='mr-2 size-4 animate-spin' />
            Обработка...
          </>
        ) : (
          'Принять оплату'
        )}
      </Button>
    </form>
  )
}

export default CreatePaymentForm
