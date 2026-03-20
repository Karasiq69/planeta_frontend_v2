'use client'

import { format, parseISO } from 'date-fns'
import { Pencil, UserCheck, UserX } from 'lucide-react'
import * as React from 'react'

import { DataTableColumnHeader } from '@/components/common/table/data-table-column-header'
import { AppButton, AppStatusBadge } from '@/components/ds'
import { ROLE_LABELS } from '@/types/user'

import type { StatusConfig } from '@/components/ds'
import type { User } from '@/types/user'
import type { ColumnDef } from '@tanstack/react-table'

const USER_STATUS_MAP: Record<string, StatusConfig> = {
  active: { label: 'Активен', colorVariant: 'success' },
  inactive: { label: 'Деактивирован', colorVariant: 'neutral' },
}

export const getUserColumns = (
  onEdit: (user: User) => void,
  onToggleActive: (user: User) => void,
): ColumnDef<User>[] => [
  {
    accessorKey: 'username',
    meta: 'Имя',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Имя' />,
    cell: ({ row }) => <span className='font-medium'>{row.original.username}</span>,
    enableSorting: false,
  },
  {
    accessorKey: 'email',
    meta: 'Email',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
    cell: ({ row }) => (
      <span className='text-muted-foreground'>{row.original.email}</span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'role',
    meta: 'Роль',
    size: 140,
    header: ({ column }) => <DataTableColumnHeader column={column} title='Роль' />,
    cell: ({ row }) => ROLE_LABELS[row.original.role] ?? row.original.role,
    enableSorting: false,
  },
  {
    id: 'status',
    meta: 'Статус',
    size: 140,
    header: ({ column }) => <DataTableColumnHeader column={column} title='Статус' />,
    cell: ({ row }) => (
      <AppStatusBadge
        status={row.original.isActive ? 'active' : 'inactive'}
        statusMap={USER_STATUS_MAP}
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'createdAt',
    meta: 'Дата создания',
    size: 130,
    header: ({ column }) => <DataTableColumnHeader column={column} title='Дата создания' />,
    cell: ({ row }) => format(parseISO(row.original.createdAt), 'dd.MM.yyyy'),
    enableSorting: false,
  },
  {
    id: 'actions',
    size: 80,
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className='flex gap-1'>
          <AppButton
            variant='ghost'
            size='icon'
            className='size-8'
            onClick={() => onEdit(user)}
          >
            <Pencil className='size-4' />
          </AppButton>
          <AppButton
            variant='ghost'
            size='icon'
            className='size-8'
            onClick={() => onToggleActive(user)}
          >
            {user.isActive ? (
              <UserX className='size-4' />
            ) : (
              <UserCheck className='size-4' />
            )}
          </AppButton>
        </div>
      )
    },
  },
]
