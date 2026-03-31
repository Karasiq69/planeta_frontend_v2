'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format, parseISO } from 'date-fns'
import { useForm } from 'react-hook-form'

import { ComboboxWithCreate } from '@/components/common/ComboboxWithCreate'
import { AppButton } from '@/components/ds'
import { Button } from '@/components/ui/button'
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
import { useAllPositions } from '@/features/positions/api/queries'
import { useUnlinkedUsers } from '@/features/users/api/queries'
import { UserForm } from '@/features/users/components/UserForm'
import { useOrganizationStore } from '@/stores/organization-store'
import { ROLE_LABELS } from '@/types/user'

import { employeeFormSchema } from './schema'

import type { EmployeeFormValues } from './schema'
import type { Employee, UpdateEmployee } from '@/features/employees/types'

interface EmployeeFormProps {
  employee?: Employee
  onSuccess?: () => void
  onTransfer?: (employee: Employee) => void
}

const EmployeeForm = ({ employee, onSuccess, onTransfer }: EmployeeFormProps) => {
  const isEditing = !!employee
  const currentOrg = useOrganizationStore((s) => s.organization)
  const createMutation = useCreateEmployee()
  const updateMutation = useUpdateEmployee()
  const { data: orgsData } = useAllOrganizations()
  const { data: unlinkedUsers = [] } = useUnlinkedUsers()
  const isPending = createMutation.isPending || updateMutation.isPending

  const { data: positionsData } = useAllPositions()
  const allPositions = positionsData?.data ?? []
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
          positionId: employee.positionId,
          organizationId: employee.organizationId,
          phone: employee.phone ?? '',
          hiredAt: employee.hiredAt ?? '',
          userId: employee.userId ?? undefined,
        }
      : { lastName: '', firstName: '', ...(currentOrg && { organizationId: currentOrg.id }) },
  })

  const selectedUserId = watch('userId')

  const onSubmit = (data: EmployeeFormValues) => {
    const { userId, ...rest } = data
    if (!rest.middleName) delete rest.middleName
    if (!rest.phone) delete rest.phone

    if (isEditing) {
      updateMutation.mutate(
        { id: employee.id, data: { ...rest, userId: userId ?? undefined } },
        { onSuccess }
      )
    } else {
      createMutation.mutate(
        { ...rest, userId: userId ?? undefined },
        { onSuccess }
      )
    }
  }

  const handleUnlinkUser = () => {
    if (!employee) return
    updateMutation.mutate(
      { id: employee.id, data: { userId: null } as UpdateEmployee },
      { onSuccess }
    )
  }

  const handleHiredAtChange = (date: Date | undefined) => {
    setValue('hiredAt', date ? format(date, 'yyyy-MM-dd') : undefined)
  }

  const hiredAt = watch('hiredAt')
  const hiredAtDate = hiredAt ? parseISO(hiredAt) : undefined

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
            defaultValue={employee?.positionId?.toString()}
            onValueChange={(v) => setValue('positionId', Number(v))}
          >
            <SelectTrigger>
              <SelectValue placeholder='Выберите должность' />
            </SelectTrigger>
            <SelectContent>
              {allPositions.map((pos) => (
                <SelectItem key={pos.id} value={pos.id.toString()}>
                  {pos.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.positionId && (
            <p className='text-xs text-red-500'>{errors.positionId.message}</p>
          )}
        </div>

        {!isEditing && (
          <div className='space-y-1.5'>
            <Label>
              Организация <span className='text-destructive'>*</span>
            </Label>
            <Select
              defaultValue={currentOrg?.id?.toString()}
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
        )}

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
      {isEditing && employee?.user ? (
        <div className='space-y-3 rounded-lg border p-4'>
          <p className='text-sm font-medium'>Привязанный аккаунт</p>
          <div className='flex items-center justify-between'>
            <div className='text-sm'>
              <p>{employee.user!.email}</p>
              <p className='text-muted-foreground'>{ROLE_LABELS[employee.user!.role]}</p>
            </div>
            <AppButton
              variant='outline'
              size='sm'
              onClick={handleUnlinkUser}
            >
              Отвязать
            </AppButton>
          </div>
        </div>
      ) : (
        <div className='space-y-3 rounded-lg border p-4'>
          <p className='text-sm font-medium'>Аккаунт для входа в систему</p>
          <ComboboxWithCreate
            items={unlinkedUsers}
            value={selectedUserId ?? null}
            onChange={(id) => setValue('userId', id ?? undefined)}
            getLabel={(u) => `${u.username} (${u.email})`}
            placeholder='Выберите пользователя'
            searchPlaceholder='Поиск пользователя...'
            emptyText='Пользователь не найден.'
            dialogTitle='Новый пользователь'
            renderForm={({ onSuccess }) => (
              <UserForm onSuccess={(user) => onSuccess(user)} />
            )}
          />
          {selectedUserId && (
            <Button
              type='button'
              variant='ghost'
              size='sm'
              className='text-muted-foreground'
              onClick={() => setValue('userId', undefined)}
            >
              Очистить выбор
            </Button>
          )}
        </div>
      )}

      <Button type='submit' disabled={isPending} className='w-full'>
        {isPending ? 'Сохранение...' : isEditing ? 'Сохранить' : 'Создать'}
      </Button>

      {isEditing && employee.isActive && onTransfer && (
        <Button
          type='button'
          variant='outline'
          className='w-full'
          onClick={() => onTransfer(employee)}
        >
          Перевести в другую организацию
        </Button>
      )}
    </form>
  )
}

export default EmployeeForm
