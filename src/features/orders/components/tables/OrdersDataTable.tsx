'use client'

import {getCoreRowModel, getPaginationRowModel, useReactTable} from "@tanstack/react-table";
import React, {useMemo, useState} from "react";
import DataTable from "@/components/common/table/data-table";
import LoaderSectionAnimated from "@/components/ui/LoaderSectionAnimated";
import {useSearchParams} from "next/navigation";
import LoaderAnimated from "@/components/ui/LoaderAnimated";
import {useOrdersList} from "@/features/orders/api/queries";
import {OrdersColumnDefs} from "@/features/orders/components/tables/columns";
import OrdersSearchBox from "@/features/orders/components/tables/OrdersSearchBox";


const ClientsDataTable = () => {


    const columns = useMemo(() => OrdersColumnDefs, []);
    const searchParams = useSearchParams();
    const searchTerm = searchParams.get('search');
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    });

    const {data, isLoading, isFetching} = useOrdersList({
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        searchTerm: searchTerm || undefined,
    });

    const table = useReactTable({
        data: data?.data || [],
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        pageCount: data?.meta.totalPages || -1, // Добавляем информацию о количестве страниц
        manualPagination: true, // Включаем ручную пагинацию
        state: {
            pagination
        },
    });

    if (isLoading) return <LoaderSectionAnimated className={'rounded p-10'}/>;
    if (!data) return <div className="p-4">No data available</div>;

    return (
        <div className={''}>
            <div className={'flex gap-3'}>
                <OrdersSearchBox searchParams={searchParams}/>
                {isFetching && <LoaderAnimated/>}
            </div>

            <DataTable
                columns={columns}
                table={table}
                totalCount={data.meta.total}
            />
        </div>
    );
};

export default ClientsDataTable;
