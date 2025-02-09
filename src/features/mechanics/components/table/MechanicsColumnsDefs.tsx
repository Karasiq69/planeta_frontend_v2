import {ColumnDef} from "@tanstack/react-table"
import * as React from "react"
import {ArrowRightCircle, LucideIcon, Trash2} from "lucide-react"
import {Order} from "@/features/orders/types";
import {getStatusField} from "@/features/orders/lib/utils";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import LicensePlate from "@/components/cars/LicensePlate";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {getBrandLogo} from "@/features/cars/utils";
import {CardDescription, CardTitle} from "@/components/ui/card";
import OrderTableActions from "@/features/orders/components/tables/OrderTableActions";
import {Mechanic} from "@/features/mechanics/types";

export const mechanicsColumnsDefs: ColumnDef<Mechanic>[] = [
    {
        accessorKey: "id",
        header: () => <div>ID</div>
    },
    {
        accessorKey: "name",
        header: () => <span>Имя</span>
    },
    {
        accessorKey: "specialization",
        header: () => <span>Специализация</span>
    },
    {
        accessorKey: "hourlyRate",
        header: () => <span>Ставка в ч.</span>
    },


    {
        id: "actions",
        cell: ({row}) => {
            const mechanicId = row?.original?.id
            return (
                // <span>{mechanicId}</span>
                // <ClientsTableRowActions row={row} clientId={clientId}/>
                <OrderTableActions orderId={mechanicId}/>
            )
        },
    },
]