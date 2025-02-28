'use client'

import {getCoreRowModel, getPaginationRowModel, useReactTable} from "@tanstack/react-table";
import React, {useMemo, useState} from "react";
import {inventoryDocumentColumns} from "@/features/inventory-documents/components/table/columns";
import DataTable from "@/components/common/table/data-table";
import {useAllInventoryDocuments} from "@/features/inventory-documents/api/queries";
import LoaderSectionAnimated from "@/components/ui/LoaderSectionAnimated";
import {useSearchParams} from "next/navigation";
// import InventoryDocumentsSearchBox from "@/features/inventory-documents/components/table/InventoryDocumentsSearchBox";

const InventoryDocumentsDataTable = () => {
    const columns = useMemo(() => inventoryDocumentColumns, []);
    const searchParams = useSearchParams();
    const searchTerm = searchParams.get('search');

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 20
    });

    const { data, isLoading, isFetching } = useAllInventoryDocuments({
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
        pageCount: data?.meta.totalPages || -1,
        manualPagination: true,
        state: {
            pagination
        },
    });

    if (isLoading) return <LoaderSectionAnimated className="rounded p-10" />;
    if (!data) return <div className="p-4">Данные недоступны</div>;

    return (
        <div>
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

export default InventoryDocumentsDataTable;