import {ColumnDef} from "@tanstack/react-table";
import * as React from "react";
import {DataTableColumnHeader} from "@/components/common/table/data-table-column-header";
import {Button} from "@/components/ui/button";
import {ArrowRightCircle} from "lucide-react";
import Link from "next/link";
import {InventoryTransaction, OperationType} from "@/features/warehouse/types";
import {InventoryDocumentStatus, InventoryDocumentType} from "@/features/inventory-documents/types";

export const inventoryTransactionsColumnsDefs: ColumnDef<InventoryTransaction>[] = [
    {
        id: "operationType",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Тип операции"/>
        ),
        cell: ({row}) => (
            <div className="font-medium">
                {row.original.document?.operationType
                    ? OperationType[row.original.document.operationType]
                    : '-'
                }
            </div>
        )
    },
    {
        id: "documentType",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Тип документа"/>
        ),
        cell: ({row}) => (
            <div className="text-sm text-muted-foreground">
                {row.original.document?.type
                    ? InventoryDocumentType[row.original.document.type]
                    : '-'
                }
            </div>
        )
    },
    {
        id: "documentStatus",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Статус"/>
        ),
        cell: ({row}) => {
            const status = row.original.document?.status;
            if (!status) return <div>-</div>;

            const statusColors = {
                'DRAFT': 'bg-gray-100 text-gray-700',
                'PENDING': 'bg-yellow-100 text-yellow-700',
                'COMPLETED': 'bg-green-100 text-green-700',
                'CANCELLED': 'bg-red-100 text-red-700'
            };

            return (
                <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
                    {InventoryDocumentStatus[status]}
                </span>
            );
        }
    },
    {
        accessorKey: "quantity",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Количество"/>
        ),
        cell: ({row}) => {
            const quantity = parseFloat(row.getValue("quantity"));
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
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Товар"/>
        ),
        cell: ({row}) => (
            <div className="w-auto">
                <div className="font-medium">
                    {row.original.warehouseItem?.product?.name || '-'}
                </div>
                {row.original.warehouseItem?.product?.sku && (
                    <div className="text-xs text-muted-foreground">
                        {row.original.warehouseItem.product.sku}
                    </div>
                )}
            </div>
        )
    },
    {
        id: "warehouse",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Склад"/>
        ),
        cell: ({row}) => (
            <div>
                {row.original.warehouseItem?.warehouse?.name || '-'}
            </div>
        )
    },
    {
        id: "storageLocation",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Перемещение"/>
        ),
        cell: ({row}) => {
            const {fromStorageLocationId, toStorageLocationId} = row.original;

            if (!fromStorageLocationId && !toStorageLocationId) {
                return <div className="text-muted-foreground">-</div>;
            }

            return (
                <div className="text-sm">
                    {fromStorageLocationId && (
                        <div className="text-red-600">Из: {fromStorageLocationId}</div>
                    )}
                    {toStorageLocationId && (
                        <div className="text-green-600">В: {toStorageLocationId}</div>
                    )}
                </div>
            );
        }
    },
    {
        accessorKey: "note",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Примечание"/>
        ),
        cell: ({row}) => {
            const note = row.getValue("note") as string;
            const documentNote = row.original.document?.note;

            return (
                <div className="max-w-[200px]">
                    {note && <div className="truncate">{note}</div>}
                    {documentNote && (
                        <div className="text-xs text-muted-foreground truncate">
                           {documentNote}
                        </div>
                    )}
                    {!note && !documentNote && '-'}
                </div>
            );
        }
    },
    {
        accessorKey: "createdAt",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Дата"/>
        ),
        cell: ({row}) => {
            const createdAt = new Date(row.getValue("createdAt"));
            const documentDate = row.original.document?.date ? new Date(row.original.document.date) : null;

            return (
                <div className="text-sm">
                    <div>{createdAt.toLocaleDateString('ru-RU')}</div>
                    <div className="text-xs text-muted-foreground">
                        {createdAt.toLocaleTimeString('ru-RU', {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </div>
                    {documentDate && documentDate.toDateString() !== createdAt.toDateString() && (
                        <div className="text-xs text-muted-foreground">
                            Док: {documentDate.toLocaleDateString('ru-RU')}
                        </div>
                    )}
                </div>
            );
        }
    },
    {
        id: "actions",
        cell: ({row}) => {
            const transactionId = row.original.id;
            const documentId = row.original.documentId;

            return (
                <div className="flex gap-2 py-0">
                    <Button size="icon" variant="secondary" className="w-8 h-8" asChild>
                        <Link href={`/inventory/transactions/${transactionId}`}>
                            <ArrowRightCircle className="h-4 w-4"/>
                        </Link>
                    </Button>
                    {documentId && (
                        <Button size="icon" variant="outline" className="w-8 h-8" asChild>
                            <Link href={`/inventory/documents/${documentId}`}>
                                <ArrowRightCircle className="h-4 w-4"/>
                            </Link>
                        </Button>
                    )}
                </div>
            );
        }
    }
];