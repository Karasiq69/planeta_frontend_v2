'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateVatRate, useUpdateVatRate } from '@/features/vat-rates/api/mutations'

import { vatRateSchema, type VatRateFormValues } from './schema'

import type { VatRate } from '@/features/vat-rates/types'

interface VatRateFormProps {
  initialData?: VatRate
  onSuccess?: () => void
}

const VatRateForm = ({ initialData, onSuccess }: VatRateFormProps) => {
  const isEditing = !!initialData
  const createMutation = useCreateVatRate()
  const updateMutation = useUpdateVatRate()
  const isPending = createMutation.isPending || updateMutation.isPending

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VatRateFormValues>({
    resolver: zodResolver(vatRateSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          rate: parseFloat(initialData.rate),
          isDefault: initialData.isDefault,
        }
      : { name: '', rate: 0, isDefault: false },
  })

  const isDefault = watch('isDefault')

  const onSubmit = (data: VatRateFormValues) => {
    if (isEditing) {
      updateMutation.mutate({ id: initialData.id, data }, { onSuccess })
    } else {
      createMutation.mutate(data, { onSuccess })
    }
  }

  const isArchived = isEditing && !initialData.isActive
  const showDefaultWarning = isEditing && initialData.isDefault && !isDefault
  const showDefaultInfo = isDefault && (!isEditing || !initialData.isDefault)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div className='space-y-1.5'>
        <Label htmlFor='name'>
          Название <span className='text-destructive'>*</span>
        </Label>
        <Input id='name' {...register('name')} />
        {errors.name && <p className='text-xs text-red-500'>{errors.name.message}</p>}
      </div>

      <div className='space-y-1.5'>
        <Label htmlFor='rate'>
          Ставка (%) <span className='text-destructive'>*</span>
        </Label>
        <Input id='rate' type='number' step='0.01' {...register('rate')} />
        {errors.rate && <p className='text-xs text-red-500'>{errors.rate.message}</p>}
      </div>

      <div className='flex items-center gap-2'>
        <Checkbox
          id='isDefault'
          checked={isDefault}
          onCheckedChange={(checked) => setValue('isDefault', !!checked)}
          disabled={isArchived}
        />
        <Label htmlFor='isDefault' className='cursor-pointer'>
          Ставка по умолчанию
        </Label>
      </div>

      {isArchived && (
        <Alert>
          <AlertDescription>
            Ставка в архиве. Нельзя назначить по умолчанию.
          </AlertDescription>
        </Alert>
      )}

      {showDefaultWarning && (
        <Alert variant='destructive'>
          <AlertDescription>
            Нельзя снять флаг &laquo;по умолчанию&raquo; &mdash; назначьте другую ставку
          </AlertDescription>
        </Alert>
      )}

      {showDefaultInfo && (
        <Alert>
          <AlertDescription>Текущая ставка по умолчанию будет заменена</AlertDescription>
        </Alert>
      )}

      <Button
        type='submit'
        disabled={isPending || showDefaultWarning}
        className='w-full'
      >
        {isPending ? 'Сохранение...' : isEditing ? 'Сохранить' : 'Создать'}
      </Button>
    </form>
  )
}

export default VatRateForm
