import {ColumnDef} from "@tanstack/react-table"
import * as React from "react"
import {ArrowRightCircle, LucideIcon, Trash2} from "lucide-react"
import {Order, OrderServiceMechanic} from "@/features/orders/types";
import {getStatusField} from "@/features/orders/lib/utils";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import LicensePlate from "@/components/cars/LicensePlate";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {getBrandLogo} from "@/features/cars/utils";
import {CardDescription, CardTitle} from "@/components/ui/card";
import OrderTableActions from "@/features/orders/components/tables/OrderTableActions";
import {Mechanic} from "@/features/mechanics/types";
import OrderMechanicTableActions from "@/features/orders/components/tables/order-mechanics/OrderMechanicTableActions";

export const orderMechanicsColumnsDefs: ColumnDef<OrderServiceMechanic>[] = [
    {
        accessorKey: "mechanic",
        header: () => <span>Механик</span>,
        cell: ({ row }) => {
            const mechanic = row.original.mechanic
            return (
                <div className="flex items-center gap-3">
                    <Avatar className="size-7">
                        <AvatarFallback>{mechanic.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                        <span className="text-sm font-medium">{mechanic.name}</span>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "participationPercentage",
        header: () => <span>% участия</span>,
        cell: ({ row }) => {
            return (
                <p className="font-medium flex gap-1 items-center">
                    {row.original.participationPercentage}
                    <span className={'text-xs text-muted-foreground'}>%</span>
                </p>
            )
        }
    },
    {
        accessorKey: "paymentType",
        header: () => <span>Вид оплаты</span>,
        cell: ({ row }) => {
            return (
                <p className="font-medium flex gap-1 items-center">
                    {row.original.paymentType}
                </p>
            )
        }
    },
    {
        accessorKey: "paymentRate",
        header: () => <span>Ставка</span>,
        cell: ({ row }) => {
            const rate = row.original.paymentRate
            const type = row.original.paymentType === 'percent' ? '%' : '₽/ч'
            return (
                <div className="font-medium">
                    {rate} {type}
                </div>
            )
        }
    },
    {
        accessorKey: "total_payment",
        header: () => <div className={''}>Итого</div>,
        cell: ({row}) => (
            <div className="space-x-1 ">
                <span>12 400</span>
                <span className="text-xs text-muted-foreground">руб.</span>
            </div>
        ),
    },


    {
        id: "actions",
        cell: ({row}) => {
            const mechanicId = row?.original?.id
            return (
                // <span>{mechanicId}</span>
                // <ClientsTableRowActions row={row} clientId={clientId}/>
                <OrderMechanicTableActions row={row}/>
            )
        },
    },
]