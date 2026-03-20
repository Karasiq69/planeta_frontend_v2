'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format, parseISO } from 'date-fns'
import { Check, ChevronsUpDown, Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { AppButton, AppDialog } from '@/components/ds'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { DatePicker } from '@/components/ui/date-picker'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCreateEmployee, useUpdateEmployee } from '@/features/employees/api/mutations'
import { useAllOrganizations } from '@/features/organizations/api/queries'
import { useUnlinkedUsers } from '@/features/users/api/queries'
import { UserForm } from '@/features/users/components/UserForm'
import { cn } from '@/lib/utils'
import { ROLE_LABELS } from '@/types/user'

import { employeeFormSchema, POSITION_LABELS } from './schema'

import type { EmployeeFormValues } from './schema'
import type { Employee, UpdateEmployee } from '@/features/employees/types'

interface EmployeeFormProps {
  employee?: Employee
  onSuccess?: () => void
  onTransfer?: (employee: Employee) => void
}

const EmployeeForm = ({ employee, onSuccess, onTransfer }: EmployeeFormProps) => {
  const isEditing = !!employee
  const createMutation = useCreateEmployee()
  const updateMutation = useUpdateEmployee()
  const { data: orgsData } = useAllOrganizations()
  const { data: unlinkedUsers = [] } = useUnlinkedUsers()
  const isPending = createMutation.isPending || updateMutation.isPending

  const [comboboxOpen, setComboboxOpen] = useState(false)
  const [userDialogOpen, setUserDialogOpen] = useState(false)
  const [userSearch, setUserSearch] = useState('')

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
          userId: employee.userId ?? undefined,
        }
      : { lastName: '', firstName: '' },
  })

  const selectedUserId = watch('userId')

  const filteredUsers = unlinkedUsers.filter(
    (u) =>
      u.username.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  )

  const selectedUser = unlinkedUsers.find((u) => u.id === selectedUserId)
  const selectedUserDisplay = selectedUser
    ? `${selectedUser.username} (${selectedUser.email})`
    : ''

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
          <div className='flex items-center gap-2'>
            <Popover open={comboboxOpen} onOpenChange={setComboboxOpen} modal>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  role='combobox'
                  className={cn(
                    'flex-1 justify-between hover:bg-white',
                    !selectedUserId && 'text-muted-foreground'
                  )}
                >
                  {selectedUserId ? selectedUserDisplay : 'Выберите пользователя'}
                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='p-0'>
                <Command shouldFilter={false}>
                  <CommandInput
                    placeholder='Поиск пользователя...'
                    value={userSearch}
                    onValueChange={setUserSearch}
                  />
                  <CommandEmpty>Пользователь не найден.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      {filteredUsers.map((u) => (
                        <CommandItem
                          key={u.id}
                          value={String(u.id)}
                          onSelect={() => {
                            setValue('userId', u.id)
                            setComboboxOpen(false)
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              selectedUserId === u.id ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          <div>
                            <span>{u.username}</span>
                            <span className='ml-2 text-muted-foreground'>{u.email}</span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <Button
              type='button'
              variant='outline'
              size='icon'
              className='size-9 shrink-0'
              onClick={() => setUserDialogOpen(true)}
            >
              <Plus className='size-4' />
            </Button>
          </div>
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

      <AppDialog
        open={userDialogOpen}
        onOpenChange={setUserDialogOpen}
        title='Новый пользователь'
      >
        <UserForm
          onSuccess={(user) => {
            setValue('userId', user.id)
            setUserDialogOpen(false)
          }}
        />
      </AppDialog>
    </form>
  )
}

export default EmployeeForm
