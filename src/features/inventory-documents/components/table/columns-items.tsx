import {ColumnDef} from "@tanstack/react-table";
import {DocumentItem} from "@/features/inventory-documents/types";
import {Button} from "@/components/ui/button";
import {Pencil, Trash2} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {formatPrice} from "@/lib/utils";
import {QuantityInput} from "@/components/ui/quantity-input";

export const DocumentProductsColumnDefs: ColumnDef<DocumentItem>[] = [
    {
        accessorKey: "index",
        header: "№",
        cell: ({ row }) => <div>{row.index + 1} ({row.original.id})</div>,
        enableSorting: false,
    },
    {
        accessorKey: "productName",
        header: "Наименование",
        cell: ({ row }) => {
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
        cell: ({ row }) => {
            return (
                <div>{row.original?.product?.brand?.name || "-"}</div>
            );
        },
    },
    {
        accessorKey: "storageLocation",
        header: "Ячейка",
        cell: ({ row }) => {
            return (
                <Select defaultValue={row.original.toStorageLocationId?.toString() || ""}>
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
        accessorKey: "quantity",
        header: "Количество",
        cell: ({ row }) => {
            return (
                // <Input
                //     type="number"
                //     defaultValue={row.original.quantity}
                //     className="h-8 w-24"
                //     placeholder="1"
                // />
                <QuantityInput defaultValue={Number(row.original.quantity)}/>
            );
        },
    },
    {
        accessorKey: "price",
        header: "Цена",
        cell: ({ row }) => {
            return (
                <Input
                    type="number"
                    defaultValue={row.original.price || ""}
                    className="h-8 w-28"
                    min={0}
                    step={0.01}
                    placeholder="0.00"
                />
            );
        },
    },
    {
        accessorKey: "totalPrice",
        header: "Сумма",
        cell: ({ row }) => {
            return (
                <span>{formatPrice(row.original?.totalPrice)}</span>
            );
        },
    },
    {
        accessorKey: "note",
        header: "Примечание",
        cell: ({ row }) => {
            return (
                <Input
                    defaultValue={row.original.note || ""}
                    className="h-8"
                    placeholder="Примечание"
                />
            );
        },
    },
    {
        id: "actions",
        header: "Действия",
        cell: ({ row }) => {
            return (
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon" title="Редактировать">
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Удалить">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            );
        },
    },
];