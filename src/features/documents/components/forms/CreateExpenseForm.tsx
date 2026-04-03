'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { OrdersCombobox } from '@/components/orders/orders-combobox'
import { useCreateDocument } from '@/features/documents/api/mutations'
import { DocumentType, ExpenseCategory } from '@/features/documents/lib/constants'
import FormFieldSelectExpenseCategory from '@/features/documents/components/FormFieldSelectExpenseCategory'
import FormFieldSelectWarehouse from '@/features/inventory-documents/components/form-field-select-warehouse'
import SuppliersSelectField from '@/features/inventory-documents/components/form-field-supplier'

const schema = z
  .object({
    warehouseId: z.number({ required_error: 'Выберите склад' }).int().positive(),
    expenseCategory: z.string({ required_error: 'Выберите категорию расхода' }),
    supplierId: z.coerce.number().int().positive().optional().or(z.literal('')),
    orderId: z.coerce.number().int().positive().optional().or(z.literal('')),
    note: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.expenseCategory === ExpenseCategory.SUPPLIER_RETURN && !data.supplierId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Выберите поставщика для возврата',
        path: ['supplierId'],
      })
    }
  })

type FormValues = z.infer<typeof schema>

interface Props {
  defaultValues?: Partial<FormValues>
  onSubmit?: (values: FormValues) => void
  submitLabel?: string
  onSuccess?: (documentId: number) => void
}

const CreateExpenseForm = ({
  defaultValues: externalDefaults,
  onSubmit: externalSubmit,
  submitLabel = 'Создать',
  onSuccess,
}: Props) => {
  const { mutate, isPending } = useCreateDocument()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      note: '',
      orderId: '',
      supplierId: '',
      ...externalDefaults,
    },
  })

  const expenseCategory = form.watch('expenseCategory')

  const onSubmit = (values: FormValues) => {
    if (externalSubmit) {
      externalSubmit(values)
      return
    }
    const { orderId, supplierId, ...rest } = values
    mutate(
      {
        ...rest,
        type: DocumentType.EXPENSE,
        orderId: typeof orderId === 'number' ? orderId : undefined,
        supplierId: typeof supplierId === 'number' ? supplierId : undefined,
      },
      {
        onSuccess: (data) => {
          onSuccess?.(data.id)
        },
      }
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
        <div className='flex flex-col lg:flex-row lg:items-center gap-3'>
          <Label className='lg:w-36 text-muted-foreground'>Склад:</Label>
          <div className='w-full'>
            <FormField
              control={form.control}
              name='warehouseId'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormFieldSelectWarehouse field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className='flex flex-col lg:flex-row lg:items-center gap-3'>
          <Label className='lg:w-36 text-muted-foreground'>Категория:</Label>
          <div className='w-full'>
            <FormField
              control={form.control}
              name='expenseCategory'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormFieldSelectExpenseCategory field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {expenseCategory === ExpenseCategory.SUPPLIER_RETURN && (
          <SuppliersSelectField
            control={form.control}
            name='supplierId'
            label='Поставщик:'
          />
        )}

        <div className='flex flex-col lg:flex-row lg:items-center gap-3'>
          <Label className='lg:w-36 text-muted-foreground'>Заказ:</Label>
          <div className='w-full'>
            <FormField
              control={form.control}
              name='orderId'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <OrdersCombobox
                      onSelect={(order) => field.onChange(order.id)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className='flex flex-col lg:flex-row lg:items-center gap-3'>
          <Label className='lg:w-36 text-muted-foreground'>Примечание:</Label>
          <div className='w-full'>
            <FormField
              control={form.control}
              name='note'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder='Дополнительная информация' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className='flex gap-3'>
          <Button type='submit' disabled={isPending}>
            {isPending ? 'Сохранение...' : submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CreateExpenseForm
