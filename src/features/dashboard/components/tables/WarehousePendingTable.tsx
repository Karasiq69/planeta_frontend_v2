'use client'

import {
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'
import Link from 'next/link'

import DataTable from '@/components/common/table/data-table'
import { DataTableColumnHeader } from '@/components/common/table/data-table-column-header'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import type { WarehousePendingItem } from '@/features/dashboard/types'
import type { ListResponse } from '@/types/params'
import type { ColumnDef } from '@tanstack/react-table'

interface WarehousePendingTableProps {
	data?: ListResponse<WarehousePendingItem>
	isLoading: boolean
	page: number
	pageSize: number
	onPageChange: (page: number) => void
	onPageSizeChange: (size: number) => void
}

const columns: ColumnDef<WarehousePendingItem>[] = [
	{
		accessorKey: 'orderId',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Заказ' />,
		cell: ({ row }) => (
			<Link href={`/orders/${row.original.orderId}`} className='font-medium text-primary hover:underline'>
				#{row.original.orderId}
			</Link>
		),
		enableSorting: false,
		size: 80,
	},
	{
		accessorKey: 'clientName',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Клиент' />,
		enableSorting: false,
	},
	{
		accessorKey: 'vehicleName',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Авто' />,
		enableSorting: false,
	},
	{
		accessorKey: 'products',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Запчасти' />,
		cell: ({ row }) => (
			<div className='flex flex-wrap gap-1'>
				{row.original.products.map((p, i) => (
					<Badge key={i} variant='secondary' className='text-xs'>
						{p.name} ×{p.quantity}
					</Badge>
				))}
			</div>
		),
		enableSorting: false,
	},
	{
		accessorKey: 'mechanicName',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Механик' />,
		enableSorting: false,
	},
]

export function WarehousePendingTable({ data, isLoading, page, pageSize, onPageChange, onPageSizeChange }: WarehousePendingTableProps) {
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
				<CardTitle>Заказы ожидающие склад</CardTitle>
				{data && (
					<Badge variant='secondary' className='text-sm'>
						{data.meta.total}
					</Badge>
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
