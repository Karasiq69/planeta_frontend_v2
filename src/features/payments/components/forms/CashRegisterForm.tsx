'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
import { useCreateOrgCashRegister, useUpdateOrgCashRegister } from '@/features/payments/api/mutations'

import type { CashRegister } from '@/features/payments/types'

const schema = z.object({
  name: z.string().min(1, 'Введите название').max(100, 'Максимум 100 символов'),
  type: z.enum(['physical', 'online', 'api']),
  isActive: z.boolean(),
})

type FormValues = z.infer<typeof schema>

interface CashRegisterFormProps {
  orgId: number
  cashRegister?: CashRegister
  onSuccess?: () => void
}

const CashRegisterForm = ({ orgId, cashRegister, onSuccess }: CashRegisterFormProps) => {
  const isEdit = !!cashRegister
  const { mutate: create, isPending: isCreating } = useCreateOrgCashRegister(orgId)
  const { mutate: update, isPending: isUpdating } = useUpdateOrgCashRegister(orgId, cashRegister?.id ?? 0)
  const isPending = isCreating || isUpdating

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: cashRegister?.name ?? '',
      type: cashRegister?.type ?? 'physical',
      isActive: cashRegister?.isActive ?? true,
    },
  })

  const onSubmit = (data: FormValues) => {
    if (isEdit) {
      update({ name: data.name, isActive: data.isActive }, { onSuccess })
    } else {
      create({ name: data.name, type: data.type }, { onSuccess })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='name'>Название</Label>
        <Input id='name' placeholder='Основная касса' {...register('name')} />
        {errors.name && <p className='text-sm text-destructive'>{errors.name.message}</p>}
      </div>

      {!isEdit && (
        <div className='space-y-2'>
          <Label>Тип</Label>
          <Select defaultValue='physical' onValueChange={(v) => setValue('type', v as FormValues['type'])}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='physical'>Физическая</SelectItem>
              <SelectItem value='online'>Онлайн</SelectItem>
              <SelectItem value='api'>API</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {isEdit && (
        <div className='flex items-center justify-between rounded-lg border p-4'>
          <Label htmlFor='isActive'>Активна</Label>
          <Switch
            id='isActive'
            checked={watch('isActive')}
            onCheckedChange={(v) => setValue('isActive', v)}
          />
        </div>
      )}

      <Button type='submit' disabled={isPending} className='w-full'>
        {isPending ? 'Сохранение...' : isEdit ? 'Сохранить' : 'Создать'}
      </Button>
    </form>
  )
}

export default CashRegisterForm
