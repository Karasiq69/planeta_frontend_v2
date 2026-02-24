'use client'

import { getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'

import DataTable from '@/components/common/table/data-table'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import { useDocumentsList } from '@/features/documents/api/queries'
import { documentTypeConfigs } from '@/features/documents/config'

interface DocumentsTableProps {
  type: string
}

const DocumentsTable = ({ type }: DocumentsTableProps) => {
  const config = documentTypeConfigs[type]
  const { columns, type: documentType } = config

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  })

  const { data, isLoading } = useDocumentsList({
    type: documentType,
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  })

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: data?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    pageCount: data?.meta.totalPages || -1,
    manualPagination: true,
    state: { pagination },
  })

  if (isLoading) return <LoaderSectionAnimated className='rounded p-10' />
  if (!data) return <div className='p-4'>Данные недоступны</div>

  return <DataTable columns={columns} table={table} totalCount={data.meta.total} />
}

export default DocumentsTable
