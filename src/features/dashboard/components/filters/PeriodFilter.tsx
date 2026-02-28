'use client'

import { DateRangePicker } from '@/components/ui/date-range-picker'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

import type { DashboardPeriod } from '@/features/dashboard/types'
import type { DateRange } from 'react-day-picker'

interface PeriodFilterProps {
	period: DashboardPeriod
	onPeriodChange: (period: DashboardPeriod) => void
	dateRange?: DateRange
	onDateRangeChange: (range: DateRange | undefined) => void
}

const PERIOD_OPTIONS: { value: DashboardPeriod; label: string }[] = [
	{ value: 'today', label: 'Сегодня' },
	{ value: 'week', label: 'Неделя' },
	{ value: 'month', label: 'Месяц' },
	{ value: 'custom', label: 'Период' },
]

export function PeriodFilter({ period, onPeriodChange, dateRange, onDateRangeChange }: PeriodFilterProps) {
	return (
		<div className='flex items-center gap-2'>
			<ToggleGroup
				type='single'
				value={period}
				onValueChange={(val) => {
					if (val) onPeriodChange(val as DashboardPeriod)
				}}
				variant='outline'
				size='sm'
			>
				{PERIOD_OPTIONS.map((opt) => (
					<ToggleGroupItem key={opt.value} value={opt.value}>
						{opt.label}
					</ToggleGroupItem>
				))}
			</ToggleGroup>
			{period === 'custom' && (
				<DateRangePicker value={dateRange} onChange={onDateRangeChange} />
			)}
		</div>
	)
}
