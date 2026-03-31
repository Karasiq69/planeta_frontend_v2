import apiClient from '@/lib/auth/client'
import { DOCUMENTS_URL } from '@/lib/constants'

export const confirmDocument = async (
  id: number,
  cashRegisterId?: number
): Promise<unknown> => {
  const response = await apiClient.post(
    `${DOCUMENTS_URL}/${id}/confirm`,
    cashRegisterId != null ? { cashRegisterId } : undefined
  )
  return response.data
}
