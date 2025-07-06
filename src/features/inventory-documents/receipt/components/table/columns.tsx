import {ColumnDef} from "@tanstack/react-table";
import * as React from "react";
import {DataTableColumnHeader} from "@/components/common/table/data-table-column-header";
import {Button} from "@/components/ui/button";
import {ArrowRightCircle, Trash2} from "lucide-react";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {RECEIPT_DOCUMENTS_URL} from "@/lib/constants";
import {formatPrice} from "@/lib/utils";
import {formatRelativeTime} from "@/lib/format-date";
import {ReceiptDocument} from "@/features/inventory-documents/types";
import {getStatusConfig} from "@/features/inventory-documents/receipt/helpers/status-helper";

// Колонки для таблицы приходных накладных, используем специализированный тип ReceiptDocument
export const inventoryDocumentReceiptColumns: ColumnDef<ReceiptDocument>[] = [
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
        size: 0,
    },
    {
        accessorKey: "date",
        meta: "Дата",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Дата"/>
        ),
        cell: ({row}) => {
            return <span className="text-nowrap text-xs">{formatRelativeTime(row.original.date)}</span>;
        },
        enableSorting: true,
        size: 0,
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
        enableSorting: true,
        filterFn: "equals",
    },
    {
        accessorKey: "supplier",
        meta: "Поставщик",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Поставщик"/>
        ),
        cell: ({row}) => {
            return <div>{row.original.receiptDocument?.supplier?.name || '-'}</div>;
        },
        enableSorting: false,
        size: 0,
    },
    {
        accessorKey: "totalAmount",
        meta: "Сумма",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Сумма"/>
        ),
        cell: ({row}) => {
            return <div>{formatPrice(row.original.totalAmount)}</div>;
        },
        enableSorting: true,
        size: 0,
    },
    {
        accessorKey: "note",
        meta: "Комментарий",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Комментарий"/>
        ),
        cell: ({row}) => {
            return <div className="max-w-[200px] truncate">{row.original.note || '-'}</div>;
        },
        enableSorting: false,
        size: 0,
    },
    {
        accessorKey: "incomingNumber",
        meta: "Номер вх. документа",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Номер вх. документа"/>
        ),
        cell: ({row}) => {
            return <div>{row.original.receiptDocument?.incomingNumber || '-'}</div>;
        },
        enableSorting: false,
        size: 0,
    },
    {
        accessorKey: "user",
        meta: "Ответственный",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Ответственный"/>
        ),
        cell: ({row}) => {
            return <div>{row.original.user?.username || '-'}</div>;
        },
        enableSorting: false,
        size: 0,
    },
    {
        accessorKey: "warehouse",
        meta: "Склад",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Склад"/>
        ),
        cell: ({row}) => {
            return <div>{row.original.warehouse?.name || '-'}</div>;
        },
        enableSorting: false,
        size: 0,
    },
    {
        id: "actions",
        cell: ({row}) => {
             const id = row.original.id;
            const url = `${RECEIPT_DOCUMENTS_URL}/${id}`

            const handleClick = () => {
                // deleteDocument(id)
            }
            return (
                <div className="flex gap-2 py-0">
                    <Button size="icon" variant="secondary" className="w-full p-0" asChild>
                        <Link href={url}>
                            <ArrowRightCircle className="h-4 w-4"/>
                        </Link>
                    </Button>
                    <Button onClick={handleClick} size="icon" variant="ghost" className="p-0" disabled={ row.original.status !== 'DRAFT'}>
                        <Trash2 className="h-4 w-4"/>
                    </Button>
                </div>
            );
        },
        size: 0,
    },
];