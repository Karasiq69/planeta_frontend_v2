import {ColumnDef} from "@tanstack/react-table";
import {DocumentItem} from "@/features/inventory-documents/types";
import {Button} from "@/components/ui/button";
import {Pencil, Trash2} from "lucide-react";
import {formatPrice} from "@/lib/utils";
import {
    DocumentItemsEditableCell
} from "@/features/inventory-documents/components/table/items/DocumentItemsEditableCell";
import {
    DocumentItemsQuantityCell
} from "@/features/inventory-documents/components/table/items/DocumentItemsQuantityCell";
import DocumentItemsWarehouseCell
    from "@/features/inventory-documents/components/table/items/DocumentItemsWarehouseCell";

export const DocumentProductsColumnDefs: ColumnDef<DocumentItem>[] = [
    {
        accessorKey: "index",
        header: "№",
        cell: ({row}) => <div>{row.index + 1} ({row.original.id})</div>,
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
                        <span>Артикул: {item?.product?.sku || "-"}</span>
                        <span className="ml-2">Партномер: {item?.product?.partNumber || "-"}</span>
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
                <div>{row.original?.product?.brand?.name || "-"}</div>
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
        header: "Цена",
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
                <span>{formatPrice(row.original?.totalPrice)}</span>
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
        header: "Действия",
        cell: ({row}) => {
            return (
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon" title="Редактировать">
                        <Pencil className="h-4 w-4"/>
                    </Button>
                    <Button variant="ghost" size="icon" title="Удалить">
                        <Trash2 className="h-4 w-4"/>
                    </Button>
                </div>
            );
        },
    },
];