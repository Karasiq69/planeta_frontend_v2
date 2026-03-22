'use client'

import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useMemo, useState } from 'react'

import DataTable from '@/components/common/table/data-table'
import LoaderAnimated from '@/components/ui/LoaderAnimated'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import { useCashTransactions } from '@/features/payments/api/cash-transactions-queries'
import { cashTransactionColumns } from './cash-transaction-columns'
import CashTransactionsToolbar from './CashTransactionsToolbar'

import type { CashTransactionFilters } from '@/features/payments/types'

type TransactionTableFilters = Pick<CashTransactionFilters, 'type' | 'categoryId' | 'dateFrom' | 'dateTo'>

interface CashTransactionsTableProps {
  cashRegisterId: number
}

const CashTransactionsTable = ({ cashRegisterId }: CashTransactionsTableProps) => {
  const columns = useMemo(() => cashTransactionColumns, [])
  const [filters, setFilters] = useState<TransactionTableFilters>({})
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 })

  const { data, isLoading, isFetching } = useCashTransactions({
    cashRegisterId,
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    ...filters,
  })

  const table = useReactTable({
    data: data?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    pageCount: data?.meta.totalPages || -1,
    manualPagination: true,
    state: { pagination },
  })

  if (isLoading) return <LoaderSectionAnimated className='rounded p-10' />

  return (
    <DataTable table={table} columns={columns} variant='compact'>
      <DataTable.Toolbar>
        <div className='flex items-center gap-3'>
          <CashTransactionsToolbar filters={filters} onFiltersChange={(f) => { setFilters(f); setPagination((p) => ({ ...p, pageIndex: 0 })) }} />
          {isFetching && <LoaderAnimated />}
        </div>
      </DataTable.Toolbar>
      <DataTable.Table />
      <DataTable.Pagination totalCount={data?.meta.total} />
    </DataTable>
  )
}

export default CashTransactionsTable
