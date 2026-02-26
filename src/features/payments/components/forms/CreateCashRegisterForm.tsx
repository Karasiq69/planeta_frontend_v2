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
import { useCreateCashRegister } from '@/features/payments/api/mutations'

const schema = z.object({
  name: z.string().min(1, 'Введите название'),
  type: z.enum(['physical', 'online', 'api']),
})

type FormValues = z.infer<typeof schema>

interface CreateCashRegisterFormProps {
  onSuccess?: () => void
}

const CreateCashRegisterForm = ({ onSuccess }: CreateCashRegisterFormProps) => {
  const { mutate, isPending } = useCreateCashRegister()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', type: 'physical' },
  })

  const onSubmit = (data: FormValues) => {
    mutate(data, { onSuccess })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='name'>Название</Label>
        <Input id='name' placeholder='Основная касса' {...register('name')} />
        {errors.name && <p className='text-sm text-destructive'>{errors.name.message}</p>}
      </div>

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

      <Button type='submit' disabled={isPending} className='w-full'>
        {isPending ? 'Создание...' : 'Создать'}
      </Button>
    </form>
  )
}

export default CreateCashRegisterForm
