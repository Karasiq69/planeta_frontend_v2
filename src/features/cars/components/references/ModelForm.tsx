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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCreateModel, useUpdateModel } from '@/features/cars/api/mutations'
import { useVehiclesBrands } from '@/features/cars/api/queries'

import type { ICarModel } from '@/features/cars/types'

const modelSchema = z.object({
  brandId: z.coerce.number().min(1, 'Выберите бренд'),
  name: z.string().min(1, 'Название обязательно').max(100, 'Максимум 100 символов'),
  series: z.string().max(50, 'Максимум 50 символов').optional(),
  code: z.string().max(50, 'Максимум 50 символов').optional(),
})

type ModelFormValues = z.infer<typeof modelSchema>

interface ModelFormProps {
  initialData?: ICarModel
  defaultBrandId?: number
  onSuccess?: (model: ICarModel) => void
}

export const ModelForm = ({ initialData, defaultBrandId, onSuccess }: ModelFormProps) => {
  const isEditing = !!initialData
  const createMutation = useCreateModel()
  const updateMutation = useUpdateModel()
  const isPending = createMutation.isPending || updateMutation.isPending
  const { data: brands = [] } = useVehiclesBrands()

  const form = useForm<ModelFormValues>({
    resolver: zodResolver(modelSchema),
    defaultValues: {
      brandId: initialData?.brandId ?? defaultBrandId ?? 0,
      name: initialData?.name ?? '',
      series: initialData?.series ?? '',
      code: initialData?.code ?? '',
    },
  })

  const handleSubmit = (data: ModelFormValues) => {
    const payload = {
      brandId: data.brandId,
      name: data.name,
      series: data.series || undefined,
      code: data.code || undefined,
    }

    if (isEditing) {
      updateMutation.mutate(
        { id: initialData.id, ...payload },
        { onSuccess: (model) => onSuccess?.(model) },
      )
    } else {
      createMutation.mutate(payload, { onSuccess: (model) => onSuccess?.(model) })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={(e) => { e.stopPropagation(); form.handleSubmit(handleSubmit)(e) }} className='space-y-4'>
        <FormField
          control={form.control}
          name='brandId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Бренд <span className='text-destructive'>*</span>
              </FormLabel>
              <Select
                value={field.value ? String(field.value) : ''}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Выберите бренд' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand.id} value={String(brand.id)}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

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
          name='series'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Серия</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='code'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Код</FormLabel>
              <FormControl>
                <Input {...field} />
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
