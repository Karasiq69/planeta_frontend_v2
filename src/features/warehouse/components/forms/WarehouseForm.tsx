'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { warehouseFormSchema, type WarehouseFormData } from '@/features/warehouse/api/dto'
import { useCreateWarehouse, useUpdateWarehouse } from '@/features/warehouse/api/mutations'
import { warehouseTypeConfig } from '@/features/warehouse/types/config'
import { WarehouseTypeEnum } from '@/features/warehouse/types'

import type { Warehouse } from '@/features/warehouse/types'

interface WarehouseFormProps {
  warehouse?: Warehouse
  onSuccess?: () => void
}

const WarehouseForm = ({ warehouse, onSuccess }: WarehouseFormProps) => {
  const isEditing = !!warehouse
  const createMutation = useCreateWarehouse()
  const updateMutation = useUpdateWarehouse()
  const isPending = createMutation.isPending || updateMutation.isPending

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<WarehouseFormData>({
    resolver: zodResolver(warehouseFormSchema),
    defaultValues: warehouse
      ? {
          name: warehouse.name,
          description: warehouse.description ?? '',
          type: warehouse.type,
          isActive: warehouse.isActive,
        }
      : {
          name: '',
          description: '',
          type: WarehouseTypeEnum.MAIN,
          isActive: true,
        },
  })

  const onSubmit = (data: WarehouseFormData) => {
    if (isEditing) {
      updateMutation.mutate({ id: warehouse.id, data }, { onSuccess })
    } else {
      createMutation.mutate(data, { onSuccess })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div className='space-y-1.5'>
        <Label htmlFor='name'>
          Название <span className='text-destructive'>*</span>
        </Label>
        <Input id='name' {...register('name')} />
        {errors.name && <p className='text-sm text-destructive'>{errors.name.message}</p>}
      </div>

      <div className='space-y-1.5'>
        <Label htmlFor='description'>Описание</Label>
        <Input id='description' {...register('description')} />
      </div>

      <div className='space-y-1.5'>
        <Label>
          Тип склада <span className='text-destructive'>*</span>
        </Label>
        <Controller
          control={control}
          name='type'
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder='Выберите тип' />
              </SelectTrigger>
              <SelectContent>
                {Object.values(WarehouseTypeEnum).map((type) => (
                  <SelectItem key={type} value={type}>
                    {warehouseTypeConfig[type].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.type && <p className='text-sm text-destructive'>{errors.type.message}</p>}
      </div>

      <div className='flex items-center justify-between'>
        <Label htmlFor='isActive'>Активен</Label>
        <Controller
          control={control}
          name='isActive'
          render={({ field }) => (
            <Switch id='isActive' checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
      </div>

      <Button type='submit' disabled={isPending} className='w-full'>
        {isPending ? 'Сохранение...' : isEditing ? 'Сохранить' : 'Создать'}
      </Button>
    </form>
  )
}

export default WarehouseForm
