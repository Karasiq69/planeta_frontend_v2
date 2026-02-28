'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

import type { MechanicLoadItem } from '@/features/dashboard/types'

interface MechanicLoadChartProps {
	data?: MechanicLoadItem[]
	isLoading: boolean
}

function getLoadColor(percent: number): string {
	if (percent > 80) return 'text-rose-400'
	if (percent >= 50) return 'text-amber-400'
	return 'text-emerald-400'
}

function getProgressClass(percent: number): string {
	if (percent > 80) return '[&>div]:bg-rose-400'
	if (percent >= 50) return '[&>div]:bg-amber-400'
	return '[&>div]:bg-emerald-400'
}

export function MechanicLoadChart({ data, isLoading }: MechanicLoadChartProps) {
	return (
		<Card>
			<CardHeader className='pb-3'>
				<CardTitle>Загрузка механиков</CardTitle>
			</CardHeader>
			<CardContent className='space-y-2.5'>
				{isLoading ? (
					Array.from({ length: 4 }).map((_, i) => (
						<div key={i} className='space-y-1'>
							<Skeleton className='h-3.5 w-32' />
							<Skeleton className='h-2 w-full' />
						</div>
					))
				) : (
					data?.map((mechanic) => {
						const percent = mechanic.maxLoad > 0
							? Math.round((mechanic.activeOrders / mechanic.maxLoad) * 100)
							: 0
						return (
							<div key={mechanic.id} className='space-y-0.5'>
								<div className='flex items-center justify-between text-xs'>
									<span className='text-muted-foreground'>{mechanic.name}</span>
									<span className={cn('font-medium tabular-nums', getLoadColor(percent))}>
										{mechanic.activeOrders} / {mechanic.maxLoad}
									</span>
								</div>
								<Progress
									value={percent}
									className={cn('h-1.5', getProgressClass(percent))}
								/>
							</div>
						)
					})
				)}
			</CardContent>
		</Card>
	)
}
