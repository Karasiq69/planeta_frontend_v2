'use client'

import { flexRender } from '@tanstack/react-table'
import * as React from 'react'

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

interface DataTableBasicProps<TData> {
  table: TableType<TData>
  columns: ColumnDef<TData>[]
  className?: string
  emptyState?: React.ReactNode
}

function DataTableBasic<TData>({
  table,
  columns,
  className = 'h-full',
  emptyState,
}: DataTableBasicProps<TData>) {
  return (
    <ScrollArea className={className}>
      <Table>
        <TableHeader className='sticky top-0 z-10 bg-background'>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  style={header.column.columnDef.size === 0 ? { width: 0 } : undefined}
                >
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
                key={row.id}
                className='group/row'
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className='py-2 text-nowrap'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className='hover:bg-transparent'>
              <TableCell colSpan={columns.length}>
                {emptyState ?? (
                  <div className='h-24 flex items-center justify-center text-center'>
                    Ничего не найдено.
                  </div>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}

export default DataTableBasic
