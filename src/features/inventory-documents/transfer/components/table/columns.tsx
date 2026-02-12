import {ColumnDef} from "@tanstack/react-table";
import * as React from "react";
import {DataTableColumnHeader} from "@/components/common/table/data-table-column-header";
import {Button} from "@/components/ui/button";
import {ArrowRightCircle, Trash2} from "lucide-react";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {RECEIPT_DOCUMENTS_URL, TRANSFER_DOCUMENTS_URL} from "@/lib/constants";
import {formatPrice} from "@/lib/utils";
import {formatRelativeTime} from "@/lib/format-date";
import {ReceiptDocument} from "@/features/inventory-documents/types";
import {getStatusConfig} from "@/features/inventory-documents/receipt/helpers/status-helper";
import {useDeleteReceiptDocument} from "@/features/inventory-documents/receipt/api/mutations";
import {TransferDocument} from "@/features/inventory-documents/transfer/types";

// Колонки для таблицы приходных накладных, используем специализированный тип ReceiptDocument
export const inventoryDocumentTransferColumns: ColumnDef<TransferDocument>[] = [
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
            return <div>{row.original.transferDocument.sourceWarehouse?.name || '-'}</div>;
        },
        enableSorting: false,
        size: 0,
    },
    {
        id: "warehouseReciever",
        meta: "Склад-получатель",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Склад-получатель"/>
        ),
        cell: ({row}) => {
            return <div>{row.original.transferDocument.destinationWarehouse?.name || '-'}</div>;
        },
        enableSorting: false,
        size: 0,
    },
    {
        accessorKey: "note",
        meta: "Комментарий",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Комментарий"/>
        ),
        cell: ({row}) => {
            return <div className="max-w-[200px] truncate text-xs">{row.original.note || '-'}</div>;
        },
        enableSorting: false,
        size: 0,
    },
    {
        id: "actions",
        cell: ({row}) => {
             const id = row.original.id;
            const url = `${TRANSFER_DOCUMENTS_URL}/${id}`

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