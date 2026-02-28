'use client'

import { useGetWarehouses } from '@/features/warehouse/api/queries'
import { useAllMechanics } from '@/features/mechanics/api/queries'
import type { Warehouse } from '@/features/warehouse/types/warehouse'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { PeriodFilter } from './PeriodFilter'

import type { DashboardPeriod } from '@/features/dashboard/types'
import type { DateRange } from 'react-day-picker'

interface DashboardFiltersProps {
	period: DashboardPeriod
	onPeriodChange: (period: DashboardPeriod) => void
	dateRange?: DateRange
	onDateRangeChange: (range: DateRange | undefined) => void
	warehouseId?: string
	onWarehouseChange: (id: string) => void
	mechanicId?: string
	onMechanicChange: (id: string) => void
	showMechanic?: boolean
	showWarehouse?: boolean
}

export function DashboardFilters({
	period,
	onPeriodChange,
	dateRange,
	onDateRangeChange,
	warehouseId,
	onWarehouseChange,
	mechanicId,
	onMechanicChange,
	showMechanic = true,
	showWarehouse = true,
}: DashboardFiltersProps) {
	const { data: warehouses } = useGetWarehouses() as { data: Warehouse[] | undefined }
	const { data: mechanics } = useAllMechanics()

	return (
		<div className='flex flex-wrap items-center gap-3'>
			<PeriodFilter
				period={period}
				onPeriodChange={onPeriodChange}
				dateRange={dateRange}
				onDateRangeChange={onDateRangeChange}
			/>
			{showWarehouse && (
				<Select value={warehouseId ?? 'all'} onValueChange={onWarehouseChange}>
					<SelectTrigger className='w-[180px]'>
						<SelectValue placeholder='Склад' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='all'>Все склады</SelectItem>
						{warehouses?.map((w) => (
							<SelectItem key={w.id} value={String(w.id)}>
								{w.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			)}
			{showMechanic && (
				<Select value={mechanicId ?? 'all'} onValueChange={onMechanicChange}>
					<SelectTrigger className='w-[180px]'>
						<SelectValue placeholder='Механик' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='all'>Все механики</SelectItem>
						{mechanics?.map((m) => (
							<SelectItem key={m.id} value={String(m.id)}>
								{m.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			)}
		</div>
	)
}
