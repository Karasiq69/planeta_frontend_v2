'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import { createPaymentSchema } from './schema'

import type { CreatePaymentFormValues } from './schema'

interface CreatePaymentFormProps {
  orderId: number
  onSuccess?: () => void
}

const CreatePaymentForm = ({ orderId, onSuccess }: CreatePaymentFormProps) => {
  const { mutate, isPending } = useCreatePayment(orderId)
  const { data: cashRegisters } = useCashRegisters()

  const activeCashRegisters = cashRegisters?.filter((cr) => cr.isActive) ?? []

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreatePaymentFormValues>({
    resolver: zodResolver(createPaymentSchema),
    defaultValues: { orderId, paymentMethod: 'cash' },
  })

  const onSubmit = (data: CreatePaymentFormValues) => {
    mutate(data, { onSuccess })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='amount'>Сумма (руб.)</Label>
        <Input
          id='amount'
          type='number'
          min='1'
          placeholder='0'
          {...register('amount', { valueAsNumber: true })}
        />
        {errors.amount && <p className='text-sm text-destructive'>{errors.amount.message}</p>}
      </div>

      <div className='space-y-2'>
        <Label>Касса</Label>
        <Select onValueChange={(v) => setValue('cashRegisterId', Number(v))}>
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
        {errors.cashRegisterId && (
          <p className='text-sm text-destructive'>{errors.cashRegisterId.message}</p>
        )}
      </div>

      <div className='space-y-2'>
        <Label>Способ оплаты</Label>
        <Select
          defaultValue='cash'
          onValueChange={(v) => setValue('paymentMethod', v as CreatePaymentFormValues['paymentMethod'])}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='cash'>Наличные</SelectItem>
            <SelectItem value='card'>Карта</SelectItem>
            <SelectItem value='transfer'>Перевод</SelectItem>
            <SelectItem value='online'>Онлайн</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='comment'>Комментарий</Label>
        <Textarea id='comment' placeholder='Необязательно' {...register('comment')} />
      </div>

      <Button type='submit' disabled={isPending} className='w-full'>
        {isPending ? 'Обработка...' : 'Принять оплату'}
      </Button>
    </form>
  )
}

export default CreatePaymentForm
