import {ColumnDef} from "@tanstack/react-table";
import * as React from "react";
import {DataTableColumnHeader} from "@/components/common/table/data-table-column-header";
import {Button} from "@/components/ui/button";
import {ArrowRightCircle, History} from "lucide-react";
import Link from "next/link";
import {WarehouseItem} from "@/features/warehouse/types";
import {formatPrice} from "@/lib/utils";

export const warehouseItemsColumnsDefs: ColumnDef<WarehouseItem>[] = [
    {
        id: "sku",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Артикул"/>
        ),
        cell: ({row}) => (
            <>
                {row.original.product?.sku}
            </>
        ),
        size: 200
    },
    {
        id: "product",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Товар"/>
        ),
        cell: ({row}) => (
            <div className="font-medium">{row.original.product?.name}</div>
        ),
        size: 500
    },
    {
        id: "warehouse",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Склад"/>
        ),
        cell: ({row}) => (
            <div>{row.original.warehouse?.name || '-'}</div>
        )
    },
    {
        id: "quantities",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Наличие"/>
        ),
        cell: ({row}) => {
            const available = Number(row.original?.quantity) - Number(row.original.reservedQuantity);
            return (
                <div>
                    <div className="font-medium">
                        {available.toString()} шт.
                    </div>

                </div>
            );
        }
    },
    {
        id: "price",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Цена"/>
        ),
        cell: ({row}) => (
            <div className="font-medium">
                {formatPrice(row.original.product?.price || 0)}
            </div>
        )
    },
    {
        accessorKey: "updatedAt",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Обновлено"/>
        ),
        cell: ({row}) => (
            <div>
                {new Date(row.getValue("updatedAt")).toLocaleDateString('ru-RU')}
            </div>
        )
    },
    {
        id: "actions",
        cell: ({row}) => {
            const warehouseItemId = row.original.id;
            return (
                <div className="flex gap-2 py-0">
                    {/*<Button size="icon" variant="ghost" className="p-0" asChild>*/}
                    {/*    <Link href={`/inventory/items/${warehouseItemId}/history`}>*/}
                    {/*        <History/>*/}
                    {/*    </Link>*/}
                    {/*</Button>*/}
                    <Button size="icon" variant="secondary" className="w-full p-0" asChild>
                        <Link href={`/inventory/items/${warehouseItemId}`}>
                            <ArrowRightCircle/>
                        </Link>
                    </Button>
                </div>
            );
        }
    }
];