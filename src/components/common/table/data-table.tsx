"use client"

import * as React from "react"
import {ColumnDef, flexRender, Table as TableType} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {DataTablePagination} from "@/components/common/table/data-table-pagination";
import {cn} from "@/lib/utils";

interface DataTableProps<TData> {
    table: TableType<TData>,
    columns: ColumnDef<TData>[]
    totalCount?: number | undefined
    cellSize?: 'default' | 'small'
}

function DataTable<TData>({table, columns, totalCount, cellSize = 'default'}: DataTableProps<TData>) {
    return (
        <div className="w-full p-4">
            <div className="border rounded-md">
                <Table className={'table-auto'}>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}
                                                   style={{ width: `${header.getSize()}px` }}

                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
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
                                    className={'group'}
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}
                                        className={cn(cellSize === 'small' ? 'py-0' : 'py-1.5')}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {totalCount! > 0 && (
                <div className="pt-4 ">
                    <DataTablePagination totalResults={totalCount} table={table}/>
                </div>
            )}
        </div>
    );
}

export default DataTable;
