import {ColumnDef} from "@tanstack/react-table";
import {formatPrice} from "@/lib/utils";
import {ReceiptDocumentItem} from "@/features/inventory-documents/types";
import {
    DocumentItemsQuantityCell
} from "@/features/inventory-documents/receipt/components/table/items/DocumentItemsQuantityCell";
import {
    DocumentItemsEditableCell
} from "@/features/inventory-documents/receipt/components/table/items/DocumentItemsEditableCell";
import ReceiptDocumentsTableActionButtons
    from "@/features/inventory-documents/receipt/components/table/items/action-buttons";
import DocumentItemsWarehouseCell
    from "@/features/inventory-documents/receipt/components/table/items/DocumentItemsWarehouseCell";

export const ReceiptItemsColumnsDefs: ColumnDef<ReceiptDocumentItem>[] = [
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
        accessorKey: "price",
        header: "Цена закупки",
        cell: ({row}) => {
            return (
                <DocumentItemsEditableCell
                    documentId={row.original.documentId}
                    item={row.original}
                    fieldName="price"
                    type="number"
                    min={0}
                    className="h-8 w-28"
                    placeholder="0.00"
                    parseValue={(value) => parseFloat(value)}
                />
            );
        },
    },
    {
        accessorKey: "totalPrice",
        header: "Сумма",
        cell: ({row}) => {
            return (
                <span>{formatPrice(row?.original?.totalPrice as string)}</span>
            );
        },
    },
    {
        accessorKey: "note",
        header: "Примечание",
        cell: ({row}) => {
            return (

                <DocumentItemsEditableCell
                    documentId={row.original.documentId}
                    item={row.original}
                    fieldName="note"
                    type="text"
                    className="h-8"
                    placeholder="Примечание"
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