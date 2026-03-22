'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useCreatePaymentCategory, useUpdatePaymentCategory } from '@/features/payments/api/cash-transactions-mutations'

import type { PaymentCategory } from '@/features/payments/types'

const createSchema = z.object({
  name: z.string().min(1, 'Введите название').max(100),
  type: z.enum(['income', 'expense', 'both'], { required_error: 'Выберите тип' }),
})

const editSchema = z.object({
  name: z.string().min(1, 'Введите название').max(100),
  isActive: z.boolean(),
})

interface PaymentCategoryFormProps {
  category?: PaymentCategory
  onSuccess: () => void
}

const PaymentCategoryForm = ({ category, onSuccess }: PaymentCategoryFormProps) => {
  const isEdit = !!category
  const { mutate: create, isPending: isCreating } = useCreatePaymentCategory()
  const { mutate: update, isPending: isUpdating } = useUpdatePaymentCategory()
  const isPending = isCreating || isUpdating

  const form = useForm({
    resolver: zodResolver(isEdit ? editSchema : createSchema),
    defaultValues: isEdit
      ? { name: category.name, isActive: category.isActive }
      : { name: '', type: 'income' as const },
  })

  const onSubmit = (values: Record<string, unknown>) => {
    if (isEdit) {
      update(
        { id: category.id, data: values as { name?: string; isActive?: boolean } },
        { onSuccess },
      )
    } else {
      create(values as { name: string; type: 'income' | 'expense' | 'both' }, { onSuccess })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input placeholder='Название категории' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!isEdit && (
          <FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Тип</FormLabel>
                <Select value={field.value as string} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Выберите тип' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='income'>Доход</SelectItem>
                    <SelectItem value='expense'>Расход</SelectItem>
                    <SelectItem value='both'>Оба</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {isEdit && (
          <FormField
            control={form.control}
            name='isActive'
            render={({ field }) => (
              <FormItem className='flex items-center justify-between rounded-lg border p-3'>
                <FormLabel className='cursor-pointer'>Активна</FormLabel>
                <FormControl>
                  <Switch checked={field.value as boolean} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        )}

        <Button type='submit' disabled={isPending} className='w-full'>
          {isPending ? 'Сохранение...' : isEdit ? 'Сохранить' : 'Создать'}
        </Button>
      </form>
    </Form>
  )
}

export default PaymentCategoryForm
