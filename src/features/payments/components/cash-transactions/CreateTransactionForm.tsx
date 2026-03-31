'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { formatMoney } from '@/lib/utils'
import { useCashRegisterBalance, usePaymentCategories } from '@/features/payments/api/cash-transactions-queries'
import { useCreateCashTransaction } from '@/features/payments/api/cash-transactions-mutations'

import type { TransactionType } from '@/features/payments/types'

const schema = z.object({
  type: z.enum(['income', 'expense']),
  categoryId: z.number({ required_error: 'Выберите категорию' }),
  amount: z.number({ required_error: 'Укажите сумму' }).positive('Сумма должна быть больше 0'),
  description: z.string().max(500).optional(),
})

type FormValues = z.infer<typeof schema>

interface CreateTransactionFormProps {
  cashRegisterId: number
  onSuccess: () => void
}

const CreateTransactionForm = ({ cashRegisterId, onSuccess }: CreateTransactionFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { type: 'income', description: '' },
  })

  const selectedType = form.watch('type') as TransactionType
  const { data: categories } = usePaymentCategories({ isActive: true })
  const { data: balanceData } = useCashRegisterBalance(cashRegisterId)
  const { mutate: create, isPending } = useCreateCashTransaction()

  const filteredCategories = categories?.filter(
    (cat) => cat.type === selectedType || cat.type === 'both',
  )

  const onSubmit = (values: FormValues) => {
    create(
      { ...values, cashRegisterId },
      { onSuccess },
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Тип операции</FormLabel>
              <FormControl>
                <ToggleGroup
                  type='single'
                  value={field.value}
                  onValueChange={(val) => {
                    if (val) {
                      field.onChange(val)
                      form.resetField('categoryId')
                    }
                  }}
                  className='justify-start'
                >
                  <ToggleGroupItem value='income' className='data-[state=on]:bg-emerald-100 data-[state=on]:text-emerald-700'>
                    Доход
                  </ToggleGroupItem>
                  <ToggleGroupItem value='expense' className='data-[state=on]:bg-red-100 data-[state=on]:text-red-700'>
                    Расход
                  </ToggleGroupItem>
                </ToggleGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='categoryId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Категория</FormLabel>
              <Select
                value={field.value?.toString()}
                onValueChange={(val) => field.onChange(Number(val))}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Выберите категорию' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {filteredCategories?.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='amount'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Сумма</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='0'
                  {...field}
                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  value={field.value ?? ''}
                />
              </FormControl>
              {selectedType === 'expense' && balanceData && (
                <p className='text-xs text-muted-foreground'>
                  Баланс кассы: {formatMoney(balanceData.balance)}
                </p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea placeholder='Комментарий (необязательно)' className='resize-none' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={isPending} className='w-full'>
          {isPending ? 'Создание...' : 'Создать операцию'}
        </Button>
      </form>
    </Form>
  )
}

export default CreateTransactionForm
