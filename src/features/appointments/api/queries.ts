import { useQuery } from '@tanstack/react-query'

import { getAppointmentsFn } from '@/features/appointments/api/actions'
import { appointmentsQueryKeys } from '@/features/appointments/api/query-keys'

export const useAppointments = () => {
  return useQuery({
    queryKey: appointmentsQueryKeys.all,
    queryFn: getAppointmentsFn,
  })
}
