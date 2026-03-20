'use client'

import { getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { useMemo, useState } from 'react'

import DataTable from '@/components/common/table/data-table'
import { AppFilterBar, AppSelect } from '@/components/ds'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import { useUsers } from '@/features/users/api/queries'
import { ROLE_LABELS } from '@/types/user'
import { getUserColumns } from './columns'

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

interface UsersDataTableProps {
  onEdit: (user: User) => void
  onToggleActive: (user: User) => void
}

export default function UsersDataTable({ onEdit, onToggleActive }: UsersDataTableProps) {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState(ALL)
  const [statusFilter, setStatusFilter] = useState(ALL)
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 })

  const columns = useMemo(() => getUserColumns(onEdit, onToggleActive), [onEdit, onToggleActive])

  const params: UserListParams = {
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    searchTerm: search || undefined,
    ...(roleFilter !== ALL && { role: roleFilter as UserRole }),
    ...(statusFilter !== ALL && { isActive: statusFilter === 'active' }),
  }

  const { data, isLoading } = useUsers(params)

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    pageCount: data?.meta.totalPages ?? -1,
    manualPagination: true,
    state: { pagination },
  })

  const handleResetFilters = () => {
    setSearch('')
    setRoleFilter(ALL)
    setStatusFilter(ALL)
    setPagination((p) => ({ ...p, pageIndex: 0 }))
  }

  if (isLoading) return <LoaderSectionAnimated className='rounded p-10' />

  return (
    <DataTable table={table} columns={columns}>
      <DataTable.Toolbar>
        <AppFilterBar
          search={{
            value: search,
            onChange: (v) => {
              setSearch(v)
              setPagination((p) => ({ ...p, pageIndex: 0 }))
            },
            placeholder: 'Поиск...',
          }}
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
      </DataTable.Toolbar>
      <DataTable.Table />
      <DataTable.Pagination totalCount={data?.meta.total} />
    </DataTable>
  )
}
