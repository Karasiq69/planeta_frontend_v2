import {ColumnDef} from "@tanstack/react-table";
import * as React from "react";
import {OrderService} from "@/features/orders/types";


export const ServicesColumnDefs: ColumnDef<OrderService>[] = [
    {
        accessorKey: "id",
        header: () => <div>Код работы</div>,
        cell: ({row}) => (
            <div>
                <p className="m-0 text-muted-foreground">
                    {String(row.original.id).padStart(8, '0')}
                </p>
            </div>
        ),
    },
    {
        accessorKey: "service.name",
        header: () => <div>Наименование</div>,
        cell: ({row}) => (
            <div>
                <p className="font-medium m-0 text-nowrap">
                    {row.original.service.name}
                </p>
                <span className="text-xs text-muted-foreground">
                    {row.original.service.description}
                </span>
            </div>
        ),
    },
    {
        accessorKey: "appliedRate",
        header: () => <div>Ставка</div>,
        cell: ({row}) => {
            const discount = row.original.discountPercent;
            return (
                <div className="space-x-1">
                    {discount && discount > 0 && (
                        <span>
                            (-{discount}
                            <span className="text-xs text-muted-foreground">%)</span>
                        </span>
                    )}
                    <span>{row.original.appliedRate}</span>
                    <span className="text-xs text-muted-foreground">руб.</span>
                </div>
            );
        },
    },
    {
        accessorKey: "defaultDuration",
        header: () => <div>Длительность</div>,
        cell: ({row}) => (
            <div className="space-x-1">
                <span>{Math.round(row.original.defaultDuration / 60)}</span>
                <span className="text-xs text-muted-foreground">ч.</span>
            </div>
        ),
    },
]