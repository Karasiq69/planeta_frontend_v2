'use client'

import { Check, Copy, Plus } from 'lucide-react'
import { useState } from 'react'

import PageLayout from '@/components/common/PageLayout'
import { AppButton, AppConfirmDialog, AppDialog } from '@/components/ds'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useInviteEmployee, useTransferEmployee, useUpdateEmployee } from '@/features/employees/api/mutations'
import { useAllOrganizations } from '@/features/organizations/api/queries'

import EmployeeForm from './forms/EmployeeForm'
import EmployeesDataTable from './table/EmployeesDataTable'

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
  const inviteMutation = useInviteEmployee()
  const [inviteEmployee, setInviteEmployee] = useState<Employee | null>(null)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteLink, setInviteLink] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleFire = () => {
    if (!fireEmployee) return
    updateMutation.mutate(
      { id: fireEmployee.id, data: { isActive: false, firedAt: new Date().toISOString() } },
      { onSuccess: () => setFireEmployee(null) },
    )
  }

  const handleInvite = (emp: Employee) => {
    if (emp.inviteToken) {
      setInviteLink(`${window.location.origin}/invite/${emp.inviteToken}`)
      return
    }
    setInviteEmployee(emp)
    setInviteEmail('')
  }

  const handleSendInvite = () => {
    if (!inviteEmployee || !inviteEmail) return
    inviteMutation.mutate(
      { employeeId: inviteEmployee.id, data: { email: inviteEmail } },
      {
        onSuccess: (data) => {
          const url = `${window.location.origin}/invite/${data.token}`
          setInviteEmployee(null)
          setInviteLink(url)
        },
      },
    )
  }

  const handleCopyLink = async () => {
    if (!inviteLink) return
    await navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
          onInvite={handleInvite}
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
      <AppDialog
        open={!!inviteEmployee}
        onOpenChange={(open) => !open && setInviteEmployee(null)}
        title='Пригласить сотрудника'
      >
        {inviteEmployee && (
          <div className='space-y-4'>
            <p className='text-sm text-muted-foreground'>
              Укажите email для сотрудника «{fullName(inviteEmployee)}»
            </p>
            <Input
              type='email'
              placeholder='email@example.com'
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
            <Button
              className='w-full'
              disabled={!inviteEmail || inviteMutation.isPending}
              onClick={handleSendInvite}
            >
              {inviteMutation.isPending ? 'Отправка...' : 'Создать приглашение'}
            </Button>
          </div>
        )}
      </AppDialog>

      <AppDialog
        open={!!inviteLink}
        onOpenChange={(open) => {
          if (!open) {
            setInviteLink(null)
            setCopied(false)
          }
        }}
        title='Ссылка-приглашение'
      >
        <div className='space-y-4'>
          <p className='text-sm text-muted-foreground'>
            Скопируйте ссылку и отправьте сотруднику. Ссылка действительна 72 часа.
          </p>
          <div className='flex gap-2'>
            <Input value={inviteLink ?? ''} readOnly className='text-xs' />
            <Button variant='outline' size='icon' className='shrink-0' onClick={handleCopyLink}>
              {copied ? <Check className='size-4' /> : <Copy className='size-4' />}
            </Button>
          </div>
        </div>
      </AppDialog>
    </PageLayout>
  )
}

export default EmployeesPage
