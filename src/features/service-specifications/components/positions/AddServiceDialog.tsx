'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { ComboboxSearch } from '@/components/ComboboxSearch'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAllServices } from '@/features/services/api/queries'
import useDebouncedSearch from '@/hooks/use-debounced-search'

import { useAddSpecService } from '../../api/mutations'
import { addSpecServiceSchema, type AddSpecServiceFormData } from '../forms/schema'

import type { IService } from '@/features/services/types'

interface Props {
  specId: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const AddServiceDialog = ({ specId, open, onOpenChange }: Props) => {
  const { searchTerm, searchError, debouncedHandleSearch } = useDebouncedSearch()
  const { data: services, isLoading, isFetching } = useAllServices({ page: 1, pageSize: 20, searchTerm })
  const { mutate: addService, isPending } = useAddSpecService(specId)

  const form = useForm<AddSpecServiceFormData>({
    resolver: zodResolver(addSpecServiceSchema),
    defaultValues: {
      serviceId: 0,
      defaultDuration: 0,
      discountPercent: undefined,
    },
  })

  useEffect(() => {
    if (!open) {
      form.reset({ serviceId: 0, defaultDuration: 0, discountPercent: undefined })
    }
  }, [open, form])

  const handleSelectService = (service: IService) => {
    form.setValue('serviceId', service.id, { shouldValidate: true })
    form.setValue('defaultDuration', service.defaultDuration, { shouldValidate: true })
  }

  const onSubmit = (data: AddSpecServiceFormData) => {
    addService(data, {
      onSuccess: () => onOpenChange(false),
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить услугу</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='serviceId'
              render={() => (
                <FormItem>
                  <FormLabel>Услуга</FormLabel>
                  <FormControl>
                    <ComboboxSearch<IService>
                      data={services}
                      isLoading={isLoading || isFetching}
                      isPending={isPending}
                      onSearch={debouncedHandleSearch}
                      onSelect={handleSelectService}
                      getDisplayValue={(s) => s.name}
                      renderItem={(s) => <div>{s.name}</div>}
                      searchError={searchError}
                      placeholder='Поиск услуг'
                      width='w-full'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='defaultDuration'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Длительность (мин)</FormLabel>
                  <FormControl>
                    <Input type='number' min={1} placeholder='60' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='discountPercent'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Скидка (%) — необязательно</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      min={0}
                      max={100}
                      placeholder='0'
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
                Отмена
              </Button>
              <Button type='submit' disabled={isPending}>
                {isPending ? 'Добавление...' : 'Добавить'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
