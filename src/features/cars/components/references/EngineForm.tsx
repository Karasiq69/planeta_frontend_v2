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
import { useCreateEngine, useUpdateEngine } from '@/features/cars/api/mutations'
import { useVehiclesBrands } from '@/features/cars/api/queries'
import { ENGINE_TYPE_LABELS } from '@/features/cars/utils'

import type { EngineType, IEngine } from '@/features/cars/types'

const engineSchema = z.object({
  brandId: z.coerce.number().min(1, 'Выберите бренд'),
  name: z.string().min(1, 'Название обязательно').max(100, 'Максимум 100 символов'),
  engineType: z.enum(['diesel', 'gasoline', 'electric', 'hybrid'], {
    required_error: 'Выберите тип двигателя',
  }),
  series: z.string().max(50, 'Максимум 50 символов').optional(),
  displacement: z.coerce.number().positive('Должно быть положительным').optional().or(z.literal('')),
  power: z.coerce.number().positive('Должно быть положительным').optional().or(z.literal('')),
})

type EngineFormValues = z.infer<typeof engineSchema>

interface EngineFormProps {
  initialData?: IEngine
  defaultBrandId?: number
  onSuccess?: (engine: IEngine) => void
}

export const EngineForm = ({ initialData, defaultBrandId, onSuccess }: EngineFormProps) => {
  const isEditing = !!initialData
  const createMutation = useCreateEngine()
  const updateMutation = useUpdateEngine()
  const isPending = createMutation.isPending || updateMutation.isPending
  const { data: brands = [] } = useVehiclesBrands()

  const form = useForm<EngineFormValues>({
    resolver: zodResolver(engineSchema),
    defaultValues: {
      brandId: initialData?.brandId ?? defaultBrandId ?? 0,
      name: initialData?.name ?? '',
      engineType: initialData?.engineType ?? undefined,
      series: initialData?.series ?? '',
      displacement: initialData?.displacement ?? '',
      power: initialData?.power ?? '',
    },
  })

  const handleSubmit = (data: EngineFormValues) => {
    const payload = {
      brandId: data.brandId,
      name: data.name,
      engineType: data.engineType as EngineType,
      series: data.series || undefined,
      displacement: data.displacement ? Number(data.displacement) : undefined,
      power: data.power ? Number(data.power) : undefined,
    }

    if (isEditing) {
      updateMutation.mutate(
        { id: initialData.id, ...payload },
        { onSuccess: (engine) => onSuccess?.(engine) },
      )
    } else {
      createMutation.mutate(payload, { onSuccess: (engine) => onSuccess?.(engine) })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
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
          name='engineType'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Тип двигателя <span className='text-destructive'>*</span>
              </FormLabel>
              <Select value={field.value ?? ''} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Выберите тип' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {(Object.entries(ENGINE_TYPE_LABELS) as [EngineType, string][]).map(
                    ([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
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

        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='displacement'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Объём (л)</FormLabel>
                <FormControl>
                  <Input type='number' step='0.1' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='power'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Мощность (л.с.)</FormLabel>
                <FormControl>
                  <Input type='number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex justify-end'>
          <Button type='submit' disabled={isPending}>
            {isPending ? 'Сохранение...' : isEditing ? 'Сохранить' : 'Создать'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
