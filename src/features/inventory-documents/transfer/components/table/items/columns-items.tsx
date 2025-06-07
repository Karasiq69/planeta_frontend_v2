import {ColumnDef} from "@tanstack/react-table";
import {TransferDocumentItem} from "@/features/inventory-documents/transfer/types";
import {DataTableColumnHeader} from "@/components/common/table/data-table-column-header";
import {useRemoveTransferDocumentItem} from "@/features/inventory-documents/transfer/api/mutations";
import DocumentItemsWarehouseCell
    from "@/features/inventory-documents/receipt/components/table/items/DocumentItemsWarehouseCell";
import {
    DocumentItemsQuantityCell
} from "@/features/inventory-documents/receipt/components/table/items/DocumentItemsQuantityCell";
import {
    DocumentItemsEditableCell
} from "@/features/inventory-documents/receipt/components/table/items/DocumentItemsEditableCell";
import {formatPrice} from "@/lib/utils";
import ReceiptDocumentsTableActionButtons
    from "@/features/inventory-documents/receipt/components/table/items/action-buttons";

export const TransferItemsColumnsDefs: ColumnDef<TransferDocumentItem>[] = [
    {
        accessorKey: "index",
        header: "№",
        cell: ({row}) => <div>{row.original.id}</div>,
        enableSorting: false,
    },
    {
        accessorKey: "productName",
        header: "Наименование",
        cell: ({row}) => {
            const item = row.original;
            return (
                <div>
                    <div className="font-medium">{item?.product?.name || "-"}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                        <span>Арт: {item?.product?.sku || "-"}</span>
                        <span className="ml-2">P/N: {item?.product?.partNumber || "-"}</span>
                    </div>
                </div>
            );
        },
        size: 0
    },
    {
        accessorKey: "brandName",
        header: "Производитель",
        cell: ({row}) => {
            return (
                <p className={'text-muted-foreground font-medium'}>{row.original?.product?.brand?.name || "-"}</p>
            );
        },
    },
    {
        accessorKey: "storageLocation",
        header: "Ячейка",
        cell: ({row}) => {
            return (
                <DocumentItemsWarehouseCell
                    documentId={row.original.documentId}
                    item={row.original}

                    fieldName="toStorageLocationId"
                />
            );
        },
    },
    {
        accessorKey: "quantity",
        header: "Количество",
        cell: ({row}) => {
            return (
                <DocumentItemsQuantityCell
                    documentId={row.original.documentId}
                    item={row.original}
                    fieldName="quantity"
                    minValue={1}
                    step={1}
                    width="w-32"
                />
            );
        },
    },
    {
        id: "actions",
        header: "",
        cell: ({row}) => {
            return (
                <ReceiptDocumentsTableActionButtons documentItem={row.original}/>
            );
        },
    },
];
