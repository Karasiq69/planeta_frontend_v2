'use client'

import { flexRender } from '@tanstack/react-table'
import { SearchX } from 'lucide-react'
import * as React from 'react'

import { DataTablePagination } from '@/components/common/table/data-table-pagination'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import type { ColumnDef, Table as TableType } from '@tanstack/react-table'

type DataTableVariant = 'default' | 'compact'

interface DataTableContextValue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: TableType<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<any>[]
  variant: DataTableVariant
}

const DataTableContext = React.createContext<DataTableContextValue | null>(null)

function useDataTableContext() {
  const context = React.useContext(DataTableContext)
  if (!context) {
    throw new Error('DataTable sub-components must be used within <DataTable>')
  }
  return context
}

interface DataTableProps<TData> {
  table: TableType<TData>
  columns: ColumnDef<TData>[]
  variant?: DataTableVariant
  children: React.ReactNode
}

function DataTable<TData>({
  table,
  columns,
  variant = 'default',
  children,
}: DataTableProps<TData>) {
  const contextValue = React.useMemo(
    () => ({ table, columns, variant }) as unknown as DataTableContextValue,
    [table, columns, variant],
  )

  return (
    <DataTableContext.Provider value={contextValue}>
      <div className='flex flex-col h-full'>{children}</div>
    </DataTableContext.Provider>
  )
}

function Toolbar({ children }: { children: React.ReactNode }) {
  return <div className='px-4 pt-4 shrink-0'>{children}</div>
}

function DataTableTable() {
  const { table, columns, variant } = useDataTableContext()

  return (
    <div className='flex-1 min-h-0 p-4'>
      <ScrollArea className='h-full border rounded-md'>
        <Table className='table-auto'>
          <TableHeader className='bg-muted border-b'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} style={{ width: `${header.getSize()}px` }}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className='group'
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={variant === 'compact' ? 'py-0.5' : 'py-1.5'}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-48'>
                  <div className='flex flex-col items-center justify-center gap-2 text-muted-foreground'>
                    <SearchX className='size-10 stroke-1' />
                    <span className='text-sm'>Ничего не найдено</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </div>
  )
}

function Pagination({ totalCount }: { totalCount?: number }) {
  const { table } = useDataTableContext()

  if (!totalCount || totalCount <= 0) return null

  return (
    <div className='px-4 pb-4 shrink-0'>
      <DataTablePagination totalResults={totalCount} table={table} />
    </div>
  )
}

DataTable.Toolbar = Toolbar
DataTable.Table = DataTableTable
DataTable.Pagination = Pagination

export default DataTable
