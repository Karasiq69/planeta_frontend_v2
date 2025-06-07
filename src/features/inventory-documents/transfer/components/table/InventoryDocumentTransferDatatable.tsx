'use client'

import {getCoreRowModel, getPaginationRowModel, useReactTable} from "@tanstack/react-table";
import React, {useMemo, useState} from "react";
import DataTable from "@/components/common/table/data-table";
import LoaderSectionAnimated from "@/components/ui/LoaderSectionAnimated";
import {useSearchParams} from "next/navigation";
import {useTransferDocuments} from "@/features/inventory-documents/transfer/api/queries";
import {inventoryDocumentTransferColumns} from "@/features/inventory-documents/transfer/components/table/columns";

const InventoryDocumentsTransferDatatable = () => {
    const columns = useMemo(() => inventoryDocumentTransferColumns, []);
    const searchParams = useSearchParams();
    const searchTerm = searchParams.get('search');

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 20
    });

    const {data, isLoading, isFetching} = useTransferDocuments({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        searchTerm: searchTerm || undefined,
    });

    const table = useReactTable({
        data: data?.data || [],
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        pageCount: data?.meta.totalPages || -1,
        manualPagination: true,
        state: {
            pagination
        },
    });

    if (isLoading) return <LoaderSectionAnimated className="rounded p-10"/>;
    if (!data) return <div className="p-4">Данные недоступны</div>;

    return (
        <div className="flex flex-col">
            {/*<div className="flex gap-3 mb-4">*/}
            {/*    <InventoryDocumentsSearchBox searchParams={searchParams} />*/}
            {/*    {isFetching && <LoaderAnimated />}*/}
            {/*</div>*/}

            <DataTable
                columns={columns}
                table={table}
                totalCount={data.meta.total}
            />
        </div>
    );
};

export default InventoryDocumentsTransferDatatable;