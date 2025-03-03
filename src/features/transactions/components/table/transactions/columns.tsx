import { ColumnDef } from "@tanstack/react-table";
import * as React from "react";
import { DataTableColumnHeader } from "@/components/common/table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle } from "lucide-react";
import Link from "next/link";
import {InventoryTransaction, TRANSACTION_TYPE_LABELS} from "@/features/warehouse/types";



export const inventoryTransactionsColumnsDefs: ColumnDef<InventoryTransaction>[] = [
    {
        accessorKey: "type",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Тип операции"/>
        ),
        cell: ({ row }) => (
            <div className="font-medium">
                {TRANSACTION_TYPE_LABELS[row.original.type]}
            </div>
        )
    },
    {
        accessorKey: "quantity",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Количество"/>
        ),
        cell: ({ row }) => {
            const quantity = Number(row.getValue("quantity"));
            const isPositive = quantity > 0;
            return (
                <div className={`font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
                    {isPositive ? '+' : ''}{quantity}
                </div>
            );
        }
    },
    {
        id: "product",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Товар"/>
        ),
        cell: ({ row }) => (
            <div className="w-auto">
                {row.original.warehouseItem?.product?.name || '-'}
            </div>
        )
    },
    {
        id: "warehouse",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Склад"/>
        ),
        cell: ({ row }) => (
            <div>
                {row.original.warehouseItem?.warehouse?.name || '-'}
            </div>
        )
    },
    {
        accessorKey: "note",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Примечание"/>
        ),
        cell: ({ row }) => <div>{row.getValue("note") || '-'}</div>
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Дата"/>
        ),
        cell: ({ row }) => (
            <div>
                {new Date(row.getValue("createdAt")).toLocaleDateString('ru-RU')}
            </div>
        )
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const transactionId = row.original.id;
            return (
                <div className="flex gap-2 py-0">
                    <Button size="icon" variant="secondary" className="w-full p-0" asChild>
                        <Link href={`/inventory/transactions/${transactionId}`}>
                            <ArrowRightCircle />
                        </Link>
                    </Button>
                </div>
            );
        }
    }
];