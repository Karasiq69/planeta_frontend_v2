import {ColumnDef} from "@tanstack/react-table"
import * as React from "react"
import {LucideIcon} from "lucide-react"
import {Order} from "@/features/orders/types";
import {getStatusField} from "@/features/orders/lib/utils";
import LicensePlate from "@/components/cars/LicensePlate";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {getBrandLogo} from "@/features/cars/utils";
import {CardDescription, CardTitle} from "@/components/ui/card";
import OrderTableActions from "@/features/orders/components/tables/OrderTableActions";
import {formatPrice} from "@/lib/utils";

export const OrdersApplicationsColumnDefs: ColumnDef<Order>[] = [
    {
        accessorKey: "id",
        header: () => <div>№ заявки</div>,
        size: 0,
        cell: ({row}) => (
            <div>
                <p className="font-medium m-0">
                    {row.original.id}
                </p>
            </div>
        ),

    },
    {
        accessorKey: "client",
        header: () => <div>Клиент</div>,
        cell: ({row}) => {
            const client = row.original.client

            const fullName = `${row.original.client?.firstName || ''} ${row.original.client?.lastName || ''}`
            return (
                <div>
                    <p className="font-medium m-0">
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
                            {car?.model?.code} {car?.model?.series} {car?.model?.name}
                            <span className={'font-normal text-xs text-muted-foreground'}> {car?.year}</span>
                        </CardTitle>
                        <CardDescription className={'text-muted-foreground text-xs'}>
                            {car?.vin}
                        </CardDescription>
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "car.licencePlate",
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
    // {
    //     accessorKey: "updatedAt",
    //     header: () => <div>Обновлено</div>,
    //     cell: ({ row }) => (
    //         <div>
    //             <p className="m-0 text-sm">
    //                 {new Date(row.original.updatedAt).toLocaleString('ru-RU', {
    //                     day: '2-digit',
    //                     month: '2-digit',
    //                     year: '2-digit',
    //                     hour: '2-digit',
    //                     minute: '2-digit'
    //                 })}
    //             </p>
    //         </div>
    //     ),
    // },
    {
        id: "actions",
        cell: ({row}) => {
            const orderId = row?.original?.id
            return (
                // <ClientsTableRowActions row={row} clientId={clientId}/>
                <OrderTableActions orderId={orderId}/>
            )
        },
    },
]