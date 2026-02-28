'use client'

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from '@/components/ui/chart'
import { Skeleton } from '@/components/ui/skeleton'

import type { RevenueResponse } from '@/features/dashboard/types'

interface RevenueChartProps {
	data?: RevenueResponse
	isLoading: boolean
}

const chartConfig = {
	current: {
		label: 'Текущий период',
		color: 'hsl(var(--chart-1))',
	},
	previous: {
		label: 'Предыдущий период',
		color: 'hsl(var(--chart-2))',
	},
} satisfies ChartConfig

export function RevenueChart({ data, isLoading }: RevenueChartProps) {
	const chartData = data?.current.map((point, i) => ({
		date: point.date,
		current: point.amount,
		previous: data.previous[i]?.amount ?? 0,
	})) ?? []

	return (
		<Card>
			<CardHeader>
				<CardTitle>Выручка по дням</CardTitle>
			</CardHeader>
			<CardContent>
				{isLoading ? (
					<Skeleton className='h-[300px] w-full' />
				) : (
					<ChartContainer config={chartConfig} className='h-[300px] w-full'>
						<AreaChart data={chartData} accessibilityLayer>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey='date'
								tickLine={false}
								axisLine={false}
								tickFormatter={(val) => {
									try {
										return format(parseISO(val), 'dd MMM', { locale: ru })
									} catch {
										return val
									}
								}}
							/>
							<YAxis tickLine={false} axisLine={false} />
							<ChartTooltip content={<ChartTooltipContent />} />
							<Area
								dataKey='previous'
								type='monotone'
								fill='var(--color-previous)'
								fillOpacity={0.1}
								stroke='var(--color-previous)'
								strokeDasharray='5 5'
							/>
							<Area
								dataKey='current'
								type='monotone'
								fill='var(--color-current)'
								fillOpacity={0.2}
								stroke='var(--color-current)'
							/>
						</AreaChart>
					</ChartContainer>
				)}
			</CardContent>
		</Card>
	)
}
