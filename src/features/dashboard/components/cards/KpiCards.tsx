'use client'

import { DollarSign, ShoppingCart, Receipt, Wrench, TrendingUpIcon, TrendingDownIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { formatPrice, cn } from '@/lib/utils'

import type { KpiSummaryResponse } from '@/features/dashboard/types'

interface KpiCardsProps {
	data?: KpiSummaryResponse
	isLoading: boolean
}

const KPI_CONFIG = [
	{ key: 'revenue' as const, label: 'Выручка', icon: DollarSign, format: formatPrice },
	{ key: 'orders' as const, label: 'Заказы', icon: ShoppingCart, format: (v: number) => String(v) },
	{ key: 'averageCheck' as const, label: 'Средний чек', icon: Receipt, format: formatPrice },
	{ key: 'mechanicLoad' as const, label: 'Загрузка механиков', icon: Wrench, format: (v: number) => `${v}%` },
]

export function KpiCards({ data, isLoading }: KpiCardsProps) {
	if (isLoading) {
		return (
			<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
				{Array.from({ length: 4 }).map((_, i) => (
					<Card key={i}>
						<CardHeader>
							<Skeleton className='h-4 w-24' />
							<Skeleton className='h-8 w-32 mt-2' />
						</CardHeader>
					</Card>
				))}
			</div>
		)
	}

	return (
		<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
			{KPI_CONFIG.map(({ key, label, icon: Icon, format }) => {
				const metric = data?.[key]
				const isPositive = (metric?.changePercent ?? 0) >= 0

				return (
					<Card key={key}>
						<CardHeader className='relative'>
							<CardDescription className='flex items-center gap-2'>
								<Icon className='h-4 w-4' />
								{label}
							</CardDescription>
							<CardTitle className='text-2xl font-semibold tabular-nums'>
								{metric ? format(metric.value) : '—'}
							</CardTitle>
							{metric && (
								<div className='absolute right-4 top-4'>
									<Badge
										variant='outline'
										className={cn(
											'flex gap-1 rounded-lg text-xs',
											isPositive ? 'text-green-600 border-green-200' : 'text-red-600 border-red-200'
										)}
									>
										{isPositive ? (
											<TrendingUpIcon className='size-3' />
										) : (
											<TrendingDownIcon className='size-3' />
										)}
										{isPositive ? '+' : ''}{metric.changePercent}%
									</Badge>
								</div>
							)}
						</CardHeader>
					</Card>
				)
			})}
		</div>
	)
}
