'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateDocument } from '@/features/documents/api/mutations'
import FormFieldSelectOperation from '@/features/documents/components/FormFieldSelectOperation'
import { DocumentType } from '@/features/documents/lib/constants'
import FormFieldSelectWarehouse from '@/features/inventory-documents/components/form-field-select-warehouse'

const schema = z.object({
  fromWarehouseId: z.number({ required_error: 'Выберите склад-источник' }).int().positive(),
  warehouseId: z.number({ required_error: 'Выберите склад-назначение' }).int().positive(),
  operationType: z.string({ required_error: 'Выберите тип операции' }),
  orderId: z.coerce.number().int().positive().optional().or(z.literal('')),
  note: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

interface Props {
  defaultValues?: Partial<FormValues>
  onSubmit?: (values: FormValues) => void
  submitLabel?: string
  onSuccess?: (documentId: number) => void
}

const CreateTransferForm = ({
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
      ...externalDefaults,
    },
  })

  const onSubmit = (values: FormValues) => {
    if (externalSubmit) {
      externalSubmit(values)
      return
    }
    const { orderId, ...rest } = values
    mutate(
      {
        ...rest,
        type: DocumentType.TRANSFER,
        orderId: typeof orderId === 'number' ? orderId : undefined,
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
          <Label className='lg:w-36 text-muted-foreground'>Откуда:</Label>
          <div className='w-full'>
            <FormField
              control={form.control}
              name='fromWarehouseId'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormFieldSelectWarehouse field={field} placeholder='Склад-источник' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className='flex flex-col lg:flex-row lg:items-center gap-3'>
          <Label className='lg:w-36 text-muted-foreground'>Куда:</Label>
          <div className='w-full'>
            <FormField
              control={form.control}
              name='warehouseId'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormFieldSelectWarehouse field={field} placeholder='Склад-назначение' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className='flex flex-col lg:flex-row lg:items-center gap-3'>
          <Label className='lg:w-36 text-muted-foreground'>Операция:</Label>
          <div className='w-full'>
            <FormField
              control={form.control}
              name='operationType'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormFieldSelectOperation field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className='flex flex-col lg:flex-row lg:items-center gap-3'>
          <Label className='lg:w-36 text-muted-foreground'>Заказ:</Label>
          <div className='w-full'>
            <FormField
              control={form.control}
              name='orderId'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type='number' placeholder='ID связанного заказа' />
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

export default CreateTransferForm
