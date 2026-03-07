'use client'
import { getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import {
  Building2,
  LoaderCircle,
  Search,
  X,
} from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import DataTable from '@/components/common/table/data-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import { useAllWarehouseItems, useGetWarehouses } from '@/features/warehouse/api/queries'
import { WarehouseItemHistorySheet } from '@/features/warehouse/components/WarehouseItemHistorySheet'
import { warehouseItemsColumnsDefs } from '@/features/warehouse/components/table/warehouse-items/columns'
import { warehouseTypeConfig } from '@/features/warehouse/types/config'

import type { WarehouseItem } from '@/features/warehouse/types'

const WarehouseDataTable = () => {
  const columns = useMemo(() => warehouseItemsColumnsDefs, [])
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const search = searchParams.get('search')

  const [searchValue, setSearchValue] = useState(search || '')
  const [warehouseId, setWarehouseId] = useState<number | undefined>(undefined)
  const [historyItem, setHistoryItem] = useState<WarehouseItem | null>(null)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  })

  useEffect(() => {
    setSearchValue(search || '')
  }, [search])

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('search', term)
    } else {
      params.delete('search')
    }
    replace(`${pathname}?${params.toString()}`)
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }, 300)

  const handleClear = useCallback(() => {
    setSearchValue('')
    handleSearch('')
  }, [handleSearch])

  const { data: warehouses } = useGetWarehouses()

  const { data, isLoading, isFetching } = useAllWarehouseItems({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    warehouseId,
    searchTerm: search || undefined,
  })

  const table = useReactTable({
    data: data?.data || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    pageCount: data?.meta?.totalPages || -1,
    manualPagination: true,
    state: {
      pagination,
    },
    meta: {
      onHistoryClick: (item: WarehouseItem) => setHistoryItem(item),
    },
  })

  if (isLoading) return <LoaderSectionAnimated className="rounded p-10" />
  if (!data) return <div className='p-4'>Нет данных</div>

  return (
    <>
      <div className="flex flex-col h-full">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 px-4 pt-5 shrink-0">
          <div className='relative max-w-xs w-full'>
            {isFetching
              ? <LoaderCircle className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground animate-spin' />
              : <Search className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
            }
            <Input
              placeholder='Поиск товаров...'
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value)
                handleSearch(e.target.value)
              }}
              className='pl-9 pr-10'
            />
            {searchValue && (
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className='absolute right-0 top-0 h-full px-3'
                onClick={handleClear}
              >
                <X className='size-4' />
              </Button>
            )}
          </div>

          <Select
            value={warehouseId?.toString() ?? 'all'}
            onValueChange={(value) => {
              setWarehouseId(value === 'all' ? undefined : parseInt(value))
              setPagination((prev) => ({ ...prev, pageIndex: 0 }))
            }}
          >
            <SelectTrigger className='w-[200px] [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 [&>span_svg]:text-muted-foreground/80'>
              <SelectValue placeholder='Все склады' />
            </SelectTrigger>
            <SelectContent className='[&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2'>
              <SelectItem value='all'>Все склады</SelectItem>
              {warehouses?.map((warehouse) => {
                const Icon = warehouseTypeConfig[warehouse.type]?.icon || Building2
                return (
                  <SelectItem key={warehouse.id} value={warehouse.id.toString()}>
                    <Icon size={16} aria-hidden='true' />
                    {warehouse.name}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>

        </div>

        <DataTable
          columns={columns}
          table={table}
          totalCount={data?.meta?.total}
        />
      </div>

      <WarehouseItemHistorySheet
        item={historyItem}
        open={!!historyItem}
        onOpenChange={(open) => !open && setHistoryItem(null)}
      />
    </>
  )
}
export default WarehouseDataTable
