// import {ColumnDef} from "@tanstack/react-table"
// import * as React from "react"
// import OrderTableActions from "@/features/orders/components/tables/OrderTableActions";
// import {Mechanic} from "@/features/mechanics/types";
//
// export const MechanicsColumnsDefs: ColumnDef<Mechanic>[] = [
//     {
//         accessorKey: "id",
//         header: () => <div>ID</div>
//     },
//     {
//         accessorKey: "name",
//         header: () => <span>Имя</span>
//     },
//     {
//         accessorKey: "specialization",
//         header: () => <span>Специализация</span>
//     },
//     {
//         accessorKey: "hourlyRate",
//         header: () => <span>Ставка в ч.</span>
//     },
//
//
//     {
//         id: "actions",
//         cell: ({row}) => {
//             const mechanicId = row?.original?.id
//             return (
//                 // <span>{mechanicId}</span>
//                 // <ClientsTableRowActions row={row} clientId={clientId}/>
//                 <OrderTableActions orderId={mechanicId}/>
//             )
//         },
//     },
// ]
