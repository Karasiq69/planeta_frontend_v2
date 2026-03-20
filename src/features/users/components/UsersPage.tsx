'use client'

import { Plus } from 'lucide-react'
import { Suspense, useCallback, useState } from 'react'

import PageLayout from '@/components/common/PageLayout'
import { AppButton, AppDialog } from '@/components/ds'
import { useUpdateUser } from '@/features/users/api/mutations'
import { UserForm } from './UserForm'
import UsersDataTable from './table/UsersDataTable'

import type { User } from '@/types/user'

export default function UsersPage() {
  const [createOpen, setCreateOpen] = useState(false)
  const [editUser, setEditUser] = useState<User | null>(null)
  const updateMutation = useUpdateUser()

  const handleEdit = useCallback((user: User) => {
    setEditUser(user)
  }, [])

  const handleToggleActive = useCallback(
    (user: User) => {
      updateMutation.mutate({ id: user.id, data: { isActive: !user.isActive } })
    },
    [updateMutation],
  )

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
        <Suspense>
          <UsersDataTable onEdit={handleEdit} onToggleActive={handleToggleActive} />
        </Suspense>
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
