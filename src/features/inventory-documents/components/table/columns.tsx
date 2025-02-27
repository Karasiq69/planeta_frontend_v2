import {ColumnDef} from "@tanstack/react-table";
import * as React from "react";
import {InventoryDocument} from "@/features/inventory-documents/types";
import {DataTableColumnHeader} from "@/components/common/table/data-table-column-header";
import {Button} from "@/components/ui/button";
import {ArrowRightCircle, Trash2} from "lucide-react";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";

export const inventoryDocumentColumns: ColumnDef<InventoryDocument>[] = [
    {
        accessorKey: "number",
        meta: "Номер",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Номер"/>
        ),
        cell: ({row}) => {
            const number = row.getValue("number") as string;
            return <div className="font-medium">{number || `#${row.original.id}`}</div>;
        },
        enableSorting: false,
    },

    {
        accessorKey: "type",
        meta: "Тип",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Тип"/>
        ),
        cell: ({row}) => {
            const type = row.getValue("type") as string;
            const typeLabel = {
                RECEIPT: "Приход",
                EXPENSE: "Расход",
                RETURN: "Возврат",
                TRANSFER: "Перемещение",
                WRITE_OFF: "Списание",
                INVENTORY: "Инвентаризация"
            }[type] || type;

            return <div>{typeLabel}</div>;
        },
        enableSorting: false,
    },

    {
        accessorKey: "status",
        meta: "Статус",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Статус"/>
        ),
        cell: ({row}) => {
            const status = row.getValue("status") as string;

            const statusConfig = {
                DRAFT: {label: "Черновик", className: "bg-yellow-100 text-yellow-800"},
                COMPLETED: {label: "Завершен", className: "bg-green-100 text-green-800"},
                CANCELLED: {label: "Отменен", className: "bg-red-100 text-red-800"}
            }[status] || {label: status, className: ""};

            return (
                <Badge className={statusConfig.className}>
                    {statusConfig.label}
                </Badge>
            );
        },
        enableSorting: false,
    },

    {
        accessorKey: "warehouse",
        meta: "Склад",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Склад"/>
        ),
        cell: ({row}) => {
            const warehouse = row.original.warehouse;
            return <div>{warehouse?.name || "-"}</div>;
        },
        enableSorting: false,
    },

    {
        accessorKey: "createdAt",
        meta: "Дата создания",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Дата создания"/>
        ),
        cell: ({row}) => {
            const date = new Date(row.getValue("createdAt") as string);
            const formattedDate = new Intl.DateTimeFormat("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }).format(date);

            return <div>{formattedDate}</div>;
        },
        enableSorting: false,
    },

    {
        id: "actions",
        cell: ({row}) => {
            const documentId = row.original.id;
            return (
                <div className="flex gap-2 py-0">
                    <Button size="icon" variant="secondary" className="w-full p-0" asChild>
                        <Link href={`/inventory-documents/${documentId}`}>
                            <ArrowRightCircle/>
                        </Link>
                    </Button>
                    <Button size="icon" variant="ghost" className="p-0" disabled>
                        <Trash2/>
                    </Button>
                </div>
            );
        },
    },
];