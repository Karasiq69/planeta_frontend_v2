import { ColumnDef } from "@tanstack/react-table";
import * as React from "react";
import { DataTableColumnHeader } from "@/components/common/table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle, History } from "lucide-react";
import Link from "next/link";
import { WarehouseItem } from "@/features/warehouse/types";
import { formatPrice } from "@/lib/utils";

export const warehouseItemsColumnsDefs: ColumnDef<WarehouseItem>[] = [
    {
        id: "product",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Товар"/>
        ),
        cell: ({ row }) => (
            <div className="w-full">
                <div className="font-medium">{row.original.product?.name || '-'}</div>

            </div>
        ),
        size: 200
    },
    {
        accessorKey: "product.sku",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Артикул"/>
        ),
        cell: ({ row }) => (
            <div className="w-auto text-xs">
                {row.original.product?.sku || '-'}
            </div>
        )
    },
    {
        id: "warehouse",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Склад"/>
        ),
        cell: ({ row }) => (
            <div>{row.original.warehouse?.name || '-'}</div>
        )
    },
    {
        id: "quantities",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Количество"/>
        ),
        cell: ({ row }) => {
            const available = Number(row.original?.quantity) - Number(row.original.reservedQuantity);
            return (
                <div>
                    <div className="font-medium">
                        {available.toString()} шт.
                    </div>
                    <div className="text-sm text-muted-foreground">
                        {row.original.reservedQuantity} в резерве
                    </div>
                </div>
            );
        }
    },
    {
        accessorKey: "minimumQuantity",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Мин. остаток"/>
        ),
        cell: ({ row }) => {
            const current = Number(row.original.quantity) - Number(row.original.reservedQuantity);
            const minimum = Number(row.original.minimumQuantity);
            const isLow = current <= minimum;

            return (
                <div className={isLow ? "text-red-600" : ""}>
                    {row.getValue("minimumQuantity")}
                </div>
            );
        }
    },
    {
        id: "price",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Цена"/>
        ),
        cell: ({ row }) => (
            <div className="font-medium">
                {formatPrice(row.original.product?.price || 0)}
            </div>
        )
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const warehouseItemId = row.original.id;
            return (
                <div className="flex gap-2 py-0">
                    <Button size="icon" variant="ghost" className="p-0" asChild>
                        <Link href={`/inventory/items/${warehouseItemId}/history`}>
                            <History />
                        </Link>
                    </Button>
                    <Button size="icon" variant="secondary" className="w-full p-0" asChild>
                        <Link href={`/inventory/items/${warehouseItemId}`}>
                            <ArrowRightCircle />
                        </Link>
                    </Button>
                </div>
            );
        }
    }
];