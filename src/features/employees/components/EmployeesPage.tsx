'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import PageLayout from '@/components/common/PageLayout'
import { AppButton, AppConfirmDialog, AppDialog } from '@/components/ds'
import { useUpdateEmployee } from '@/features/employees/api/mutations'
import EmployeesDataTable from './table/EmployeesDataTable'
import EmployeeForm from './forms/EmployeeForm'

import type { Employee } from '@/features/employees/types'

const fullName = (e: Employee) =>
  [e.lastName, e.firstName, e.middleName].filter(Boolean).join(' ')

const EmployeesPage = () => {
  const updateMutation = useUpdateEmployee()

  const [createOpen, setCreateOpen] = useState(false)
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null)
  const [fireEmployee, setFireEmployee] = useState<Employee | null>(null)

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
        <EmployeesDataTable
          onEdit={setEditEmployee}
          onFire={setFireEmployee}
        />
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
