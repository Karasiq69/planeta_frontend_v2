'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format, parseISO } from 'date-fns'
import { Eye, EyeOff, RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DatePicker } from '@/components/ui/date-picker'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCreateEmployee, useUpdateEmployee } from '@/features/employees/api/mutations'
import { useAllOrganizations } from '@/features/organizations/api/queries'

import { employeeFormSchema, POSITION_LABELS, ROLE_LABELS, type EmployeeFormValues } from './schema'

import type { Employee } from '@/features/employees/types'

interface EmployeeFormProps {
  employee?: Employee
  onSuccess?: () => void
}

function generatePassword(length = 12): string {
  const chars = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map((b) => chars[b % chars.length])
    .join('')
}

const EmployeeForm = ({ employee, onSuccess }: EmployeeFormProps) => {
  const isEditing = !!employee
  const hasAccount = !!employee?.user
  const createMutation = useCreateEmployee()
  const updateMutation = useUpdateEmployee()
  const { data: orgsData } = useAllOrganizations()
  const isPending = createMutation.isPending || updateMutation.isPending

  const [showPassword, setShowPassword] = useState(false)

  const organizations = orgsData?.data ?? []

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: employee
      ? {
          lastName: employee.lastName,
          firstName: employee.firstName,
          middleName: employee.middleName ?? '',
          position: employee.position,
          organizationId: employee.organizationId,
          phone: employee.phone ?? '',
          hiredAt: employee.hiredAt ?? '',
          createAccount: false,
          account: hasAccount
            ? { email: employee.user!.email, role: employee.user!.role, password: '' }
            : undefined,
        }
      : { lastName: '', firstName: '', createAccount: false },
  })

  const createAccount = watch('createAccount')
  const position = watch('position')

  const onSubmit = (data: EmployeeFormValues) => {
    const { createAccount: _createAccount, ...payload } = data

    const sendAccount = _createAccount || hasAccount
    if (!sendAccount) {
      delete payload.account
    } else if (payload.account) {
      if (!payload.account.password) delete payload.account.password
      if (!payload.account.role) delete payload.account.role
    }

    if (isEditing) {
      updateMutation.mutate({ id: employee.id, data: payload }, { onSuccess })
    } else {
      createMutation.mutate(payload, { onSuccess })
    }
  }

  const handleGeneratePassword = () => {
    const pwd = generatePassword()
    setValue('account.password', pwd)
  }

  const handleCreateAccountChange = (checked: boolean) => {
    setValue('createAccount', checked)
    if (checked) {
      setValue('account', { email: '', password: '', role: position || undefined })
    } else {
      setValue('account', undefined)
    }
  }

  const handleHiredAtChange = (date: Date | undefined) => {
    setValue('hiredAt', date ? format(date, 'yyyy-MM-dd') : undefined)
  }

  const hiredAt = watch('hiredAt')
  const hiredAtDate = hiredAt ? parseISO(hiredAt) : undefined

  const accountSectionTitle = hasAccount
    ? 'Аккаунт для входа в систему'
    : 'Создать аккаунт для входа в систему'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div className='grid gap-4 sm:grid-cols-2'>
        <div className='space-y-1.5'>
          <Label htmlFor='lastName'>
            Фамилия <span className='text-destructive'>*</span>
          </Label>
          <Input id='lastName' {...register('lastName')} />
          {errors.lastName && <p className='text-xs text-red-500'>{errors.lastName.message}</p>}
        </div>

        <div className='space-y-1.5'>
          <Label htmlFor='firstName'>
            Имя <span className='text-destructive'>*</span>
          </Label>
          <Input id='firstName' {...register('firstName')} />
          {errors.firstName && <p className='text-xs text-red-500'>{errors.firstName.message}</p>}
        </div>

        <div className='space-y-1.5'>
          <Label htmlFor='middleName'>Отчество</Label>
          <Input id='middleName' {...register('middleName')} />
        </div>

        <div className='space-y-1.5'>
          <Label>
            Должность <span className='text-destructive'>*</span>
          </Label>
          <Select
            defaultValue={employee?.position}
            onValueChange={(v) => setValue('position', v as EmployeeFormValues['position'])}
          >
            <SelectTrigger>
              <SelectValue placeholder='Выберите должность' />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(POSITION_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.position && <p className='text-xs text-red-500'>{errors.position.message}</p>}
        </div>

        <div className='space-y-1.5'>
          <Label>
            Организация <span className='text-destructive'>*</span>
          </Label>
          <Select
            defaultValue={employee?.organizationId?.toString()}
            onValueChange={(v) => setValue('organizationId', Number(v))}
          >
            <SelectTrigger>
              <SelectValue placeholder='Выберите организацию' />
            </SelectTrigger>
            <SelectContent>
              {organizations.map((org) => (
                <SelectItem key={org.id} value={org.id.toString()}>
                  {org.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.organizationId && (
            <p className='text-xs text-red-500'>{errors.organizationId.message}</p>
          )}
        </div>

        <div className='space-y-1.5'>
          <Label htmlFor='phone'>Телефон</Label>
          <Input id='phone' {...register('phone')} />
        </div>

        <div className='space-y-1.5'>
          <Label>Дата приёма</Label>
          <DatePicker
            value={hiredAtDate}
            onChange={handleHiredAtChange}
            placeholder='Выберите дату'
            className='w-full'
          />
        </div>
      </div>

      {/* Секция аккаунта */}
      <div className='space-y-4 rounded-lg border p-4'>
        {hasAccount ? (
          <p className='text-sm font-medium'>{accountSectionTitle}</p>
        ) : (
          <div className='flex items-center gap-2'>
            <Checkbox
              id='createAccount'
              checked={createAccount}
              onCheckedChange={handleCreateAccountChange}
            />
            <Label htmlFor='createAccount' className='cursor-pointer font-medium'>
              {accountSectionTitle}
            </Label>
          </div>
        )}

        {(createAccount || hasAccount) && (
          <div className='grid gap-4 sm:grid-cols-2'>
            <div className='space-y-1.5'>
              <Label htmlFor='account.email'>
                Email <span className='text-destructive'>*</span>
              </Label>
              <Input id='account.email' type='email' {...register('account.email')} />
              {errors.account?.email && (
                <p className='text-xs text-red-500'>{errors.account.email.message}</p>
              )}
            </div>

            <div className='space-y-1.5'>
              <Label htmlFor='account.password'>
                {hasAccount ? 'Новый пароль' : 'Пароль'}{' '}
                {!hasAccount && <span className='text-destructive'>*</span>}
              </Label>
              <div className='flex gap-1.5'>
                <div className='relative flex-1'>
                  <Input
                    id='account.password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder=""
                    {...register('account.password')}
                  />
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    className='absolute right-0 top-0 size-9'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className='size-4' /> : <Eye className='size-4' />}
                  </Button>
                </div>
                <Button
                  type='button'
                  variant='outline'
                  size='icon'
                  className='size-9 shrink-0'
                  onClick={handleGeneratePassword}
                  title='Сгенерировать пароль'
                >
                  <RefreshCw className='size-4' />
                </Button>
              </div>
              {errors.account?.password && (
                <p className='text-xs text-red-500'>{errors.account.password.message}</p>
              )}
            </div>

            <div className='space-y-1.5'>
              <Label>Роль в системе</Label>
              <Select
                defaultValue={hasAccount ? employee.user!.role : position}
                onValueChange={(v) => setValue('account.role', v as EmployeeFormValues['position'])}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Совпадает с должностью' />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(ROLE_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      <Button type='submit' disabled={isPending} className='w-full'>
        {isPending ? 'Сохранение...' : isEditing ? 'Сохранить' : 'Создать'}
      </Button>
    </form>
  )
}

export default EmployeeForm
