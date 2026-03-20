'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import PageLayout from '@/components/common/PageLayout'
import { AppButton, AppConfirmDialog, AppDialog } from '@/components/ds'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTransferEmployee, useUpdateEmployee } from '@/features/employees/api/mutations'
import { useAllOrganizations } from '@/features/organizations/api/queries'
import EmployeesDataTable from './table/EmployeesDataTable'
import EmployeeForm from './forms/EmployeeForm'

import type { Employee } from '@/features/employees/types'

const fullName = (e: Employee) =>
  [e.lastName, e.firstName, e.middleName].filter(Boolean).join(' ')

const EmployeesPage = () => {
  const updateMutation = useUpdateEmployee()
  const transferMutation = useTransferEmployee()
  const { data: orgsData } = useAllOrganizations()

  const [createOpen, setCreateOpen] = useState(false)
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null)
  const [fireEmployee, setFireEmployee] = useState<Employee | null>(null)
  const [transferEmployee, setTransferEmployee] = useState<Employee | null>(null)
  const [transferOrgId, setTransferOrgId] = useState<number | null>(null)

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
          onTransfer={setTransferEmployee}
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
            onTransfer={(emp) => {
              setEditEmployee(null)
              setTransferEmployee(emp)
            }}
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

      <AppDialog
        open={!!transferEmployee}
        onOpenChange={(open) => {
          if (!open) {
            setTransferEmployee(null)
            setTransferOrgId(null)
          }
        }}
        title='Перевод сотрудника'
      >
        {transferEmployee && (
          <div className='space-y-4'>
            <p className='text-sm text-muted-foreground'>
              Перевод сотрудника «{fullName(transferEmployee)}» в другую организацию
            </p>
            <Select onValueChange={(v) => setTransferOrgId(Number(v))}>
              <SelectTrigger>
                <SelectValue placeholder='Выберите организацию' />
              </SelectTrigger>
              <SelectContent>
                {(orgsData?.data ?? [])
                  .filter((org) => org.id !== transferEmployee.organizationId && org.isActive !== false)
                  .map((org) => (
                    <SelectItem key={org.id} value={org.id.toString()}>
                      {org.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Button
              className='w-full'
              disabled={!transferOrgId || transferMutation.isPending}
              onClick={() => {
                if (!transferOrgId) return
                transferMutation.mutate(
                  { id: transferEmployee.id, targetOrganizationId: transferOrgId },
                  {
                    onSuccess: () => {
                      setTransferEmployee(null)
                      setTransferOrgId(null)
                    },
                  },
                )
              }}
            >
              {transferMutation.isPending ? 'Перевод...' : 'Перевести'}
            </Button>
          </div>
        )}
      </AppDialog>
    </PageLayout>
  )
}

export default EmployeesPage
