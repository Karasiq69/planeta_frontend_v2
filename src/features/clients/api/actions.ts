import apiClient from '@/lib/auth/client'
import { CARS_URL, CLIENTS_URL } from '@/lib/constants'

import type { ICar } from '@/features/cars/types'
import type { ClientSummary, IClient } from '@/features/clients/types'
import type { ClientListParams, ClientListResponse } from '@/features/clients/types/params'

export const getAllClientsListFn = async (
  params: ClientListParams
): Promise<ClientListResponse> => {
  const res = await apiClient.get<ClientListResponse>(`${CLIENTS_URL}`, {
    params,
  })
  return res.data
}
export const getClientById = async (id: number): Promise<IClient> => {
  const res = await apiClient.get<IClient>(`${CLIENTS_URL}/${id}`)
  return res.data
}

export const getClientSummary = async (id: number): Promise<ClientSummary> => {
  const res = await apiClient.get<ClientSummary>(`${CLIENTS_URL}/${id}/summary`)
  return res.data
}

export const getClientCars = async (clientId: number): Promise<ICar[]> => {
  const res = await apiClient.get<ICar[]>(CARS_URL, {
    params: { ownerId: clientId },
  })
  return res.data
}
