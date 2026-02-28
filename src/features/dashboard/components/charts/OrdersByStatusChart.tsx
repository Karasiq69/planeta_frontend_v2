'use client'

import { Cell, Label, Pie, PieChart } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from '@/components/ui/chart'
import { Skeleton } from '@/components/ui/skeleton'

import type { OrdersByStatusResponse } from '@/features/dashboard/types'

interface OrdersByStatusChartProps {
	data?: OrdersByStatusResponse
	isLoading: boolean
}

const STATUS_COLORS: Record<string, string> = {
	APPLICATION: 'hsl(200, 80%, 60%)',
	ORDER: 'hsl(220, 80%, 50%)',
	IN_PROGRESS: 'hsl(142, 70%, 45%)',
	WAITING_WAREHOUSE: 'hsl(30, 90%, 55%)',
	WAITING_PAYMENT: 'hsl(0, 80%, 55%)',
	COMPLETED: 'hsl(270, 60%, 55%)',
	CANCELLED: 'hsl(0, 0%, 60%)',
}

const STATUS_LABELS: Record<string, string> = {
	APPLICATION: 'Заявка',
	ORDER: 'Заказ',
	IN_PROGRESS: 'В работе',
	WAITING_WAREHOUSE: 'Ожидание склада',
	WAITING_PAYMENT: 'Ожидание оплаты',
	COMPLETED: 'Завершён',
	CANCELLED: 'Отменён',
}

export function OrdersByStatusChart({ data, isLoading }: OrdersByStatusChartProps) {
	const chartConfig = (data?.statuses ?? []).reduce<ChartConfig>((acc, s) => {
		acc[s.status] = {
			label: STATUS_LABELS[s.status] ?? s.status,
			color: STATUS_COLORS[s.status] ?? 'hsl(0, 0%, 50%)',
		}
		return acc
	}, {})

	const chartData = (data?.statuses ?? []).map((s) => ({
		name: s.status,
		value: s.count,
		fill: STATUS_COLORS[s.status] ?? 'hsl(0, 0%, 50%)',
	}))

	return (
		<Card>
			<CardHeader>
				<CardTitle>Заказы по статусам</CardTitle>
			</CardHeader>
			<CardContent>
				{isLoading ? (
					<Skeleton className='h-[300px] w-full' />
				) : (
					<ChartContainer config={chartConfig} className='h-[300px] w-full'>
						<PieChart>
							<ChartTooltip content={<ChartTooltipContent nameKey='name' />} />
							<Pie
								data={chartData}
								dataKey='value'
								nameKey='name'
								innerRadius={60}
								outerRadius={90}
								strokeWidth={2}
							>
								{chartData.map((entry) => (
									<Cell key={entry.name} fill={entry.fill} />
								))}
								<Label
									content={({ viewBox }) => {
										if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
											return (
												<text
													x={viewBox.cx}
													y={viewBox.cy}
													textAnchor='middle'
													dominantBaseline='middle'
												>
													<tspan
														x={viewBox.cx}
														y={viewBox.cy}
														className='fill-foreground text-3xl font-bold'
													>
														{data?.total ?? 0}
													</tspan>
													<tspan
														x={viewBox.cx}
														y={(viewBox.cy ?? 0) + 24}
														className='fill-muted-foreground text-sm'
													>
														Заказов
													</tspan>
												</text>
											)
										}
									}}
								/>
							</Pie>
							<ChartLegend content={<ChartLegendContent nameKey='name' />} />
						</PieChart>
					</ChartContainer>
				)}
			</CardContent>
		</Card>
	)
}
