'use client'

import {
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'
import Link from 'next/link'

import DataTable from '@/components/common/table/data-table'
import { DataTableColumnHeader } from '@/components/common/table/data-table-column-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import type { ReservedItem, ReservedItemsResponse } from '@/features/dashboard/types'
import type { ColumnDef } from '@tanstack/react-table'

interface ReservedItemsTableProps {
	data?: ReservedItemsResponse
	isLoading: boolean
	page: number
	pageSize: number
	onPageChange: (page: number) => void
	onPageSizeChange: (size: number) => void
}

const columns: ColumnDef<ReservedItem>[] = [
	{
		accessorKey: 'productName',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Позиция' />,
		enableSorting: false,
	},
	{
		accessorKey: 'sku',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Артикул' />,
		cell: ({ row }) => <span className='text-muted-foreground'>{row.original.sku ?? '—'}</span>,
		enableSorting: false,
	},
	{
		accessorKey: 'reservedQuantity',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Зарезервировано' />,
		cell: ({ row }) => <span className='tabular-nums font-medium'>{row.original.reservedQuantity}</span>,
		enableSorting: false,
	},
	{
		accessorKey: 'availableQuantity',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Доступно' />,
		cell: ({ row }) => <span className='tabular-nums'>{row.original.availableQuantity}</span>,
		enableSorting: false,
	},
	{
		accessorKey: 'orderId',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Заказ' />,
		cell: ({ row }) => (
			<Link href={`/orders/${row.original.orderId}`} className='font-medium text-primary hover:underline'>
				#{row.original.orderId}
			</Link>
		),
		enableSorting: false,
	},
]

export function ReservedItemsTable({ data, isLoading, page, pageSize, onPageChange, onPageSizeChange }: ReservedItemsTableProps) {
	const table = useReactTable({
		data: data?.data ?? [],
		columns,
		getCoreRowModel: getCoreRowModel(),
		manualPagination: true,
		pageCount: data?.meta.totalPages ?? 0,
		state: {
			pagination: { pageIndex: page - 1, pageSize },
		},
		onPaginationChange: (updater) => {
			const newPagination = typeof updater === 'function'
				? updater({ pageIndex: page - 1, pageSize })
				: updater
			onPageChange(newPagination.pageIndex + 1)
			onPageSizeChange(newPagination.pageSize)
		},
	})

	return (
		<Card>
			<CardHeader className='flex-row items-center justify-between'>
				<CardTitle>Зарезервированные товары</CardTitle>
				{data && (
					<span className='text-sm text-muted-foreground'>
						{data.totalReserved} ед.
					</span>
				)}
			</CardHeader>
			<CardContent className='p-0'>
				{isLoading ? (
					<div className='p-4'>
						<Skeleton className='h-[200px] w-full' />
					</div>
				) : (
					<DataTable table={table} columns={columns} totalCount={data?.meta.total} />
				)}
			</CardContent>
		</Card>
	)
}
