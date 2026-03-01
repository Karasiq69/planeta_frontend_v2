'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

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
import { useCreateEmployee, useUpdateEmployee } from '@/features/employees/api/mutations'
import { useAllOrganizations } from '@/features/organizations/api/queries'
import { employeeFormSchema, POSITION_LABELS, type EmployeeFormValues } from './schema'

import type { Employee } from '@/features/employees/types'

interface EmployeeFormProps {
  employee?: Employee
  onSuccess?: () => void
}

const EmployeeForm = ({ employee, onSuccess }: EmployeeFormProps) => {
  const isEditing = !!employee
  const createMutation = useCreateEmployee()
  const updateMutation = useUpdateEmployee()
  const { data: orgsData } = useAllOrganizations()
  const isPending = createMutation.isPending || updateMutation.isPending

  const organizations = orgsData?.data ?? []

  const {
    register,
    handleSubmit,
    setValue,
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
        }
      : { lastName: '', firstName: '' },
  })

  const onSubmit = (data: EmployeeFormValues) => {
    if (isEditing) {
      updateMutation.mutate({ id: employee.id, data }, { onSuccess })
    } else {
      createMutation.mutate(data, { onSuccess })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div className='grid gap-4 sm:grid-cols-2'>
        <div className='space-y-1.5'>
          <Label htmlFor='lastName'>
            Фамилия <span className='text-destructive'>*</span>
          </Label>
          <Input id='lastName' {...register('lastName')} />
          {errors.lastName && (
            <p className='text-sm text-destructive'>{errors.lastName.message}</p>
          )}
        </div>

        <div className='space-y-1.5'>
          <Label htmlFor='firstName'>
            Имя <span className='text-destructive'>*</span>
          </Label>
          <Input id='firstName' {...register('firstName')} />
          {errors.firstName && (
            <p className='text-sm text-destructive'>{errors.firstName.message}</p>
          )}
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
          {errors.position && (
            <p className='text-sm text-destructive'>{errors.position.message}</p>
          )}
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
            <p className='text-sm text-destructive'>{errors.organizationId.message}</p>
          )}
        </div>

        <div className='space-y-1.5'>
          <Label htmlFor='phone'>Телефон</Label>
          <Input id='phone' {...register('phone')} />
        </div>

        <div className='space-y-1.5'>
          <Label htmlFor='hiredAt'>Дата приёма</Label>
          <Input id='hiredAt' type='date' {...register('hiredAt')} />
        </div>
      </div>

      <Button type='submit' disabled={isPending} className='w-full'>
        {isPending ? 'Сохранение...' : isEditing ? 'Сохранить' : 'Создать'}
      </Button>
    </form>
  )
}

export default EmployeeForm
