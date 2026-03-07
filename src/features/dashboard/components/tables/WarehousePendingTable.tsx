'use client'

import {
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'

import DataTable from '@/components/common/table/data-table'
import { DataTableColumnHeader } from '@/components/common/table/data-table-column-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import type { WarehousePendingItem, WarehousePendingProduct } from '@/features/dashboard/types'
import type { ListResponse } from '@/types/params'
import type { ColumnDef } from '@tanstack/react-table'

function ProductStockBadge({ product }: { product: WarehousePendingProduct }) {
	const stock = product.totalStock != null ? parseFloat(product.totalStock) : null

	if (stock === null || stock === 0) return <Badge variant='destructive' className='text-[10px] px-1 py-0'>0</Badge>
	return <Badge variant='secondary' className='text-[10px] px-1 py-0'>{stock}</Badge>
}

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
			<div className='flex items-center gap-1'>
				<span className='font-medium'>#{row.original.orderId}</span>
				<Button variant='ghost' size='icon' className='h-6 w-6' asChild>
					<Link href={`/orders/${row.original.orderId}`}>
						<ExternalLink size={14} />
					</Link>
				</Button>
			</div>
		),
		enableSorting: false,
		size: 100,
	},
	{
		accessorKey: 'clientName',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Клиент / Авто' />,
		cell: ({ row }) => (
			<div className='min-w-0'>
				<div className='font-medium truncate'>{row.original.clientName}</div>
				<div className='text-xs text-muted-foreground truncate'>{row.original.vehicleName}</div>
			</div>
		),
		enableSorting: false,
	},
	{
		accessorKey: 'products',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Запчасти' />,
		cell: ({ row }) => (
			<div className='space-y-0.5'>
				{row.original.products.map((p, i) => (
					<div key={i} className='flex items-center gap-2 text-xs'>
						<span className='truncate'>{p.name}</span>
						<Badge variant='outline' className='text-[10px] px-1 py-0 shrink-0'>
							×{p.quantity}
						</Badge>
						<ProductStockBadge product={p} />
					</div>
				))}
			</div>
		),
		enableSorting: false,
	},
	{
		accessorKey: 'mechanicName',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Механик' />,
		cell: ({ row }) => (
			<span className='text-sm text-muted-foreground'>{row.original.mechanicName}</span>
		),
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
