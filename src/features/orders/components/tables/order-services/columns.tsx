import {ColumnDef} from "@tanstack/react-table";
import * as React from "react";
import {OrderService} from "@/features/orders/types";
import {Button} from "@/components/ui/button";
import {FoldVertical, UnfoldVertical} from "lucide-react";
import EmployeesCell from "@/features/orders/components/tables/order-services/EmployeeCell";
import OrderServicesTableActions
    from "@/features/orders/components/order-tabs/order-services/order-services-table-actions";


export const ServicesColumnDefs: ColumnDef<OrderService>[] = [
    {
        accessorKey: "id",
        header: () => <span className={'text-xs text-nowrap'}>Код работы</span>,
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
        header: () => <span className={'text-xs text-nowrap'}>Работа</span>,
        cell: ({row}) => (
            <p className="font-medium m-0 w-auto">
                {row.original.service?.name}
            </p>
        ),
    },


    {
        accessorKey: "defaultDuration",
        header: () => <span className={'text-xs text-muted-foreground '}>Норма времени</span>,
        cell: ({row}) => {
            return (
                <p>
                    {(row.original.defaultDuration / 60).toFixed(3)}
                </p>
            );
        },
    },

    // {
    //     accessorKey: "appliedRate",
    //     header: () => <div>Н/ч</div>,
    //     cell: ({row}) => (
    //         <div className="space-x-1">
    //             <span>4700 руб</span>
    //
    //         </div>
    //     ),
    // },


    // {
    //     accessorKey: "discountPercent",
    //     header: () => <span className={'text-xs text-muted-foreground'}>Скидка</span>,
    //     cell: ({row}) => (
    //         <div className="space-x-1">
    //             {row.original.discountPercent &&
    //                 <>
    //                     {row.original.discountPercent}
    //                     <span className={'text-muted-foreground text-xs'}> %</span>
    //                 </>
    //             }
    //         </div>
    //     ),
    // },
    {
        accessorKey: "mechanics",
        header: ({table}) => <div>
            <Button
                variant={'ghost'}
                className={'text-xs'}
                {...{
                    onClick: table.getToggleAllRowsExpandedHandler(),
                }}
            >

                {table.getIsAllRowsExpanded()
                    ? <FoldVertical className="  h-4 w-4"/>
                    : <UnfoldVertical className=" h-4 w-4"/>}
            </Button>

        </div>,
        cell: ({row, table}) => <EmployeesCell table={table} row={row}/>
    },
    {
        accessorKey: "quantity",
        header: () => <span className={'text-xs text-nowrap'}>Кол-во</span>,
        cell: ({row}) => (
            <div className={''}>
                1 шт
            </div>
        ),
    },
    {
        accessorKey: "totals",
        header: () => <span className="text-xs text-muted-foreground">Итого</span>,
        cell: ({row}) => {
            const orderService = row.original;

            return (
                <div className="text-nowrap">
                    {orderService.discountPercent > 0 && (
                        <span className="text-muted-foreground text-xs mr-2">
                        {Math.round((orderService.defaultDuration / 60) * orderService.appliedRate).toLocaleString('ru-RU')} ₽ →
                        (-{orderService.discountPercent}%)
                    </span>
                    )}
                    <span>{orderService.appliedPrice.toLocaleString('ru-RU')}</span>
                    <span className="text-xs text-muted-foreground ml-1">₽</span>
                </div>
            );
        }
    },

    {
        id: "actions",
        header: () => <div className={'text-xs text-muted-foreground'}>Действия</div>,
        cell: ({row}) => {
            return (
                <OrderServicesTableActions rowInstance={row}/>
            )
        },
    },
]