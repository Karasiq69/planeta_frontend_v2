import {ColumnDef} from "@tanstack/react-table";
import * as React from "react";
import {Checkbox} from "@/components/ui/checkbox";
import {IClient} from "@/features/clients/types";
import {DataTableColumnHeader} from "@/components/common/table/data-table-column-header";
import {Button} from "@/components/ui/button";
import {ArrowRight, ArrowRightCircle, Trash2, X} from "lucide-react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {ICar} from "@/features/cars/types";
import {BRAND_LOGOS, CARS_URL} from "@/lib/constants";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {getBrandLogo, getFullModelName, getFullSubModelName} from "@/features/cars/utils";
import LicencePlateBadge from "@/features/cars/components/LicencePlateBadge";


export const vehiclesColumns: ColumnDef<ICar>[] = [

    {
        accessorKey: "brand",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Марка"/>
        ),
        cell: ({row}) => {
            const car = row.original;
            const carFullName = getFullModelName(car?.model);
            const logoSrc = getBrandLogo(car?.brand);
            return (
                <div className="flex  items-center   text-nowrap">
                    <Avatar className={'rounded-none items-center'}>
                        <AvatarImage
                            className={'size-7'}
                            src={logoSrc}
                            alt={car.brand?.name || 'Car brand'}
                        />
                        <AvatarFallback delayMs={900}>
                            {car.brand?.name?.charAt(0) || 'B'}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-bold m-0">{carFullName}</p>
                    </div>
                </div>

            )
        },
        enableSorting: false


    },
    {
        id: 'model',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Модель"/>
        ),
        cell: ({row}) => {
            const model = getFullSubModelName(row.original?.model);
            return (
                <p className="text-xs">{model} {row.original?.model?.name}</p>
            )
        },
        enableSorting: false,
        enableHiding: true,
        enableGlobalFilter: true,
    },
    {
        accessorKey: "vin",
        header: "VIN",
        cell: ({row}) => (
            <div className="capitalize text-sm">{row.getValue("vin")}</div>
        ),
    },
    {
        accessorKey: "owner.name",
        header: "Владелец",
        cell: ({row}) => {
            const owner = `${row.original.owner?.firstName} ${row.original?.owner?.lastName}`
            return <div className="capitalize">
                <p>{owner || 'Владелец не указан'}</p>
                <span>{row.original.owner?.phone}</span>
            </div>
        },
    },
    //
    // {
    //     accessorFn: row => ` ${row.firstName} ${row.lastName}`,
    //     accessorKey: "name",
    //     meta: "Имя",
    //     header: ({column}) => (
    //         <DataTableColumnHeader column={column} title="Имя"/>
    //     ),
    //     cell: ({row}) => <div className="w-auto "> {row.getValue("name")}</div>,
    //     enableSorting: false
    // },
    //
    {
        accessorFn: row => `${row.licensePlate}`,
        meta: "Госномер",
        accessorKey: "license_plate",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Госномер"/>
        ),
        cell: ({row}) => {
            const licencePlate = row.original?.licensePlate
            return (
                <LicencePlateBadge licence_plate={licencePlate || ''}/>
            )

        },
        enableSorting: false,
        enableHiding: true,
        enableGlobalFilter: true,
    },
    {
        id: "actions",
        cell: ({row}) => {
            const carId = row?.original?.id
            return (
                // <ClientsTableRowActions row={row} clientId={clientId}/>
                <div className={'flex gap-2 py-0'}>
                    <Button size={'icon'} variant={'secondary'} className={'w-full p-0'} asChild>
                        <Link href={`/cars/${carId}`}>
                            <ArrowRightCircle/>
                        </Link>
                    </Button>
                    <Button size={'icon'} variant={'ghost'} className={'p-0'} disabled><Trash2/></Button>
                </div>
            )
        },
    },
]