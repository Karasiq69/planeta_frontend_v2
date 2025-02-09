import {ColumnDef} from "@tanstack/react-table";
import * as React from "react";
import {OrderService} from "@/features/orders/types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Copy, FoldVertical, Pencil, Trash2, UnfoldVertical} from "lucide-react";
import EmployeesCell from "@/features/orders/components/tables/order-services/EmployeeCell";
import OrderServicesTableActions
    from "@/features/orders/components/order-tabs/order-services/order-services-table-actions";


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
            <div className={''}>
                <p className="font-medium m-0     line-clamp-2 truncate">
                    {row.original.service?.name}
                </p>
                <span className="text-xs text-muted-foreground text-wrap truncate line-clamp-1">
                    {row.original.service?.description}
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
        header: () => <div>Н/ч</div>,
        cell: ({row}) => (
            <div className="space-x-1">
                <span>{Math.round(row.original.defaultDuration / 60)}</span>
                <span className="text-xs text-muted-foreground">ч.</span>
            </div>
        ),
    },
    {
        accessorKey: "mechanics",
        header: ({table}) => <div>
            <Button
                variant={'ghost'}
                {...{
                    onClick: table.getToggleAllRowsExpandedHandler(),
                }}
            >
                Исполнители
                {table.getIsAllRowsExpanded()
                    ? <FoldVertical className="ml-2 h-4 w-4"/>
                    : <UnfoldVertical className="ml-2 h-4 w-4"/>}
            </Button>

        </div>,
        cell: ({row, table}) => <EmployeesCell table={table} row={row}/>
    },
    {
        id: "actions",
        header: () => <div className={'text-right'}>Действия</div>,
        cell: ({row}) => {
            return (
                <OrderServicesTableActions rowInstance={row}/>
            )
        },
    },
]