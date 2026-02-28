'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { formatPrice } from '@/lib/utils'

import type { TopServiceItem } from '@/features/dashboard/types'

interface TopServicesTableProps {
	data?: TopServiceItem[]
	isLoading: boolean
}

export function TopServicesTable({ data, isLoading }: TopServicesTableProps) {
	const maxCount = Math.max(...(data?.map((s) => s.count) ?? [1]))

	return (
		<Card>
			<CardHeader>
				<CardTitle>Топ услуг</CardTitle>
			</CardHeader>
			<CardContent>
				{isLoading ? (
					<Skeleton className='h-[200px] w-full' />
				) : (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Услуга</TableHead>
								<TableHead className='w-[80px] text-right'>Кол-во</TableHead>
								<TableHead className='w-[120px] text-right'>Выручка</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.map((service) => (
								<TableRow key={service.serviceId}>
									<TableCell>
										<div className='space-y-1'>
											<span className='text-sm'>{service.name}</span>
											<Progress
												value={(service.count / maxCount) * 100}
												className='h-1.5'
											/>
										</div>
									</TableCell>
									<TableCell className='text-right tabular-nums'>{service.count}</TableCell>
									<TableCell className='text-right tabular-nums'>
										{formatPrice(service.revenue)}
									</TableCell>
								</TableRow>
							))}
							{!data?.length && (
								<TableRow>
									<TableCell colSpan={3} className='h-24 text-center'>
										Нет данных
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				)}
			</CardContent>
		</Card>
	)
}
