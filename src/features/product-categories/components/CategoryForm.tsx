'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import LoaderAnimated from '@/components/ui/LoaderAnimated'
import { Textarea } from '@/components/ui/textarea'
import { useCreateCategory, useUpdateCategory } from '@/features/product-categories/api/mutations'

import type { ProductCategory } from '@/features/products/types'

const categorySchema = z.object({
  name: z.string().min(1, 'Название обязательно').max(100, 'Максимум 100 символов'),
  description: z.string().optional(),
})

type CategoryFormData = z.infer<typeof categorySchema>

interface Props {
  category?: ProductCategory
  onSuccess: () => void
  onCancel: () => void
}

export const CategoryForm = ({ category, onSuccess, onCancel }: Props) => {
  const createMutation = useCreateCategory()
  const updateMutation = useUpdateCategory()
  const isPending = createMutation.isPending || updateMutation.isPending

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name ?? '',
      description: category?.description ?? '',
    },
  })

  const onSubmit = (data: CategoryFormData) => {
    if (category) {
      updateMutation.mutate(
        { id: category.id, data },
        { onSuccess },
      )
    } else {
      createMutation.mutate(data, { onSuccess })
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

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea placeholder='Описание категории' rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex gap-2'>
          <Button type='submit' disabled={isPending} className='flex-1'>
            {category ? 'Сохранить' : 'Создать'}
            {isPending && <LoaderAnimated className='ml-2 text-white' />}
          </Button>
          <Button type='button' variant='outline' onClick={onCancel}>
            Назад
          </Button>
        </div>
      </form>
    </Form>
  )
}
