'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { ru } from 'date-fns/locale'
import { CalendarIcon, Warehouse } from 'lucide-react'
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
import { UpdateReceiptDocumentSchema } from '@/features/inventory-documents/receipt/components/forms/schema'
import {
  InventoryDocumentType
} from '@/features/inventory-documents/types'
import { cn } from '@/lib/utils'




import type {
  ReceiptDocument,
  UpdateReceiptDocumentDto} from '@/features/inventory-documents/types';

import SuppliersSelectField from '@/features/inventory-documents/components/form-field-supplier'
import FormFieldOrganization from '@/features/inventory-documents/components/form-field-organization'


type Props = {
  documentId?: number
  documentData?: ReceiptDocument
  onCreate?: (data: ReceiptDocument) => void
  onUpdate?: (documentId: number) => void
  onSubmit: (data: UpdateReceiptDocumentDto) => void // Используем тип формы
}

const ReceiptDocumentForm = ({ onSubmit, documentData: doc }: Props) => {
  const defaultValues = useMemo<UpdateReceiptDocumentDto>(() => {
    return {
      // Базовые поля UpdateReceiptDocumentSchema
      warehouseId: doc?.warehouseId || undefined,
      supplierId: doc?.receiptDocument?.supplierId || undefined,
      organizationId: doc?.organizationId || undefined,
      orderId: doc?.receiptDocument?.orderId || undefined,
      incomingNumber: doc?.receiptDocument?.incomingNumber || '',
      incomingDate: doc?.receiptDocument?.incomingDate
        ? new Date(doc?.receiptDocument?.incomingDate)
        : undefined,
      date: doc?.date ? new Date(doc?.date) : undefined,
      storageLocationId: doc?.receiptDocument?.storageLocationId || undefined,
      number: doc?.number || undefined,
      note: doc?.note || '',

      // Дополнительные поля для формы
      type: doc?.type || InventoryDocumentType.RECEIPT,
      createdAt: doc?.createdAt ? new Date(doc.createdAt) : new Date(),
      targetWarehouseId: undefined,
    }
  }, [doc])

  const form = useForm<UpdateReceiptDocumentDto>({
    resolver: zodResolver(UpdateReceiptDocumentSchema),
    defaultValues,
  })
  return (
    <Form {...form}>
      <form id='receiptDocumentForm' onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 md:gap-x-16 max-w-6xl'>
          {/* Тип документа */}
          <div className='flex flex-col lg:flex-row lg:items-center gap-3'>
            <Label htmlFor='document-type' className='lg:w-32 text-muted-foreground'>
              Тип:
            </Label>
            <div className='w-full'>
              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled>
                        <SelectTrigger id='document-type' className='flex-1'>
                          <SelectValue placeholder='Выберите тип документа' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='RECEIPT'>Поступление</SelectItem>
                          <SelectItem value='EXPENSE'>Расход</SelectItem>
                          <SelectItem value='RETURN'>Возврат</SelectItem>
                          <SelectItem value='TRANSFER'>Перемещение</SelectItem>
                          <SelectItem value='WRITE_OFF'>Списание</SelectItem>
                          <SelectItem value='INVENTORY'>Инвентаризация</SelectItem>
                        </SelectContent>
                      </Select>
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
                name='date'
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

          {/*Поставщик */}
          <SuppliersSelectField
            control={form.control}
            name='supplierId'
            label='Поставщик:'
            placeholder='Выбрать поставщика'
          />

          {/* Входящий номер */}
          <div className='flex flex-col lg:flex-row md:items-start gap-3'>
            <Label htmlFor='incoming-number' className='lg:w-32 text-muted-foreground md:pt-2'>
              Вх. номер:
            </Label>
            <div className='w-full grid grid-cols-[1fr_auto_1fr] md:grid-cols-[1fr_auto_1fr] items-center gap-2'>
              <FormField
                control={form.control}
                name='incomingNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input id='incoming-number' {...field} placeholder='№ договора' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Label htmlFor='incoming-date' className='text-center'>
                от
              </Label>
              <FormField
                control={form.control}
                name='incomingDate'
                render={({ field }) => (
                  <FormItem>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            id='incoming-date'
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

          {/* Склад */}
          <div className='flex flex-col lg:flex-row lg:items-center gap-3'>
            <Label htmlFor='warehouse-select' className='lg:w-32 text-muted-foreground'>
              Склад:
            </Label>
            <div className='w-full'>
              <FormField
                control={form.control}
                name='warehouseId'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(parseInt(value))}
                        value={field.value?.toString()}
                      >
                        <SelectTrigger
                          id='warehouse-select'
                          className="[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 [&>span_svg]:text-muted-foreground/80"
                        >
                          <SelectValue placeholder='Выберите склад' />
                        </SelectTrigger>
                        <SelectContent
                          className="[&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2"
                        >
                          <SelectItem value='1' className="flex gap-2">
                            <Warehouse size={16} aria-hidden='true' />
                            Склад Маринин А.С.
                          </SelectItem>
                          <SelectItem value='2'>
                            <Warehouse size={16} aria-hidden='true' />
                            Центральный склад
                          </SelectItem>
                          <SelectItem value='3'>
                            <Warehouse size={16} aria-hidden='true' />
                            Розничный склад
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Склад назначения (для перемещений) */}

          {/*<div className="flex flex-col lg:flex-row lg:items-center gap-3">*/}
          {/*    <Label htmlFor="target-warehouse-select" className="lg:w-32 text-muted-foreground">Склад*/}
          {/*        назначения:</Label>*/}
          {/*    <div className="w-full">*/}
          {/*        <FormField*/}
          {/*            control={form.control}*/}
          {/*            name="targetWarehouseId"*/}
          {/*            render={({field}) => (*/}
          {/*                <FormItem className="flex-1">*/}
          {/*                    <FormControl>*/}
          {/*                        <Select*/}
          {/*                            disabled*/}
          {/*                            onValueChange={(value) => field.onChange(value)}*/}
          {/*                            defaultValue={field.value?.toString()}*/}
          {/*                        >*/}
          {/*                            <SelectTrigger*/}
          {/*                                id="target-warehouse-select"*/}
          {/*                                className={'[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 [&>span_svg]:text-muted-foreground/80'}*/}
          {/*                            >*/}
          {/*                                <SelectValue placeholder="Выберите склад назначения"/>*/}
          {/*                            </SelectTrigger>*/}
          {/*                            <SelectContent*/}
          {/*                                className={'[&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2'}>*/}
          {/*                                <SelectItem value="1" className={'flex gap-2'}>*/}
          {/*                                    <Warehouse size={16} aria-hidden="true"/>*/}
          {/*                                    Склад Маринин А.С.*/}
          {/*                                </SelectItem>*/}
          {/*                                <SelectItem value="2">*/}
          {/*                                    <Warehouse size={16} aria-hidden="true"/>*/}
          {/*                                    Центральный склад*/}
          {/*                                </SelectItem>*/}
          {/*                                <SelectItem value="3">*/}
          {/*                                    <Warehouse size={16} aria-hidden="true"/>*/}
          {/*                                    Розничный склад*/}
          {/*                                </SelectItem>*/}
          {/*                            </SelectContent>*/}
          {/*                        </Select>*/}
          {/*                    </FormControl>*/}
          {/*                    <FormMessage/>*/}
          {/*                </FormItem>*/}
          {/*            )}*/}
          {/*        />*/}
          {/*    </div>*/}
          {/*</div>*/}

          {/*Организация */}
          <FormFieldOrganization
            form={form}
            label='Организация'
            placeholder='Выбрать организацию'
          />

          {/* Примечание */}
          <div className='col-span-1 flex flex-col lg:flex-row lg:items-center gap-3'>
            <Label htmlFor='note-field' className='lg:w-32 text-muted-foreground'>
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

export default ReceiptDocumentForm
