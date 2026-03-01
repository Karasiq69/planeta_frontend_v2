'use client'

import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

import PageHeader from '@/components/common/PageHeader'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useDeleteEmployee } from '@/features/employees/api/mutations'
import { useEmployees } from '@/features/employees/api/queries'
import { POSITION_LABELS } from './forms/schema'
import EmployeeForm from './forms/EmployeeForm'

import type { Employee } from '@/features/employees/types'

const EmployeesPage = () => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const { data, isLoading } = useEmployees({ page, pageSize: 20, searchTerm: search || undefined })
  const deleteMutation = useDeleteEmployee()

  const [createOpen, setCreateOpen] = useState(false)
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null)
  const [deleteEmployee, setDeleteEmployee] = useState<Employee | null>(null)

  const employees = data?.data ?? []
  const meta = data?.meta

  const handleDelete = () => {
    if (!deleteEmployee) return
    deleteMutation.mutate(deleteEmployee.id, {
      onSuccess: () => setDeleteEmployee(null),
    })
  }

  const fullName = (e: Employee) =>
    [e.lastName, e.firstName, e.middleName].filter(Boolean).join(' ')

  return (
    <div className='space-y-6'>
      <PageHeader
        title='Сотрудники'
        showBackButton
        elements={[
          <Button key='add' size='sm' onClick={() => setCreateOpen(true)}>
            <Plus className='mr-1.5 size-4' />
            Добавить сотрудника
          </Button>,
        ]}
      />

      <div className='flex gap-3'>
        <Input
          placeholder='Поиск по имени...'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          className='max-w-xs'
        />
      </div>

      {isLoading ? (
        <LoaderSectionAnimated className='rounded p-10' />
      ) : employees.length > 0 ? (
        <>
          <div className='rounded-lg border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ФИО</TableHead>
                  <TableHead>Должность</TableHead>
                  <TableHead>Организация</TableHead>
                  <TableHead>Телефон</TableHead>
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
                    <TableCell>
                      {emp.isActive ? (
                        <span className='text-green-600'>Активен</span>
                      ) : (
                        <span className='text-muted-foreground'>Уволен</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className='flex gap-1'>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='size-8'
                          onClick={() => setEditEmployee(emp)}
                        >
                          <Pencil className='size-4' />
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='size-8 text-destructive hover:text-destructive'
                          onClick={() => setDeleteEmployee(emp)}
                        >
                          <Trash2 className='size-4' />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {meta && meta.totalPages > 1 && (
            <div className='flex items-center justify-center gap-2'>
              <Button
                variant='outline'
                size='sm'
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Назад
              </Button>
              <span className='text-sm text-muted-foreground'>
                {page} / {meta.totalPages}
              </span>
              <Button
                variant='outline'
                size='sm'
                disabled={page >= meta.totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Вперёд
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className='rounded-lg border p-8 text-center text-muted-foreground'>
          Нет сотрудников
        </div>
      )}

      {/* Диалог создания */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className='max-w-lg'>
          <DialogHeader>
            <DialogTitle>Новый сотрудник</DialogTitle>
          </DialogHeader>
          <EmployeeForm onSuccess={() => setCreateOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Диалог редактирования */}
      <Dialog open={!!editEmployee} onOpenChange={(open) => !open && setEditEmployee(null)}>
        <DialogContent className='max-w-lg'>
          <DialogHeader>
            <DialogTitle>Редактирование сотрудника</DialogTitle>
          </DialogHeader>
          {editEmployee && (
            <EmployeeForm
              employee={editEmployee}
              onSuccess={() => setEditEmployee(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Подтверждение удаления */}
      <AlertDialog open={!!deleteEmployee} onOpenChange={(open) => !open && setDeleteEmployee(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить сотрудника?</AlertDialogTitle>
            <AlertDialogDescription>
              Сотрудник «{deleteEmployee && fullName(deleteEmployee)}» будет удалён. Это действие
              нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? 'Удаление...' : 'Удалить'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default EmployeesPage
