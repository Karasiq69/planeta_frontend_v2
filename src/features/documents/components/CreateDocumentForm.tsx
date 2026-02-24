'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { useCreateDocument } from '@/features/documents/api/mutations'
import FormFieldOrganization from '@/features/inventory-documents/components/form-field-organization'
import FormFieldSelectWarehouse from '@/features/inventory-documents/components/form-field-select-warehouse'
import SuppliersSelectField from '@/features/inventory-documents/components/form-field-supplier'

import type { InventoryDocumentType } from '@/features/inventory-documents/types'

const schema = z.object({
  warehouseId: z.number({ required_error: 'Выберите склад' }).int().positive(),
  supplierId: z.number().int().positive().optional(),
  organizationId: z.number().int().positive().optional(),
  orderId: z.number().int().positive().optional(),
  note: z.string().optional(),
  incomingNumber: z.string().optional(),
  incomingDate: z.coerce.date().optional(),
})

type FormValues = z.infer<typeof schema>

interface Props {
  type: InventoryDocumentType
  onSuccess?: (documentId: number) => void
}

const CreateDocumentForm = ({ type, onSuccess }: Props) => {
  const { mutate, isPending } = useCreateDocument()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      note: '',
      incomingNumber: '',
    },
  })

  const onSubmit = (values: FormValues) => {
    mutate(
      {
        ...values,
        type,
        incomingDate: values.incomingDate?.toISOString(),
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

        <SuppliersSelectField control={form.control} name='supplierId' label='Поставщик:' />

        <FormFieldOrganization form={form} />

        <div className='flex flex-col lg:flex-row lg:items-center gap-3'>
          <Label className='lg:w-36 text-muted-foreground'>Вх. номер:</Label>
          <div className='w-full flex gap-2 items-center'>
            <FormField
              control={form.control}
              name='incomingNumber'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormControl>
                    <Input {...field} placeholder='Входящий номер' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <span className='text-muted-foreground text-sm'>от</span>
            <FormField
              control={form.control}
              name='incomingDate'
              render={({ field }) => (
                <FormItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='outline'
                          className={cn(
                            'w-40 pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? format(field.value, 'dd.MM.yyyy', { locale: ru }) : 'Дата'}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        locale={ru}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
            {isPending ? 'Создание...' : 'Создать'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CreateDocumentForm
