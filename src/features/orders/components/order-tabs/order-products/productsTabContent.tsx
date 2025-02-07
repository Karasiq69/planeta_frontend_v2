import React, {useMemo} from "react";
import {useParams} from "next/navigation";
import {useOrderById} from "@/features/orders/api/queries";
import {getCoreRowModel, useReactTable} from "@tanstack/react-table";
import DataTableBasic from "@/components/common/table/data-table-basic";
import {OrderProductsColumnDefs} from "@/features/orders/components/tables/order-products/columns";

type Props = {};
const ProductsTabContent = (props: Props) => {
    const {id} = useParams()
    const {data} = useOrderById(+id)
    const products = data?.products || []
    const columns = useMemo(() => OrderProductsColumnDefs, [])

    const table = useReactTable({
        data: products,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    })

    if (!data) return 'no data'
    return (
        <DataTableBasic table={table} columns={columns}/>
    );
};
export default ProductsTabContent;
