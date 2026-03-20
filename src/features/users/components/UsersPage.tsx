'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import PageLayout from '@/components/common/PageLayout'
import { AppButton, AppDialog, AppEmptyState, AppFilterBar, AppSelect } from '@/components/ds'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import { useUpdateUser } from '@/features/users/api/mutations'
import { useUsers } from '@/features/users/api/queries'
import { ROLE_LABELS } from '@/types/user'

import { UserForm } from './UserForm'
import UsersTable from './UsersTable'

import type { SelectOption } from '@/components/ds'
import type { UserListParams } from '@/features/users/types'
import type { User, UserRole } from '@/types/user'

const ALL = '__all__'

const roleOptions: SelectOption[] = [
  { label: 'Все роли', value: ALL },
  ...Object.entries(ROLE_LABELS).map(([value, label]) => ({ label, value })),
]

const statusOptions: SelectOption[] = [
  { label: 'Все', value: ALL },
  { label: 'Активные', value: 'active' },
  { label: 'Деактивированные', value: 'inactive' },
]

export default function UsersPage() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [roleFilter, setRoleFilter] = useState(ALL)
  const [statusFilter, setStatusFilter] = useState(ALL)
  const [createOpen, setCreateOpen] = useState(false)
  const [editUser, setEditUser] = useState<User | null>(null)

  const params: UserListParams = {
    page,
    pageSize: 20,
    searchTerm: search || undefined,
    ...(roleFilter !== ALL && { role: roleFilter as UserRole }),
    ...(statusFilter !== ALL && { isActive: statusFilter === 'active' }),
  }

  const { data, isLoading } = useUsers(params)
  const updateMutation = useUpdateUser()

  const users = data?.data ?? []
  const meta = data?.meta

  const handleToggleActive = (user: User) => {
    updateMutation.mutate({ id: user.id, data: { isActive: !user.isActive } })
  }

  const handleResetFilters = () => {
    setSearch('')
    setRoleFilter(ALL)
    setStatusFilter(ALL)
    setPage(1)
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  return (
    <PageLayout>
      <PageLayout.Header
        title='Пользователи'
        actions={
          <AppButton size='sm' icon={Plus} onClick={() => setCreateOpen(true)}>
            Добавить
          </AppButton>
        }
      />

      <PageLayout.Content>
        <AppFilterBar
          search={{ value: search, onChange: handleSearchChange, placeholder: 'Поиск...' }}
          filters={
            <>
              <AppSelect
                options={roleOptions}
                value={roleFilter}
                onChange={setRoleFilter}
                className='w-44'
              />
              <AppSelect
                options={statusOptions}
                value={statusFilter}
                onChange={setStatusFilter}
                className='w-44'
              />
            </>
          }
          onReset={handleResetFilters}
        />

        {isLoading ? (
          <LoaderSectionAnimated />
        ) : users.length > 0 ? (
          <>
            <UsersTable
              users={users}
              onEdit={setEditUser}
              onToggleActive={handleToggleActive}
            />

            {meta && meta.totalPages > 1 && (
              <div className='flex items-center justify-center gap-2 p-4'>
                <AppButton
                  variant='outline'
                  size='sm'
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Назад
                </AppButton>
                <span className='text-sm text-muted-foreground'>
                  {page} / {meta.totalPages}
                </span>
                <AppButton
                  variant='outline'
                  size='sm'
                  disabled={page >= meta.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Вперёд
                </AppButton>
              </div>
            )}
          </>
        ) : (
          <AppEmptyState title='Нет пользователей' />
        )}
      </PageLayout.Content>

      <AppDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        title='Новый пользователь'
      >
        <UserForm onSuccess={() => setCreateOpen(false)} />
      </AppDialog>

      <AppDialog
        open={!!editUser}
        onOpenChange={(open) => !open && setEditUser(null)}
        title='Редактирование пользователя'
      >
        {editUser && (
          <UserForm user={editUser} onSuccess={() => setEditUser(null)} />
        )}
      </AppDialog>
    </PageLayout>
  )
}
