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
import { useCreateBrand, useUpdateBrand } from '@/features/cars/api/mutations'

import type { ICarBrand } from '@/features/cars/types'

const brandSchema = z.object({
  name: z.string().min(1, 'Название обязательно').max(100, 'Максимум 100 символов'),
  logo: z.string().url('Некорректный URL').max(500).or(z.literal('')).optional(),
})

type BrandFormValues = z.infer<typeof brandSchema>

interface BrandFormProps {
  initialData?: ICarBrand
  onSuccess?: (brand: ICarBrand) => void
}

export const BrandForm = ({ initialData, onSuccess }: BrandFormProps) => {
  const isEditing = !!initialData
  const createMutation = useCreateBrand()
  const updateMutation = useUpdateBrand()
  const isPending = createMutation.isPending || updateMutation.isPending

  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      logo: initialData?.logo ?? '',
    },
  })

  const handleSubmit = (data: BrandFormValues) => {
    const payload = {
      name: data.name,
      logo: data.logo || undefined,
    }

    if (isEditing) {
      updateMutation.mutate(
        { id: initialData.id, ...payload },
        { onSuccess: (brand) => onSuccess?.(brand) },
      )
    } else {
      createMutation.mutate(payload, { onSuccess: (brand) => onSuccess?.(brand) })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={(e) => { e.stopPropagation(); form.handleSubmit(handleSubmit)(e) }} className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Название <span className='text-destructive'>*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='logo'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Логотип (URL)</FormLabel>
              <FormControl>
                <Input {...field} placeholder='https://...' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-end'>
          <Button type='submit' disabled={isPending}>
            {isPending ? 'Сохранение...' : isEditing ? 'Сохранить' : 'Создать'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
