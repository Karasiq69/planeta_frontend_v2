"use client";
import {flexRender, Table as TableType} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import React from "react";
import {DataTablePagination} from "@/components/common/table/data-table-pagination";

interface BaseData {
    id: string;
    [key: string]: any;
}

interface DataTableProps<TData extends BaseData> {
    table: TableType<TData>;
    totalItems: number;
    totalCols: number;
}

export function DataTableBasic<TData extends BaseData>({
                                                           table,
                                                           totalItems,
                                                           totalCols
                                                       }: DataTableProps<TData>) {
    return (
        <div className="rounded-md border bg-secondary/30">
            <div className="rounded-md bg-background">
                <Table className="table-auto">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="hover:bg-none"
                            >
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        style={{width: `${header.getSize()}px`}}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className="bg-secondary/30">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="hover:bg-transparent"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="p-0">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={totalCols} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {totalItems > 0 && (
                <div className="p-2 border-t-2 bg-primary-foreground">
                    <DataTablePagination totalResults={totalItems} table={table}/>
                </div>
            )}
        </div>
    );
}