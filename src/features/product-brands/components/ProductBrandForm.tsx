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
import { useCreateProductBrand } from '@/features/product-brands/api/mutations'

import type { ProductBrand } from '@/features/products/types'

const brandSchema = z.object({
  name: z.string().min(1, 'Название обязательно').max(100, 'Максимум 100 символов'),
  country: z.string().optional().transform((v) => v || undefined),
})

type BrandFormData = z.infer<typeof brandSchema>

interface Props {
  onSuccess: (brand: ProductBrand) => void
  onClose: () => void
}

export const ProductBrandForm = ({ onSuccess, onClose }: Props) => {
  const createMutation = useCreateProductBrand()

  const form = useForm<BrandFormData>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: '',
      country: '',
    },
  })

  const onSubmit = (data: BrandFormData) => {
    createMutation.mutate(data, {
      onSuccess: (brand) => {
        onSuccess(brand)
      },
    })
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
                <Input placeholder='Название бренда' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='country'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Страна</FormLabel>
              <FormControl>
                <Input placeholder='Германия' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex gap-2'>
          <Button type='submit' disabled={createMutation.isPending} className='flex-1'>
            Создать
            {createMutation.isPending && <LoaderAnimated className='ml-2 text-white' />}
          </Button>
          <Button type='button' variant='outline' onClick={onClose}>
            Отмена
          </Button>
        </div>
      </form>
    </Form>
  )
}
