import {ColumnDef} from "@tanstack/react-table";
import * as React from "react";
import {Checkbox} from "@/components/ui/checkbox";
import {IClient} from "@/features/clients/types";
import {DataTableColumnHeader} from "@/components/common/table/data-table-column-header";
import {Button} from "@/components/ui/button";
import {ArrowRight, ArrowRightCircle, Trash2, X} from "lucide-react";
import {useRouter} from "next/navigation";
import Link from "next/link";


export const clientColumns: ColumnDef<IClient>[] = [

    {
        accessorFn: row => ` ${row.firstName} ${row.lastName}`,
        accessorKey: "name",
        meta: "Имя",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Имя"/>
        ),
        cell: ({row}) => <div className="w-auto "> {row.getValue("name")}</div>,
        enableSorting: false
    },

    {
        accessorKey: "email",
        meta: "Email",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Email"/>
        ),
        cell: ({row}) => <div className=""> {row.getValue("email")}</div>,
        enableSorting: false


    },
    {
        accessorKey: "phone",
        accessorFn: row => ` ${row.phone}`,
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Телефон"/>
        ),
        cell: ({row}) => <div className={''}>
            <span>{row.original.phone}</span>
        </div>,
        enableSorting: false,
        enableHiding: true,
    },
    {
        id: "actions",
        cell: ({row}) => {
            const clientId = row?.original?.id
            return (
                // <ClientsTableRowActions row={row} clientId={clientId}/>
                <div className={'flex gap-2 py-0'}>
                    <Button size={'icon'} variant={'secondary'} className={'w-full p-0'} asChild>
                        <Link href={`/clients/${clientId}`}>
                            <ArrowRightCircle/>
                        </Link>
                    </Button>
                    <Button size={'icon'} variant={'ghost'} className={'p-0'} disabled><Trash2/></Button>
                </div>
            )
        },
    },
]