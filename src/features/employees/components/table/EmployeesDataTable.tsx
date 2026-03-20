'use client'

import { getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { useMemo, useState } from 'react'

import DataTable from '@/components/common/table/data-table'
import { AppFilterBar } from '@/components/ds'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import { useEmployees } from '@/features/employees/api/queries'
import { getEmployeeColumns } from './columns'

import type { Employee } from '@/features/employees/types'

interface EmployeesDataTableProps {
  onEdit: (employee: Employee) => void
  onFire: (employee: Employee) => void
}

export default function EmployeesDataTable({ onEdit, onFire }: EmployeesDataTableProps) {
  const [search, setSearch] = useState('')
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 })

  const columns = useMemo(() => getEmployeeColumns(onEdit, onFire), [onEdit, onFire])

  const { data, isLoading } = useEmployees({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    searchTerm: search || undefined,
  })

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

  if (isLoading) return <LoaderSectionAnimated className='rounded p-10' />

  return (
    <DataTable table={table} columns={columns} variant='compact'>
      <DataTable.Toolbar>
        <AppFilterBar
          search={{
            value: search,
            onChange: (v) => {
              setSearch(v)
              setPagination((p) => ({ ...p, pageIndex: 0 }))
            },
            placeholder: 'Поиск по имени...',
          }}
        />
      </DataTable.Toolbar>
      <DataTable.Table />
      <DataTable.Pagination totalCount={data?.meta.total} />
    </DataTable>
  )
}
