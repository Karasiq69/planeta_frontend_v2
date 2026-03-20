'use client'

import { Pencil, Plus, UserX } from 'lucide-react'
import { useState } from 'react'

import PageLayout from '@/components/common/PageLayout'
import {
  AppButton,
  AppConfirmDialog,
  AppDialog,
  AppFilterBar,
  AppStatusBadge,
  type StatusConfig,
} from '@/components/ds'
import { AppEmptyState } from '@/components/ds/composite/AppEmptyState'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useUpdateEmployee } from '@/features/employees/api/mutations'
import { useEmployees } from '@/features/employees/api/queries'
import { POSITION_LABELS } from './forms/schema'
import EmployeeForm from './forms/EmployeeForm'

import type { Employee } from '@/features/employees/types'

const EMPLOYEE_STATUS_MAP: Record<string, StatusConfig> = {
  active: { label: 'Активен', colorVariant: 'success' },
  fired: { label: 'Уволен', colorVariant: 'neutral' },
}

const EmployeesPage = () => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const { data, isLoading } = useEmployees({ page, pageSize: 20, searchTerm: search || undefined })
  const updateMutation = useUpdateEmployee()

  const [createOpen, setCreateOpen] = useState(false)
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null)
  const [fireEmployee, setFireEmployee] = useState<Employee | null>(null)

  const employees = data?.data ?? []
  const meta = data?.meta

  const fullName = (e: Employee) =>
    [e.lastName, e.firstName, e.middleName].filter(Boolean).join(' ')

  const handleFire = () => {
    if (!fireEmployee) return
    updateMutation.mutate(
      { id: fireEmployee.id, data: { isActive: false, firedAt: new Date().toISOString() } },
      { onSuccess: () => setFireEmployee(null) },
    )
  }

  return (
    <PageLayout>
      <PageLayout.Header
        title='Сотрудники'
        showBackButton
        actions={
          <AppButton size='sm' icon={Plus} onClick={() => setCreateOpen(true)}>
            Добавить сотрудника
          </AppButton>
        }
      />
      <PageLayout.Content>
        <AppFilterBar
          search={{
            value: search,
            onChange: (v) => {
              setSearch(v)
              setPage(1)
            },
            placeholder: 'Поиск по имени...',
          }}
        />

        {isLoading ? (
          <LoaderSectionAnimated className='rounded p-10' />
        ) : employees.length > 0 ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ФИО</TableHead>
                  <TableHead>Должность</TableHead>
                  <TableHead>Организация</TableHead>
                  <TableHead>Телефон</TableHead>
                  <TableHead>Аккаунт</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className='w-20' />
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((emp) => (
                  <TableRow key={emp.id}>
                    <TableCell className='font-medium'>{fullName(emp)}</TableCell>
                    <TableCell>{POSITION_LABELS[emp.position] ?? emp.position}</TableCell>
                    <TableCell className='text-muted-foreground'>
                      {emp.organization?.name ?? '—'}
                    </TableCell>
                    <TableCell className='text-muted-foreground'>{emp.phone || '—'}</TableCell>
                    <TableCell className='text-muted-foreground'>
                      {emp.user?.email ?? '—'}
                    </TableCell>
                    <TableCell>
                      <AppStatusBadge
                        status={emp.isActive ? 'active' : 'fired'}
                        statusMap={EMPLOYEE_STATUS_MAP}
                      />
                    </TableCell>
                    <TableCell>
                      <div className='flex gap-1'>
                        <AppButton
                          variant='ghost'
                          size='icon'
                          className='size-8'
                          onClick={() => setEditEmployee(emp)}
                        >
                          <Pencil className='size-4' />
                        </AppButton>
                        <AppButton
                          variant='ghost'
                          size='icon'
                          className='size-8 text-destructive hover:text-destructive'
                          onClick={() => setFireEmployee(emp)}
                          disabled={!emp.isActive}
                        >
                          <UserX className='size-4' />
                        </AppButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {meta && meta.totalPages > 1 && (
              <div className='flex items-center justify-center gap-2 py-4'>
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
          <AppEmptyState title='Нет сотрудников' />
        )}
      </PageLayout.Content>

      <AppDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        title='Новый сотрудник'
      >
        <EmployeeForm onSuccess={() => setCreateOpen(false)} />
      </AppDialog>

      <AppDialog
        open={!!editEmployee}
        onOpenChange={(open) => !open && setEditEmployee(null)}
        title='Редактирование сотрудника'
      >
        {editEmployee && (
          <EmployeeForm
            employee={editEmployee}
            onSuccess={() => setEditEmployee(null)}
          />
        )}
      </AppDialog>

      <AppConfirmDialog
        open={!!fireEmployee}
        onOpenChange={(open) => !open && setFireEmployee(null)}
        title='Уволить сотрудника?'
        description={`Сотрудник «${fireEmployee ? fullName(fireEmployee) : ''}» будет отмечен как уволенный.`}
        onConfirm={handleFire}
        confirmText='Уволить'
        variant='danger'
        loading={updateMutation.isPending}
      />
    </PageLayout>
  )
}

export default EmployeesPage
