import {ColumnDef} from "@tanstack/react-table"
import * as React from "react"
import {LucideIcon} from "lucide-react"
import {Order} from "@/features/orders/types";
import LicensePlate from "@/components/cars/LicensePlate";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {getBrandLogo} from "@/features/cars/utils";
import {CardDescription, CardTitle} from "@/components/ui/card";
import OrderTableActions from "@/features/orders/components/tables/OrderTableActions";
import {formatPrice} from "@/lib/utils";
import {getStatusData} from "@/features/orders/lib/statuses";



export const OrdersColumnDefs: ColumnDef<Order>[] = [
    {
        accessorKey: "id",
        header: () => <div>№ Заказа</div>,
        size: 0,
        cell: ({row}) => (
            <div>
                <p className="font-medium m-0">
                    {String(row.original.id).padStart(6, '0')}
                </p>
            </div>
        ),

    },
    {
        accessorKey: "status",
        header: () => <div>Статус</div>,
        size: 0,
        cell: ({row}) => {
            const {icon: StatusIcon, color, label} = getStatusData(row.original.status);


            return (
                <div className="flex items-center gap-2">
                    <span className={`${color} px-2 py-1 rounded-md text-xs flex items-center gap-1`}>
                        {StatusIcon && <StatusIcon size={14}/>}
                        <span className={'text-nowrap'}>{label}</span>
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "client",
        header: () => <div>Клиент</div>,
        cell: ({row}) => {
            const client = row.original.client

            const fullName = `${row.original.client?.firstName || ''} ${row.original.client?.lastName || ''}`
            return (
                <div>
                    <p className="font-medium m-0 lg:text-nowrap">
                        {fullName}
                    </p>
                    <span className="text-xs text-muted-foreground">
                    {client?.phone}
                </span>
                </div>
            )
        },
    },
    {
        accessorKey: "car",
        header: () => <div>Автомобиль</div>,
        cell: ({row}) => {
            const car = row.original?.car
            return (
                <div className={'flex flex-row gap-1 items-center'}>
                    <Avatar>
                        <AvatarImage className={'size-8'} src={getBrandLogo(car?.brand)}/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className={'flex font-normal text-sm items-center gap-2'}>
                            {car?.vin}
                            <span className={'font-normal text-xs text-muted-foreground'}> {car?.year}</span>
                        </CardTitle>
                        <CardDescription className={'text-muted-foreground text-xs'}>
                            {car?.model?.code} {car?.model?.series} {car?.model?.name}
                        </CardDescription>
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "licencePlate",
        header: () => <div>Госномер</div>,
        cell: ({row}) => (
            <LicensePlate licensePlate={row.original?.car?.licensePlate}/>
        ),
        size: 0,
    },
    {
        accessorKey: "totalCost",
        header: () => <div>Стоимость</div>,
        cell: ({row}) => {
            const totals = row.original.totalCost
            return (
                <span>{formatPrice(totals)}</span>
            )
        },
    },
    {
        accessorKey: "reasonToApply",
        header: () => <div>Причина обращения</div>,
        cell: ({row}) => (
            <div className="max-w-xs">
                <p className="m-0 truncate">
                    {row.original.reasonToApply || '—'}
                </p>
            </div>
        ),
    },
    {
        id: "actions",
        cell: ({row}) => {
            const orderId = row?.original?.id
            return (
                <OrderTableActions orderId={orderId}/>
            )
        },
    },
]