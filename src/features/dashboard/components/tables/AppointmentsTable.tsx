'use client'

import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'

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

import type { AppointmentItem } from '@/features/dashboard/types'
import { statusOptions } from '@/features/orders/types/orders'

interface AppointmentsTableProps {
	data?: AppointmentItem[]
	isLoading: boolean
}

const STATUS_COLORS: Record<string, string> = {
	APPLICATION: 'bg-blue-100 text-blue-800 border-blue-200',
	ORDER: 'bg-indigo-100 text-indigo-800 border-indigo-200',
	IN_PROGRESS: 'bg-green-100 text-green-800 border-green-200',
	WAITING_WAREHOUSE: 'bg-orange-100 text-orange-800 border-orange-200',
	WAITING_PAYMENT: 'bg-red-100 text-red-800 border-red-200',
	COMPLETED: 'bg-purple-100 text-purple-800 border-purple-200',
	CANCELLED: 'bg-gray-100 text-gray-800 border-gray-200',
}

const STATUS_LABELS = Object.fromEntries(
	statusOptions.map((o) => [o.value, o.label]),
)

function normalizeStatus(status: string) {
	return status.toUpperCase()
}

export function AppointmentsTable({ data, isLoading }: AppointmentsTableProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Ближайшие записи</CardTitle>
			</CardHeader>
			<CardContent>
				{isLoading ? (
					<Skeleton className='h-[200px] w-full' />
				) : (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Время</TableHead>
								<TableHead>Клиент</TableHead>
								<TableHead>Авто</TableHead>
								<TableHead>Услуга</TableHead>
								<TableHead>Механик</TableHead>
								<TableHead>Статус</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.map((item) => {
								const status = normalizeStatus(item.status)
								return (
									<TableRow key={item.id}>
										<TableCell className='tabular-nums text-nowrap'>
											{(() => {
												try {
													return format(parseISO(item.time), 'HH:mm', { locale: ru })
												} catch {
													return item.time
												}
											})()}
										</TableCell>
										<TableCell>{item.clientName}</TableCell>
										<TableCell>{item.vehicleName}</TableCell>
										<TableCell>{item.serviceName ?? '—'}</TableCell>
										<TableCell>{item.mechanicName ?? '—'}</TableCell>
										<TableCell>
											<Badge
												variant='outline'
												className={STATUS_COLORS[status] ?? ''}
											>
												{STATUS_LABELS[status] ?? item.status}
											</Badge>
										</TableCell>
									</TableRow>
								)
							})}
							{!data?.length && (
								<TableRow>
									<TableCell colSpan={6} className='h-24 text-center'>
										Нет записей на сегодня
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
