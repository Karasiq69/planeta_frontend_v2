'use client'

import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

import type { MechanicOrdersResponse } from '@/features/dashboard/types'

interface MechanicOrdersTableProps {
	data?: MechanicOrdersResponse
	isLoading: boolean
}

const STATUS_COLORS: Record<string, string> = {
	IN_PROGRESS: 'bg-green-100 text-green-800 border-green-200',
	WAITING_WAREHOUSE: 'bg-orange-100 text-orange-800 border-orange-200',
	WAITING_PAYMENT: 'bg-red-100 text-red-800 border-red-200',
	COMPLETED: 'bg-purple-100 text-purple-800 border-purple-200',
	APPLICATION: 'bg-blue-100 text-blue-800 border-blue-200',
	ORDER: 'bg-indigo-100 text-indigo-800 border-indigo-200',
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

export function MechanicOrdersTable({ data, isLoading }: MechanicOrdersTableProps) {
	return (
		<Card>
			<CardHeader className='flex-row items-center justify-between'>
				<CardTitle>Мои заказы</CardTitle>
				{data && (
					<Badge variant='secondary' className='text-sm'>
						{data.total}
					</Badge>
				)}
			</CardHeader>
			<CardContent>
				{isLoading ? (
					<Skeleton className='h-[200px] w-full' />
				) : (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Заказ</TableHead>
								<TableHead>Авто</TableHead>
								<TableHead>Услуга</TableHead>
								<TableHead>Статус</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.data.map((order) => (
								<TableRow key={order.orderId}>
									<TableCell>
										<Link
											href={`/orders/${order.orderId}`}
											className='font-medium text-primary hover:underline'
										>
											#{order.orderId}
										</Link>
									</TableCell>
									<TableCell>{order.vehicleName}</TableCell>
									<TableCell>{order.serviceName}</TableCell>
									<TableCell>
										<Badge
											variant='outline'
											className={STATUS_COLORS[order.status] ?? ''}
										>
											{STATUS_LABELS[order.status] ?? order.status}
										</Badge>
									</TableCell>
								</TableRow>
							))}
							{!data?.data.length && (
								<TableRow>
									<TableCell colSpan={4} className='h-24 text-center'>
										Нет активных заказов
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
