import React, {useMemo} from "react";
import {useParams} from "next/navigation";
import {getCoreRowModel, useReactTable} from "@tanstack/react-table";
import DataTableBasic from "@/components/common/table/data-table-basic";
import {OrderProductsColumnDefs} from "@/features/orders/components/tables/order-products/columns";
import {useOrderProductsByOrderId} from "@/features/order-products/api/queries";
import LoaderSectionAnimated from "@/components/ui/LoaderSectionAnimated";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import ServicesCombobox from "@/features/orders/components/order-tabs/order-services/ServicesCombobox";
import CreateOrderServiceButton from "@/features/orders/components/order-tabs/order-services/CreateOrderServiceButton";
import OrderProductsCombobox from "@/features/order-products/components/OrderProductsCombobox";

type Props = {};
const ProductsTabContent = (props: Props) => {
    const {id} = useParams()
    const orderId = Number(id)
    const {data, isLoading} = useOrderProductsByOrderId(orderId)
    const columns = useMemo(() => OrderProductsColumnDefs, [])

    const table = useReactTable({
        data: data || [],
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    })


    if (isLoading) return <LoaderSectionAnimated className={'bg-background'} text={'Загружаем...'}/>
    if (!data) return 'no data'

    return (
        <Card className={''}>
            <CardHeader
                className={'flex flex-row items-center space-y-0 justify-between     border-b rounded-lg rounded-b-none'}>
                <OrderProductsCombobox orderId={orderId}/>
                <CreateOrderServiceButton/>
            </CardHeader>
            <CardContent className={' space-y-3 shadow-inner p-0'}>
        <DataTableBasic table={table} columns={columns}/>
            </CardContent>
        </Card>
    );
};
export default ProductsTabContent;
