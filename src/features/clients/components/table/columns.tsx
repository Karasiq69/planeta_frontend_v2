import {ColumnDef} from "@tanstack/react-table";
import * as React from "react";
import {Checkbox} from "@/components/ui/checkbox";
import {IClient} from "@/features/clients/types";
import {DataTableColumnHeader} from "@/components/common/table/data-table-column-header";


export const clientColumns: ColumnDef<IClient>[] = [

    {
        accessorKey: "firstName",
        meta: "Имя",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Имя"/>
        ),
        cell: ({row}) => <div className="w-auto "> {row.getValue("firstName")}</div>,
        enableSorting: false
    },
    {
        accessorKey: "lastName",
        meta: "Фамилия",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Фамилия"/>
        ),
        cell: ({row}) => <div className="w-auto "> {row.getValue("lastName")}</div>,
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
                <div>{clientId}</div>
            )
        },
    },
]