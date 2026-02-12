'use client'


import { Download, RefreshCw, X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { DataTableFacetedFilter } from '@/components/tables/data-table-faceted-filter'
import { DataTableViewOptions } from '@/components/tables/data-table-view-options'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import LoaderAnimated from '@/components/ui/LoaderAnimated'
import { statuses } from '@/features/orders/lib/statuses'

import type { Table } from '@tanstack/react-table'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  isLoading?: boolean
  onRefresh?: () => void
  onExport?: () => void
}

export function DataTableToolbar<TData>({
  table,
  isLoading,
  onRefresh,
  onExport,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  const pathname = usePathname()
  const { replace } = useRouter()

  // Состояние для контроля значения в поле ввода
  const [searchValue, setSearchValue] = useState(search || '')

  // При изменении параметра search в URL, обновляем значение в поле ввода
  useEffect(() => {
    setSearchValue(search || '')
  }, [search])

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams)

    if (term) {
      params.set('search', term)
    } else {
      params.delete('search')
    }

    replace(`${pathname}?${params.toString()}`)
  }, 300)

  // Функция для очистки поля поиска
  const handleClear = useCallback(() => {
    setSearchValue('')
    handleSearch('')
  }, [handleSearch])

  return (
    <div className='flex flex-wrap items-center justify-between gap-2'>
      <div className='flex flex-1 flex-wrap items-center gap-2'>
        <div className='relative max-w-xs w-full'>
          <Input
            placeholder='Фильтр...'
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value)
              handleSearch(e.target.value)
            }}
            className='pr-10'
          />
          {searchValue && (
            <Button
              type='button'
              variant='ghost'
              size='sm'
              className='absolute right-0 top-0 h-full px-3'
              onClick={handleClear}
            >
              <X className='h-4 w-4' />
            </Button>
          )}
        </div>

        {table.getColumn('status') != null && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title='Статус'
            options={statuses}
          />
        )}

        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Сброс
            <X className='ml-2 h-4 w-4' />
          </Button>
        )}

        {isLoading && <LoaderAnimated />}
      </div>

      <div className='flex items-center gap-2'>
        {onRefresh && (
          <Button variant='outline' size='sm' onClick={onRefresh} disabled={isLoading}>
            <RefreshCw className='mr-2 h-4 w-4' />
            Обновить
          </Button>
        )}

        {onExport && (
          <Button variant='outline' size='sm' onClick={onExport} disabled={isLoading}>
            <Download className='mr-2 h-4 w-4' />
            Экспорт
          </Button>
        )}

        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
