'use client'

import {
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'

import DataTable from '@/components/common/table/data-table'
import { DataTableColumnHeader } from '@/components/common/table/data-table-column-header'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { formatPrice } from '@/lib/utils'

import type { RecentReceiptItem, RecentReceiptsResponse } from '@/features/dashboard/types'
import type { ColumnDef } from '@tanstack/react-table'

interface RecentReceiptsTableProps {
	data?: RecentReceiptsResponse
	isLoading: boolean
	page: number
	pageSize: number
	onPageChange: (page: number) => void
	onPageSizeChange: (size: number) => void
}

const STATUS_MAP: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
	CONFIRMED: { label: 'Подтверждён', variant: 'default' },
	DRAFT: { label: 'Черновик', variant: 'secondary' },
	CANCELLED: { label: 'Отменён', variant: 'destructive' },
}

const columns: ColumnDef<RecentReceiptItem>[] = [
	{
		accessorKey: 'number',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Документ' />,
		cell: ({ row }) => <span className='font-medium'>{row.original.number}</span>,
		enableSorting: false,
	},
	{
		accessorKey: 'supplierName',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Поставщик' />,
		cell: ({ row }) => row.original.supplierName ?? '—',
		enableSorting: false,
	},
	{
		accessorKey: 'itemCount',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Позиций' />,
		cell: ({ row }) => <span className='tabular-nums'>{row.original.itemCount}</span>,
		enableSorting: false,
	},
	{
		accessorKey: 'totalAmount',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Сумма' />,
		cell: ({ row }) => <span className='tabular-nums'>{formatPrice(row.original.totalAmount)}</span>,
		enableSorting: false,
	},
	{
		accessorKey: 'date',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Дата' />,
		cell: ({ row }) => {
			try {
				return format(parseISO(row.original.date), 'dd.MM.yyyy', { locale: ru })
			} catch {
				return row.original.date
			}
		},
		enableSorting: false,
	},
	{
		accessorKey: 'status',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Статус' />,
		cell: ({ row }) => {
			const config = STATUS_MAP[row.original.status] ?? { label: row.original.status, variant: 'outline' as const }
			return <Badge variant={config.variant}>{config.label}</Badge>
		},
		enableSorting: false,
	},
]

export function RecentReceiptsTable({ data, isLoading, page, pageSize, onPageChange, onPageSizeChange }: RecentReceiptsTableProps) {
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
				<CardTitle>Последние поступления</CardTitle>
				{data && (
					<span className='text-xl font-semibold tabular-nums'>
						{formatPrice(data.totalAmount)}
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
