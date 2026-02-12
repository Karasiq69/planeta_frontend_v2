'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { ru } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import FormFieldOrganization from '@/features/inventory-documents/components/form-field-organization'
import FormFieldSelectWarehouse from '@/features/inventory-documents/components/form-field-select-warehouse'
import FormFieldSelectOperation from '@/features/inventory-documents/transfer/components/forms/form-field-select-operation'
import { UpdateTransferDocumentSchema } from '@/features/inventory-documents/transfer/components/forms/schema'
import { OperationType } from '@/features/inventory-documents/transfer/types'
import { cn } from '@/lib/utils'

import type { UpdateTransferDocumentDto } from '@/features/inventory-documents/transfer/components/forms/schema'
import type { TransferDocument } from '@/features/inventory-documents/transfer/types'

type Props = {
  documentData?: TransferDocument
  onCreate?: (data: TransferDocument) => void
  onUpdate?: (documentId: number) => void
  onSubmit: (data: UpdateTransferDocumentDto) => void
}

const TransferDocumentForm = ({ onSubmit, documentData: doc }: Props) => {
  const defaultValues: UpdateTransferDocumentDto = useMemo(() => {
    return {
      sourceWarehouseId: doc?.warehouseId || 1,
      destinationWarehouseId: doc?.transferDocument?.destinationWarehouseId || 2,
      organizationId: doc?.organizationId || 1,
      relatedOrderId: doc?.transferDocument?.relatedOrderId || undefined,
      operationType: doc?.operationType || OperationType.SEND_TO_REPAIR,
      number: doc?.number?.toString() || doc?.id.toString(),
      note: doc?.note || '',
      createdAt: doc?.createdAt ? new Date(doc.createdAt) : new Date(),
    }
  }, [doc])

  const form = useForm<UpdateTransferDocumentDto>({
    resolver: zodResolver(UpdateTransferDocumentSchema),
    defaultValues,
  })

  return (
    <Form {...form}>
      <form id='transferDocumentForm' onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 md:gap-x-16 max-w-6xl'>
          {/* Склад-источник */}
          <div className='flex flex-col lg:flex-row lg:items-center gap-3'>
            <Label htmlFor='source-warehouse-select' className='lg:w-32 text-muted-foreground'>
              Отправитель:
            </Label>
            <div className='w-full'>
              <FormField
                control={form.control}
                name='sourceWarehouseId'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormControl>
                      <FormFieldSelectWarehouse
                        field={field}
                        placeholder='Выберите источник'
                        id='destination-warehouse-select'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Номер документа */}
          <div className='flex flex-col lg:flex-row md:items-start gap-3'>
            <Label htmlFor='document-number' className='lg:w-32 text-muted-foreground md:pt-2'>
              Номер:
            </Label>
            <div className='w-full grid grid-cols-[1fr_auto_1fr] md:grid-cols-[1fr_auto_1fr] items-center gap-2'>
              <FormField
                disabled
                control={form.control}
                name='number'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input id='document-number' {...field} placeholder='Авто' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Label htmlFor='document-date' className='text-center'>
                от
              </Label>
              <FormField
                control={form.control}
                name='createdAt'
                render={({ field }) => (
                  <FormItem>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            id='document-date'
                            type='button'
                            variant='outline'
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? field.value.toLocaleDateString() : 'Выберите дату'}
                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          locale={ru}
                          mode='single'
                          selected={field.value}
                          onSelect={field.onChange}
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

          {/* Операция */}
          <div className='flex flex-col lg:flex-row lg:items-center gap-3'>
            <Label htmlFor='operationType' className='lg:w-32 text-muted-foreground'>
              Операция
            </Label>
            <div className='w-full'>
              <FormField
                control={form.control}
                name='operationType'
                render={({ field }) => (
                  <FormItem>
                    <FormControl defaultValue={OperationType.SEND_TO_REPAIR}>
                      <FormFieldSelectOperation field={field} placeholder='Выберите операцию' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Склад назначения */}
          <div className='flex flex-col lg:flex-row lg:items-center gap-3'>
            <Label htmlFor='destination-warehouse-select' className='lg:w-32 text-muted-foreground'>
              Получатель:
            </Label>
            <div className='w-full'>
              <FormField
                control={form.control}
                name='destinationWarehouseId'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormControl>
                      <FormFieldSelectWarehouse
                        field={field}
                        placeholder='Выберите склад назначения'
                        id='destination-warehouse-select'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Организация */}
          <FormFieldOrganization
            form={form}
            label='Организация'
            placeholder='Выбрать организацию'
          />

          {/* Связанный заказ */}
          <div className='flex flex-col lg:flex-row lg:items-center gap-3'>
            <Label htmlFor='related-order' className='lg:w-32 text-muted-foreground'>
              Связанный заказ:
            </Label>
            <div className='w-full'>
              <FormField
                control={form.control}
                name='relatedOrderId'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(parseInt(value))}
                        value={field.value?.toString()}
                      >
                        <SelectTrigger id='related-order'>
                          <SelectValue placeholder='Выберите заказ' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='1'>Заказ №001</SelectItem>
                          <SelectItem value='2'>Заказ №002</SelectItem>
                          <SelectItem value='3'>Заказ №003</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Примечание */}
          <div className='col-span-1 flex flex-col lg:flex-row lg:items-center gap-3'>
            <Label htmlFor='note' className='lg:w-32 text-muted-foreground'>
              Примечание:
            </Label>
            <div className='w-full'>
              <FormField
                control={form.control}
                name='note'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input id='note-field' {...field} placeholder='Дополнительная информация' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default TransferDocumentForm
