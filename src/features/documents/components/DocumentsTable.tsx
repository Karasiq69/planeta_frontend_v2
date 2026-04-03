'use client'

import { getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'

import DataTable from '@/components/common/table/data-table'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useDocumentsList } from '@/features/documents/api/queries'
import { DocumentType, expenseCategoryConfig } from '@/features/documents/lib/constants'
import { documentTypeConfigs } from '@/features/documents/lib/document-config'

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
  const [expenseCategoryFilter, setExpenseCategoryFilter] = useState<string | undefined>(undefined)

  const { data, isLoading } = useDocumentsList({
    type: documentType,
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    ...(documentType === DocumentType.EXPENSE && expenseCategoryFilter
      ? { expenseCategory: expenseCategoryFilter }
      : {}),
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

  return (
    <DataTable columns={columns} table={table}>
      {documentType === DocumentType.EXPENSE && (
        <DataTable.Toolbar>
          <Select
            value={expenseCategoryFilter ?? 'all'}
            onValueChange={(value) => {
              setExpenseCategoryFilter(value === 'all' ? undefined : value)
              setPagination((prev) => ({ ...prev, pageIndex: 0 }))
            }}
          >
            <SelectTrigger className='w-[220px]'>
              <SelectValue placeholder='Категория расхода' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Все категории</SelectItem>
              {Object.entries(expenseCategoryConfig).map(([value, config]) => (
                <SelectItem key={value} value={value}>
                  {config.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </DataTable.Toolbar>
      )}
      <DataTable.Table />
      <DataTable.Pagination totalCount={data.meta.total} />
    </DataTable>
  )
}

export default DocumentsTable
