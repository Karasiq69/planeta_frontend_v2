'use client'

import {
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { AlertTriangle } from 'lucide-react'

import DataTable from '@/components/common/table/data-table'
import { DataTableColumnHeader } from '@/components/common/table/data-table-column-header'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import type { LowStockItem } from '@/features/dashboard/types'
import type { ListResponse } from '@/types/params'
import type { ColumnDef } from '@tanstack/react-table'

interface LowStockTableProps {
	data?: ListResponse<LowStockItem>
	isLoading: boolean
	page: number
	pageSize: number
	onPageChange: (page: number) => void
	onPageSizeChange: (size: number) => void
}

const columns: ColumnDef<LowStockItem>[] = [
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
		accessorKey: 'currentQuantity',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Остаток' />,
		cell: ({ row }) => {
			const qty = row.original.currentQuantity
			const variant = qty === 0 ? 'destructive' as const : 'warning' as const
			return <Badge variant={variant}>{qty}</Badge>
		},
		enableSorting: false,
	},
	{
		accessorKey: 'minimumQuantity',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Минимум' />,
		cell: ({ row }) => <span className='tabular-nums'>{row.original.minimumQuantity}</span>,
		enableSorting: false,
	},
	{
		accessorKey: 'warehouseName',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Склад' />,
		enableSorting: false,
	},
]

export function LowStockTable({ data, isLoading, page, pageSize, onPageChange, onPageSizeChange }: LowStockTableProps) {
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
			<CardHeader className='flex-row items-center gap-2'>
				<AlertTriangle className='h-5 w-5 text-yellow-500' />
				<CardTitle>Критические остатки</CardTitle>
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
