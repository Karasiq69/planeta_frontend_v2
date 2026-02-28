'use client'

import { useMyOrders, useAppointments } from '@/features/dashboard/api/queries'
import { MechanicOrdersTable } from '@/features/dashboard/components/tables/MechanicOrdersTable'
import { AppointmentsTable } from '@/features/dashboard/components/tables/AppointmentsTable'

export function MechanicTab() {
	const myOrders = useMyOrders()
	const appointments = useAppointments()

	return (
		<div className='space-y-6'>
			<MechanicOrdersTable data={myOrders.data} isLoading={myOrders.isLoading} />
			<AppointmentsTable data={appointments.data} isLoading={appointments.isLoading} />
		</div>
	)
}
