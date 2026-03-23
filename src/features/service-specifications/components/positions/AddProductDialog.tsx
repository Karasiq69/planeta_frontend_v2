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
import { useProductsList } from '@/features/products/api/queries'
import useDebouncedSearch from '@/hooks/use-debounced-search'

import { useAddSpecProduct } from '../../api/mutations'
import { addSpecProductSchema, type AddSpecProductFormData } from '../forms/schema'

import type { Product } from '@/features/products/types'

interface Props {
  specId: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const AddProductDialog = ({ specId, open, onOpenChange }: Props) => {
  const { searchTerm, searchError, debouncedHandleSearch } = useDebouncedSearch()
  const { data: products, isLoading, isFetching } = useProductsList({ page: 1, pageSize: 20, searchTerm })
  const { mutate: addProduct, isPending } = useAddSpecProduct(specId)

  const form = useForm<AddSpecProductFormData>({
    resolver: zodResolver(addSpecProductSchema),
    defaultValues: {
      productId: 0,
      quantity: 0,
      discountPercent: undefined,
    },
  })

  useEffect(() => {
    if (!open) {
      form.reset({ productId: 0, quantity: 0, discountPercent: undefined })
    }
  }, [open, form])

  const handleSelectProduct = (product: Product) => {
    form.setValue('productId', product.id, { shouldValidate: true })
  }

  const onSubmit = (data: AddSpecProductFormData) => {
    addProduct(data, {
      onSuccess: () => onOpenChange(false),
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить товар</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='productId'
              render={() => (
                <FormItem>
                  <FormLabel>Товар</FormLabel>
                  <FormControl>
                    <ComboboxSearch<Product>
                      data={products}
                      isLoading={isLoading || isFetching}
                      isPending={isPending}
                      onSearch={debouncedHandleSearch}
                      onSelect={handleSelectProduct}
                      getDisplayValue={(p) => p.name}
                      renderItem={(p) => <div>{p.name}</div>}
                      searchError={searchError}
                      placeholder='Поиск товаров'
                      width='w-full'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='quantity'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Количество</FormLabel>
                  <FormControl>
                    <Input type='number' min={0.01} step={0.01} placeholder='1' {...field} />
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
