'use client'

import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState
} from "@tanstack/react-table";
import React, {useMemo} from "react";
import DataTable from "@/components/common/table/data-table";
import LoaderSectionAnimated from "@/components/ui/LoaderSectionAnimated";
import {useSearchParams} from "next/navigation";
import {useOrdersList} from "@/features/orders/api/queries";
import {OrdersColumnDefs} from "@/features/orders/components/tables/columns";
import {DataTableToolbar} from "@/components/tables/data-table-toolbar";
import {statuses} from "@/features/orders/lib/statuses";
import useLocalStorage from "@/hooks/use-local-storage";

// Получаем все значения статусов кроме "application"
const DEFAULT_STATUSES = statuses
    .filter(status => status.value !== "application")
    .map(status => status.value);

const OrdersDataTable = () => {
    // Используем useMemo для создания начальных значений
    const initialColumnFilters = useMemo<ColumnFiltersState>(() => {
        return [{
            id: 'status',
            value: DEFAULT_STATUSES
        }];
    }, []);

    // Используем улучшенный хук useLocalStorage
    const [columnFilters, setColumnFilters] = useLocalStorage<ColumnFiltersState>('ordersColumnFilters', initialColumnFilters);
    const [sorting, setSorting] = useLocalStorage<SortingState>('ordersSorting', []);
    const [rowSelection, setRowSelection] = useLocalStorage<Record<string, boolean>>('ordersRowSelection', {});
    const [columnVisibility, setColumnVisibility] = useLocalStorage<VisibilityState>('ordersColumnVisibility', {});

    // Для globalFilter не нужно сохранение в localStorage, используем обычный useState
    const [globalFilter, setGlobalFilter] = React.useState('');
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10
    });

    const columns = useMemo(() => OrdersColumnDefs, []);
    const searchParams = useSearchParams();
    const searchTerm = searchParams.get('search');

    // Меморизируем filters, чтобы избежать лишних ререндеров
    const filters = useMemo(() => {
        return columnFilters.reduce<Record<string, unknown>>((acc, filter) => {
            acc[filter.id] = filter.value;
            return acc;
        }, {});
    }, [columnFilters]);

    // Используем useOrdersList с меморизированными параметрами
    const queryParams = useMemo(() => ({
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        searchTerm: searchTerm || undefined,
        filters, // Передаем все фильтры включая статусы
    }), [pagination.pageIndex, pagination.pageSize, searchTerm, filters]);

    const { data, isLoading, isFetching } = useOrdersList(queryParams);

    // Создаем таблицу с правильными обработчиками
    const table = useReactTable({
        data: data?.data || [],
        columns: columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: (newFilters) => {
            setColumnFilters(newFilters);
            setPagination(prev => ({ ...prev, pageIndex: 0 }));
        },
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        pageCount: data?.meta.totalPages || -1,
        manualPagination: true,
        // Включаем ручную фильтрацию для колонки статуса
        // Это говорит TanStack Table, что фильтрация для статусов происходит на сервере
        manualFiltering: true,
        state: {
            sorting,
            globalFilter,
            columnVisibility,
            rowSelection,
            pagination,
            columnFilters,
        },
    });

    if (isLoading) return <LoaderSectionAnimated className={'rounded p-10'} />;
    if (!data) return <div className="p-4">No data available</div>;

    return (
        <section>
            <div className={'px-4 pt-5'}>
                <DataTableToolbar
                    table={table}
                    isLoading={isFetching}
                />
            </div>

            <DataTable
                columns={columns}
                table={table}
                totalCount={data.meta.total}
            />
        </section>
    );
};

export default OrdersDataTable;