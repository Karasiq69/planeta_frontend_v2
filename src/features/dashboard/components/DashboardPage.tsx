'use client'

import { useState } from 'react'
import { format } from 'date-fns'

import PageHeader from '@/components/common/PageHeader'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DashboardFilters } from './filters/DashboardFilters'
import { ManagerTab } from './tabs/ManagerTab'
import { WarehouseTab } from './tabs/WarehouseTab'
import { MechanicTab } from './tabs/MechanicTab'

import type { DashboardPeriod, DashboardPeriodParams } from '@/features/dashboard/types'
import type { DateRange } from 'react-day-picker'

export function DashboardPage() {
	const [activeTab, setActiveTab] = useState('manager')
	const [period, setPeriod] = useState<DashboardPeriod>('today')
	const [dateRange, setDateRange] = useState<DateRange | undefined>()
	const [warehouseId, setWarehouseId] = useState<string>('all')
	const [mechanicId, setMechanicId] = useState<string>('all')

	const periodParams: DashboardPeriodParams = {
		period,
		...(period === 'custom' && dateRange?.from && {
			dateFrom: format(dateRange.from, 'yyyy-MM-dd'),
		}),
		...(period === 'custom' && dateRange?.to && {
			dateTo: format(dateRange.to, 'yyyy-MM-dd'),
		}),
	}

	const parsedWarehouseId = warehouseId !== 'all' ? Number(warehouseId) : undefined

	return (
		<div className='flex flex-col gap-6 p-6'>
			<PageHeader title='Дашборд' />

			<Tabs value={activeTab} onValueChange={setActiveTab}>
				<div className='flex flex-wrap items-center justify-between gap-4'>
					<TabsList>
						<TabsTrigger value='manager'>Управляющий</TabsTrigger>
						<TabsTrigger value='warehouse'>Склад</TabsTrigger>
						<TabsTrigger value='mechanic'>Механик</TabsTrigger>
					</TabsList>

					{activeTab !== 'mechanic' && (
						<DashboardFilters
							period={period}
							onPeriodChange={setPeriod}
							dateRange={dateRange}
							onDateRangeChange={setDateRange}
							warehouseId={warehouseId}
							onWarehouseChange={setWarehouseId}
							mechanicId={mechanicId}
							onMechanicChange={setMechanicId}
							showMechanic={activeTab === 'manager'}
							showWarehouse={true}
						/>
					)}
				</div>

				<TabsContent value='manager' className='mt-6'>
					<ManagerTab periodParams={periodParams} warehouseId={parsedWarehouseId} />
				</TabsContent>

				<TabsContent value='warehouse' className='mt-6'>
					<WarehouseTab warehouseId={parsedWarehouseId} />
				</TabsContent>

				<TabsContent value='mechanic' className='mt-6'>
					<MechanicTab />
				</TabsContent>
			</Tabs>
		</div>
	)
}
