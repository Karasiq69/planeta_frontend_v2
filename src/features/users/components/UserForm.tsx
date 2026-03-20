'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, RefreshCw } from 'lucide-react'
import { z } from 'zod'

import { AppButton, AppInput, AppSelect } from '@/components/ds'
import { Label } from '@/components/ui/label'
import { useCreateUser, useUpdateUser } from '@/features/users/api/mutations'
import { ROLE_LABELS } from '@/types/user'

import type { SelectOption } from '@/components/ds'
import type { CreateUser, UpdateUser } from '@/features/users/types'
import type { User, UserRole } from '@/types/user'

const userFormSchema = z.object({
  username: z.string().min(1, 'Имя обязательно'),
  email: z.string().min(1, 'Email обязателен').email('Некорректный email'),
  password: z.string().optional().refine((v) => !v || v.length >= 8, 'Минимум 8 символов'),
  role: z.enum(['admin', 'manager', 'mechanic', 'warehouse_worker'], {
    required_error: 'Выберите роль',
  }),
})

type UserFormValues = z.infer<typeof userFormSchema>

function generatePassword(length = 12): string {
  const chars = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map((b) => chars[b % chars.length])
    .join('')
}

const roleOptions: SelectOption[] = Object.entries(ROLE_LABELS).map(([value, label]) => ({
  value,
  label,
}))

type UserFormProps = {
  user?: User
  onSuccess?: (user: User) => void
}

export function UserForm({ user, onSuccess }: UserFormProps) {
  const isEditing = !!user
  const [showPassword, setShowPassword] = useState(false)

  const createMutation = useCreateUser()
  const updateMutation = useUpdateUser()
  const isPending = createMutation.isPending || updateMutation.isPending

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: user?.username ?? '',
      email: user?.email ?? '',
      password: '',
      role: user?.role,
    },
  })

  const roleValue = watch('role')

  const onSubmit = (data: UserFormValues) => {
    if (!isEditing && !data.password) {
      return
    }

    if (isEditing) {
      const payload: UpdateUser = { ...data }
      if (!payload.password) delete payload.password
      updateMutation.mutate({ id: user.id, data: payload }, { onSuccess: (u) => onSuccess?.(u) })
    } else {
      createMutation.mutate(data as CreateUser, { onSuccess: (u) => onSuccess?.(u) })
    }
  }

  const handleGenerate = () => {
    const pwd = generatePassword()
    setValue('password', pwd, { shouldValidate: true })
    setShowPassword(true)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div className='space-y-1.5'>
        <Label htmlFor='username'>
          Имя пользователя <span className='text-destructive'>*</span>
        </Label>
        <AppInput id='username' placeholder='Введите имя' {...register('username')} />
        {errors.username && <p className='text-xs text-red-500'>{errors.username.message}</p>}
      </div>

      <div className='space-y-1.5'>
        <Label htmlFor='email'>
          Email <span className='text-destructive'>*</span>
        </Label>
        <AppInput id='email' type='email' placeholder='user@example.com' {...register('email')} />
        {errors.email && <p className='text-xs text-red-500'>{errors.email.message}</p>}
      </div>

      <div className='space-y-1.5'>
        <Label htmlFor='password'>
          Пароль {!isEditing && <span className='text-destructive'>*</span>}
        </Label>
        <div className='flex gap-1.5'>
          <AppInput
            id='password'
            type={showPassword ? 'text' : 'password'}
            placeholder={isEditing ? 'Оставьте пустым, чтобы не менять' : 'Введите пароль'}
            {...register('password')}
          />
          <AppButton
            type='button'
            variant='ghost'
            size='icon'
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
          </AppButton>
          <AppButton type='button' variant='outline' size='icon' onClick={handleGenerate}>
            <RefreshCw className='h-4 w-4' />
          </AppButton>
        </div>
        {errors.password && <p className='text-xs text-red-500'>{errors.password.message}</p>}
      </div>

      <div className='space-y-1.5'>
        <Label>
          Роль <span className='text-destructive'>*</span>
        </Label>
        <AppSelect
          options={roleOptions}
          value={roleValue}
          onChange={(v) => setValue('role', v as UserRole, { shouldValidate: true })}
          placeholder='Выберите роль'
        />
        {errors.role && <p className='text-xs text-red-500'>{errors.role.message}</p>}
      </div>

      <AppButton loading={isPending} type='submit' className='w-full'>
        {isEditing ? 'Сохранить' : 'Создать'}
      </AppButton>
    </form>
  )
}
