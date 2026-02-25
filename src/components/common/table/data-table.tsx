'use client'

import { flexRender } from '@tanstack/react-table'
import * as React from 'react'

import { DataTablePagination } from '@/components/common/table/data-table-pagination'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import type { ColumnDef, Table as TableType } from '@tanstack/react-table'

interface DataTableProps<TData> {
  table: TableType<TData>
  columns: ColumnDef<TData>[]
  totalCount?: number | undefined
}

function DataTable<TData>({ table, columns, totalCount }: DataTableProps<TData>) {
  return (
    <div className='flex flex-col h-full w-full p-4'>
      <ScrollArea className='flex-1 min-h-0 border rounded-md'>
        <Table className='table-auto'>
          <TableHeader className='bg-muted border-b'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} style={{ width: `${header.getSize()}px` }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
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
                    <TableCell key={cell.id} className='py-1.5'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  Ничего не найдено.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
      {totalCount! > 0 && (
        <div className='pt-4 shrink-0'>
          <DataTablePagination totalResults={totalCount} table={table} />
        </div>
      )}
    </div>
  )
}

export default DataTable
