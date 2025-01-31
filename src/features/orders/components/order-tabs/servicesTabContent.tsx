import React, {useMemo} from "react";
import {useParams} from "next/navigation";
import {useOrderById} from "@/features/orders/api/queries";
import {getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {ServicesColumnDefs} from "@/features/orders/components/tables/order-services/columns";
import DataTableBasic from "@/components/common/table/data-table-basic";

type Props = {};
const ServicesTabContent = (props: Props) => {
    const {id} = useParams()
    const {data} = useOrderById(+id)
    const services = data?.services || []
    const columns = useMemo(() => ServicesColumnDefs, [])

    const table = useReactTable({
        data: services,
        columns:columns,
        getCoreRowModel: getCoreRowModel(),
    })

    if (!data) return 'no data'

    return (
        <DataTableBasic table={table} columns={columns}/>
    );
};
export default ServicesTabContent;
