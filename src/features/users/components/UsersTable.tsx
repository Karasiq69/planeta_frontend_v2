'use client'

import { format, parseISO } from 'date-fns'
import { Pencil, UserCheck, UserX } from 'lucide-react'

import { AppButton } from '@/components/ds'
import { AppStatusBadge } from '@/components/ds'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ROLE_LABELS } from '@/types/user'

import type { StatusConfig } from '@/components/ds'
import type { User } from '@/types/user'

const USER_STATUS_MAP: Record<string, StatusConfig> = {
  active: { label: 'Активен', colorVariant: 'success' },
  inactive: { label: 'Деактивирован', colorVariant: 'neutral' },
}

interface UsersTableProps {
  users: User[]
  onEdit: (user: User) => void
  onToggleActive: (user: User) => void
}

export default function UsersTable({ users, onEdit, onToggleActive }: UsersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Имя</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Роль</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead>Дата создания</TableHead>
          <TableHead className='w-20' />
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className='font-medium'>{user.username}</TableCell>
            <TableCell className='text-muted-foreground'>{user.email}</TableCell>
            <TableCell>{ROLE_LABELS[user.role]}</TableCell>
            <TableCell>
              <AppStatusBadge
                status={user.isActive ? 'active' : 'inactive'}
                statusMap={USER_STATUS_MAP}
              />
            </TableCell>
            <TableCell>{format(parseISO(user.createdAt), 'dd.MM.yyyy')}</TableCell>
            <TableCell>
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
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
