'use client'
import { getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { useSearchParams } from 'next/navigation'
import React, { useMemo, useState } from 'react'

import DataTable from '@/components/common/table/data-table'
import LoaderAnimated from '@/components/ui/LoaderAnimated'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import ProductsSearchBox from '@/features/products/components/table/ProductsSearchBox'
import { StockMovementsColumnsDefs } from '@/features/stock-movements/components/table/stock-movements/columns'
import { useAllInventoryTransactions } from '@/features/warehouse/api/queries'

type Props = {}
const StockMovementsDataTable = (props: Props) => {
  const columns = useMemo(() => StockMovementsColumnsDefs, [])
  const searchParams = useSearchParams()
  const searchTerm = searchParams.get('search')
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  })

  const { data, isLoading, isFetching } = useAllInventoryTransactions({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    searchTerm: searchTerm || undefined,
  })

  const table = useReactTable({
    data: data?.data || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    pageCount: data?.meta?.totalPages || -1, // Добавляем информацию о количестве страниц
    manualPagination: true, // Включаем ручную пагинацию
    state: {
      pagination,
    },
  })

  if (isLoading) return <LoaderSectionAnimated className="rounded p-10" />
  if (!data) return <div className='p-4'>No data available</div>

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-3 shrink-0">
        <ProductsSearchBox searchParams={searchParams} />
        {isFetching && <LoaderAnimated />}
      </div>

      <DataTable
        columns={columns}
        table={table}
        totalCount={data?.meta?.total} // Используем общее количество из метаданных
      />
    </div>
  )
}
export default StockMovementsDataTable
