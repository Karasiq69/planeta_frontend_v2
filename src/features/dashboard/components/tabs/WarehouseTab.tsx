'use client'

import { useState } from 'react'

import {
	useWarehousePending,
	useLowStock,
	useRecentReceipts,
	useReservedItems,
} from '@/features/dashboard/api/queries'
import { WarehousePendingTable } from '@/features/dashboard/components/tables/WarehousePendingTable'
import { LowStockTable } from '@/features/dashboard/components/tables/LowStockTable'
import { RecentReceiptsTable } from '@/features/dashboard/components/tables/RecentReceiptsTable'
import { ReservedItemsTable } from '@/features/dashboard/components/tables/ReservedItemsTable'

interface WarehouseTabProps {
	warehouseId?: number
}

export function WarehouseTab({ warehouseId }: WarehouseTabProps) {
	const [pendingPage, setPendingPage] = useState(1)
	const [pendingPageSize, setPendingPageSize] = useState(10)
	const [lowStockPage, setLowStockPage] = useState(1)
	const [lowStockPageSize, setLowStockPageSize] = useState(10)
	const [receiptsPage, setReceiptsPage] = useState(1)
	const [receiptsPageSize, setReceiptsPageSize] = useState(10)
	const [reservedPage, setReservedPage] = useState(1)
	const [reservedPageSize, setReservedPageSize] = useState(10)

	const pending = useWarehousePending({ page: pendingPage, pageSize: pendingPageSize })
	const lowStock = useLowStock({ warehouseId, page: lowStockPage, pageSize: lowStockPageSize })
	const receipts = useRecentReceipts({ page: receiptsPage, pageSize: receiptsPageSize })
	const reserved = useReservedItems({ warehouseId, page: reservedPage, pageSize: reservedPageSize })

	return (
		<div className='space-y-6'>
			{/* Warehouse Pending - full width */}
			<WarehousePendingTable
				data={pending.data}
				isLoading={pending.isLoading}
				page={pendingPage}
				pageSize={pendingPageSize}
				onPageChange={setPendingPage}
				onPageSizeChange={setPendingPageSize}
			/>

			{/* Low Stock (50%) + Recent Receipts (50%) */}
			<div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
				<LowStockTable
					data={lowStock.data}
					isLoading={lowStock.isLoading}
					page={lowStockPage}
					pageSize={lowStockPageSize}
					onPageChange={setLowStockPage}
					onPageSizeChange={setLowStockPageSize}
				/>
				<RecentReceiptsTable
					data={receipts.data}
					isLoading={receipts.isLoading}
					page={receiptsPage}
					pageSize={receiptsPageSize}
					onPageChange={setReceiptsPage}
					onPageSizeChange={setReceiptsPageSize}
				/>
			</div>

			{/* Reserved Items - full width */}
			<ReservedItemsTable
				data={reserved.data}
				isLoading={reserved.isLoading}
				page={reservedPage}
				pageSize={reservedPageSize}
				onPageChange={setReservedPage}
				onPageSizeChange={setReservedPageSize}
			/>
		</div>
	)
}
