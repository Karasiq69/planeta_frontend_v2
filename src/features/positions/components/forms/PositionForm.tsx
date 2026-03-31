'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreatePosition, useUpdatePosition } from '@/features/positions/api/mutations'

import { positionFormSchema, type PositionFormValues } from './schema'

import type { Position } from '@/features/positions/types'

interface PositionFormProps {
  initialData?: Position
  onSuccess?: () => void
}

const PositionForm = ({ initialData, onSuccess }: PositionFormProps) => {
  const isEditing = !!initialData
  const createMutation = useCreatePosition()
  const updateMutation = useUpdatePosition()
  const isPending = createMutation.isPending || updateMutation.isPending

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PositionFormValues>({
    resolver: zodResolver(positionFormSchema),
    defaultValues: initialData ? { name: initialData.name } : { name: '' },
  })

  const onSubmit = (data: PositionFormValues) => {
    if (isEditing) {
      updateMutation.mutate({ id: initialData.id, data }, { onSuccess })
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
        {errors.name && <p className='text-xs text-red-500'>{errors.name.message}</p>}
      </div>

      <Button type='submit' disabled={isPending} className='w-full'>
        {isPending ? 'Сохранение...' : isEditing ? 'Сохранить' : 'Создать'}
      </Button>
    </form>
  )
}

export default PositionForm
