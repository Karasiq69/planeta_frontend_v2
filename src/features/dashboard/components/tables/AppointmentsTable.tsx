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

interface AppointmentsTableProps {
	data?: AppointmentItem[]
	isLoading: boolean
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
							{data?.map((item) => (
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
										<Badge variant='outline'>{item.status}</Badge>
									</TableCell>
								</TableRow>
							))}
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
