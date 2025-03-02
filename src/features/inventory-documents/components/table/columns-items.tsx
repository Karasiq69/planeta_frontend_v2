import { ColumnDef } from "@tanstack/react-table";
import { InventoryDocumentItem } from "@/features/inventory-documents/types";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import InventoryDocumentsTableActionButtons from "@/features/inventory-documents/components/table/action-buttons";

export const DocumentProductsColumnDefs: ColumnDef<InventoryDocumentItem>[] = [
    {
        accessorKey: "index",
        header: "№",
        cell: ({ row }) => <div>{row.index + 1}</div>,
        enableSorting: false,
    },
    {
        accessorKey: "productName",
        header: "Номенклатура",
        cell: ({ row }) => {
            const item = row.original;
            return (
                <div>
                    <div>{item?.warehouseItem?.product?.name}</div>
                    {item?.warehouseItem?.product?.brandId && (
                        <div className="text-xs text-muted-foreground">
                            {/* TODO: Replace with actual brand name when available */}
                            Бренд ID: {item?.warehouseItem.product?.brand?.name || 'brand'}
                        </div>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: "partNumber",
        header: "Артикул",
        cell: ({ row }) => <div>{row.original?.warehouseItem?.product?.partNumber || "-"}</div>,
    },
    {
        accessorKey: "quantity",
        header: "Количество",
        cell: ({ row }) => {
            return (
                <Input
                    type="number"
                    value={row.original.quantity}
                    readOnly
                    className="h-8 w-20"
                    min={0.001}
                    step={0.001}
                />
            );
        },
    },
    {
        accessorKey: "storageLocation",
        header: "Ячейка",
        cell: ({ row }) => {
            return (
                <Select value={row.original.toStorageLocationId?.toString() || ""} disabled>
                    <SelectTrigger className="h-8">
                        <SelectValue placeholder="Не выбрана" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">A-1-2-3</SelectItem>
                        <SelectItem value="2">B-1-2-3</SelectItem>
                        <SelectItem value="3">C-1-2-3</SelectItem>
                    </SelectContent>
                </Select>
            );
        },
    },
    {
        accessorKey: "note",
        header: "Примечание",
        cell: ({ row }) => <div>{row.original.note || "-"}</div>,
    },
    {
        id: "actions",
        header: "Действия",
        cell: ({ row }) => {
            return (
                <InventoryDocumentsTableActionButtons documentItem={row.original} />
            );
        },
    },
];