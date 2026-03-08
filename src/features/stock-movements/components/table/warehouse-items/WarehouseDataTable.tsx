'use client'
import { getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { useSearchParams } from 'next/navigation'
import React, { useMemo, useState } from 'react'

import DataTable from '@/components/common/table/data-table'
import LoaderAnimated from '@/components/ui/LoaderAnimated'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import ProductsSearchBox from '@/features/products/components/table/ProductsSearchBox'
import { useAllWarehouseItems } from '@/features/warehouse/api/queries'
import { warehouseItemsColumnsDefs } from '@/features/warehouse/components/table/warehouse-items/columns'

type Props = {}
const WarehouseDataTable = (props: Props) => {
  const columns = useMemo(() => warehouseItemsColumnsDefs, [])
  const searchParams = useSearchParams()
  const searchTerm = searchParams.get('search')
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  })

  const { data, isLoading, isFetching } = useAllWarehouseItems({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
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
    <DataTable columns={columns} table={table}>
      <DataTable.Toolbar>
        <ProductsSearchBox searchParams={searchParams} />
        {isFetching && <LoaderAnimated />}
      </DataTable.Toolbar>
      <DataTable.Table />
      <DataTable.Pagination totalCount={data?.meta?.total} />
    </DataTable>
  )
}
export default WarehouseDataTable
