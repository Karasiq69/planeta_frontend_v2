import apiClient from '@/lib/auth/client'
import { APPOINTMENTS_URL } from '@/lib/constants'

import type { AppointmentResponse } from '@/features/appointments/types/appointment'

export const getAppointmentsFn = async () => {
  const response = await apiClient.get(APPOINTMENTS_URL)
  return response.data
}

export const getAppointmentsByOrderFn = async (orderId: number): Promise<AppointmentResponse[]> => {
  const res = await apiClient.get<AppointmentResponse[]>(`${APPOINTMENTS_URL}/order/${orderId}`)
  return res.data
}
