import { useQuery } from '@tanstack/react-query'

import { getAppointmentsFn, getAppointmentsByOrderFn } from '@/features/appointments/api/actions'
import { appointmentsQueryKeys } from '@/features/appointments/api/query-keys'

export const useAppointments = () => {
  return useQuery({
    queryKey: appointmentsQueryKeys.all,
    queryFn: getAppointmentsFn,
  })
}

export const useAppointmentsByOrder = (orderId: number) => {
  return useQuery({
    queryKey: appointmentsQueryKeys.byOrder(orderId),
    queryFn: () => getAppointmentsByOrderFn(orderId),
    enabled: !!orderId,
  })
}
