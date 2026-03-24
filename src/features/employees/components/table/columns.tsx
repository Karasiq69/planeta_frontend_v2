'use client'

import { ArrowRightLeft, Pencil, Send, UserX } from 'lucide-react'

import { DataTableColumnHeader } from '@/components/common/table/data-table-column-header'
import { AppButton, AppStatusBadge } from '@/components/ds'
import { POSITION_LABELS } from '@/features/employees/components/forms/schema'

import type { StatusConfig } from '@/components/ds'
import type { Employee } from '@/features/employees/types'
import type { ColumnDef } from '@tanstack/react-table'

const EMPLOYEE_STATUS_MAP: Record<string, StatusConfig> = {
  not_invited: { label: 'Не приглашён', colorVariant: 'neutral' },
  invited: { label: 'Приглашён', colorVariant: 'info' },
  active: { label: 'Активен', colorVariant: 'success' },
  expired: { label: 'Ссылка истекла', colorVariant: 'warning' },
  fired: { label: 'Уволен', colorVariant: 'neutral' },
}

const getInviteStatus = (emp: Employee): string => {
  if (!emp.isActive) return 'fired'
  return emp.inviteStatus ?? (emp.userId ? 'active' : 'not_invited')
}

const fullName = (e: Employee) =>
  [e.lastName, e.firstName, e.middleName].filter(Boolean).join(' ')

export const getEmployeeColumns = (
  onEdit: (employee: Employee) => void,
  onFire: (employee: Employee) => void,
  onTransfer: (employee: Employee) => void,
  onInvite: (employee: Employee) => void,
): ColumnDef<Employee>[] => [
  {
    id: 'fullName',
    meta: 'ФИО',
    header: ({ column }) => <DataTableColumnHeader column={column} title='ФИО' />,
    cell: ({ row }) => <span className='font-medium'>{fullName(row.original)}</span>,
    enableSorting: false,
  },
  {
    accessorKey: 'position',
    meta: 'Должность',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Должность' />,
    cell: ({ row }) => POSITION_LABELS[row.original.position] ?? row.original.position,
    enableSorting: false,
  },
  {
    id: 'organization',
    meta: 'Организация',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Организация' />,
    cell: ({ row }) => (
      <span className='text-muted-foreground'>{row.original.organization?.name ?? '—'}</span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'phone',
    meta: 'Телефон',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Телефон' />,
    cell: ({ row }) => (
      <span className='text-muted-foreground'>{row.original.phone || '—'}</span>
    ),
    enableSorting: false,
  },
  {
    id: 'account',
    meta: 'Аккаунт',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Аккаунт' />,
    cell: ({ row }) => (
      <span className='text-muted-foreground'>{row.original.user?.email ?? '—'}</span>
    ),
    enableSorting: false,
  },
  {
    id: 'status',
    meta: 'Статус',
    size: 140,
    header: ({ column }) => <DataTableColumnHeader column={column} title='Статус' />,
    cell: ({ row }) => (
      <AppStatusBadge
        status={getInviteStatus(row.original)}
        statusMap={EMPLOYEE_STATUS_MAP}
      />
    ),
    enableSorting: false,
  },
  {
    id: 'actions',
    size: 110,
    cell: ({ row }) => {
      const emp = row.original
      const status = getInviteStatus(emp)
      const showInvite = status === 'not_invited' || status === 'expired' || status === 'invited'
      return (
        <div className='flex gap-1'>
          {showInvite && (
            <AppButton
              variant='ghost'
              size='icon'
              className='size-8'
              onClick={() => onInvite(emp)}
              title={status === 'invited' ? 'Скопировать ссылку' : 'Пригласить'}
            >
              <Send className='size-4' />
            </AppButton>
          )}
          <AppButton variant='ghost' size='icon' className='size-8' onClick={() => onEdit(emp)}>
            <Pencil className='size-4' />
          </AppButton>
          <AppButton
            variant='ghost'
            size='icon'
            className='size-8'
            onClick={() => onTransfer(emp)}
            disabled={!emp.isActive}
          >
            <ArrowRightLeft className='size-4' />
          </AppButton>
          <AppButton
            variant='ghost'
            size='icon'
            className='size-8 text-destructive hover:text-destructive'
            onClick={() => onFire(emp)}
            disabled={!emp.isActive}
          >
            <UserX className='size-4' />
          </AppButton>
        </div>
      )
    },
  },
]
