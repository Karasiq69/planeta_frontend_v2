import {ColumnDef} from "@tanstack/react-table";
import * as React from "react";
import {InventoryDocument} from "@/features/inventory-documents/types";
import {DataTableColumnHeader} from "@/components/common/table/data-table-column-header";
import {Button} from "@/components/ui/button";
import {ArrowRightCircle, Trash2} from "lucide-react";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {getStatusConfig} from "@/features/inventory-documents/helpers/status-helper";
import {INVENTORY_DOCUMENTS_URL} from "@/lib/constants";
import {formatPrice} from "@/lib/utils";

export const inventoryDocumentColumns: ColumnDef<InventoryDocument>[] = [
    {
        accessorKey: "id",
        meta: "Номер",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Номер"/>
        ),
        cell: ({row}) => {
            return <div className="font-medium">{`#${row.original.id}`}</div>;
        },
        enableSorting: false,
        size: 0, //starting column size
        minSize: 50, //enforced during column resizing
        maxSize: 500, //enforced during column resizing
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
        size: 0, //starting column size
    },
    {
        accessorKey: "status",
        meta: "Статус",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Статус"/>
        ),
        cell: ({row}) => {
            const status = row.getValue("status") as string;
            const statusConfig = getStatusConfig(status);

            return (
                <Badge variant={statusConfig.variant}>
                    {statusConfig.label}
                </Badge>
            );
        },
        size: 0,
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
        size: 0,
    },


    {
        accessorKey: "supplier",
        meta: "Supplier",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Поставщик"/>
        ),
        cell: ({row}) => {
            return <div>{row.original?.supplier?.name}</div>;
        },
        enableSorting: false,
    },
    {
        accessorKey: "user",
        meta: "user",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Ответственный"/>
        ),
        cell: ({row}) => {
            return <div>{row.original.user?.username}</div>;
        },
        enableSorting: false,
    },

    {
        accessorKey: "note",
        meta: "note",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Заметка"/>
        ),
        cell: ({row}) => {
            return <div className={'max-w'}>{row.original?.note}</div>;
        },
        enableSorting: false,
    },
    {
        accessorKey: "totalAmount",
        meta: "totalAmount",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Сумма"/>
        ),
        cell: ({row}) => {
            const totals = row.original.totalAmount
            return <div>{formatPrice(totals)}</div>;
        },
        enableSorting: false,
    },

    {
        id: "actions",
        cell: ({row}) => {
            const id = row.original.id;
            const url = `${INVENTORY_DOCUMENTS_URL}/${id}`
            return (
                <div className="flex gap-2 py-0">
                    <Button size="icon" variant="secondary" className="w-full p-0" asChild>
                        <Link href={url}>
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