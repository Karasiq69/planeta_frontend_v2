'use client'

import { getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'

import DataTable from '@/components/common/table/data-table'
import LoaderAnimated from '@/components/ui/LoaderAnimated'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import { useSpecificationsList } from '@/features/service-specifications/api/queries'

import { getSpecificationColumns } from './columns'
import SpecificationsSearchBox from './SpecificationsSearchBox'

import type { Specification } from '@/features/service-specifications/types'

interface SpecificationsDataTableProps {
  onEdit: (spec: Specification) => void
}

const SpecificationsDataTable = ({ onEdit }: SpecificationsDataTableProps) => {
  const columns = useMemo(() => getSpecificationColumns(onEdit), [onEdit])
  const searchParams = useSearchParams()
  const searchTerm = searchParams.get('search')
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  })

  const { data, isLoading, isFetching } = useSpecificationsList({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    search: searchTerm || undefined,
  })

  const table = useReactTable({
    data: data?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    pageCount: data?.meta.totalPages || -1,
    manualPagination: true,
    state: {
      pagination,
    },
  })

  if (isLoading) return <LoaderSectionAnimated className='rounded p-10' />
  if (!data) return null

  return (
    <DataTable table={table} columns={columns} variant='compact'>
      <DataTable.Toolbar>
        <div className='flex gap-3'>
          <SpecificationsSearchBox />
          {isFetching && <LoaderAnimated />}
        </div>
      </DataTable.Toolbar>
      <DataTable.Table />
      <DataTable.Pagination totalCount={data.meta.total} />
    </DataTable>
  )
}

export default SpecificationsDataTable
