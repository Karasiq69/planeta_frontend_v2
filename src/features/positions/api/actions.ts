import apiClient from '@/lib/auth/client'
import { POSITIONS_URL } from '@/lib/constants'

import type { Position, CreatePositionPayload, UpdatePositionPayload } from '../types'

interface ListResponse {
  data: Position[]
  meta: { total: number; page: number; pageSize: number; totalPages: number }
}

export const getAllPositionsFn = async (params?: {
  page?: number
  pageSize?: number
  searchTerm?: string
}): Promise<ListResponse> => {
  const response = await apiClient.get<ListResponse>(POSITIONS_URL, { params })
  return response.data
}

export const getPositionByIdFn = async (id: number): Promise<Position> => {
  const response = await apiClient.get<Position>(`${POSITIONS_URL}/${id}`)
  return response.data
}

export const createPositionFn = async (data: CreatePositionPayload): Promise<Position> => {
  const response = await apiClient.post<Position>(POSITIONS_URL, data)
  return response.data
}

export const updatePositionFn = async (id: number, data: UpdatePositionPayload): Promise<Position> => {
  const response = await apiClient.patch<Position>(`${POSITIONS_URL}/${id}`, data)
  return response.data
}

export const deletePositionFn = async (id: number): Promise<void> => {
  await apiClient.delete(`${POSITIONS_URL}/${id}`)
}
