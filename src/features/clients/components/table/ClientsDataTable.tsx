'use client'

import {getCoreRowModel, getPaginationRowModel, useReactTable} from "@tanstack/react-table";
import React, {useMemo, useState} from "react";
import {clientColumns} from "@/features/clients/components/table/columns";
import DataTable from "@/components/common/table/data-table";
import {useClientsList} from "@/features/clients/api/queries";
import LoaderSectionAnimated from "@/components/ui/LoaderSectionAnimated";
import {useSearchParams} from "next/navigation";
import {LoaderIcon} from "lucide-react";
import ClientsSearchBox from "@/features/clients/components/table/ClientsSearchBox";
import LoaderAnimated from "@/components/ui/LoaderAnimated";


const ClientsDataTable = () => {


    const columns = useMemo(() => clientColumns, []);
    const searchParams = useSearchParams();
    const searchTerm = searchParams.get('search');
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 20
    });

    const {data, isLoading, isFetching} = useClientsList({
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
                <ClientsSearchBox searchParams={searchParams}/>
                {isFetching && <LoaderAnimated/>}
            </div>

            <DataTable
                columns={columns}
                table={table}
                totalCount={data.meta.total} // Используем общее количество из метаданных
            />
        </div>
    );
};

export default ClientsDataTable;
