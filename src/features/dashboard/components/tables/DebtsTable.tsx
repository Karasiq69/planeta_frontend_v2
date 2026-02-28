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
import { formatPrice } from '@/lib/utils'

import type { DebtItem, DebtsResponse } from '@/features/dashboard/types'
import type { ColumnDef } from '@tanstack/react-table'

interface DebtsTableProps {
	data?: DebtsResponse
	isLoading: boolean
	page: number
	pageSize: number
	onPageChange: (page: number) => void
	onPageSizeChange: (size: number) => void
}

function getDueBadgeVariant(days: number) {
	if (days > 14) return 'destructive' as const
	if (days >= 7) return 'warning' as const
	return 'outline' as const
}

const columns: ColumnDef<DebtItem>[] = [
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
		accessorKey: 'amount',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Сумма' />,
		cell: ({ row }) => <span className='tabular-nums'>{formatPrice(row.original.amount)}</span>,
		enableSorting: false,
	},
	{
		accessorKey: 'daysPastDue',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Просрочка' />,
		cell: ({ row }) => (
			<Badge variant={getDueBadgeVariant(row.original.daysPastDue)}>
				{row.original.daysPastDue} дн.
			</Badge>
		),
		enableSorting: false,
	},
]

export function DebtsTable({ data, isLoading, page, pageSize, onPageChange, onPageSizeChange }: DebtsTableProps) {
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
				<CardTitle>Задолженности</CardTitle>
				{data && (
					<span className='text-xl font-semibold text-destructive tabular-nums'>
						{formatPrice(data.totalDebt)}
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
