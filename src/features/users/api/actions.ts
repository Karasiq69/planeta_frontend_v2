import apiClient from '@/lib/auth/client'
import { USERS_URL } from '@/lib/constants'

import type { User } from '@/types/user'
import type { ListResponse } from '@/types/params'
import type { CreateUser, UpdateUser, UserListParams } from '@/features/users/types'

export const getAllUsersFn = async (params: UserListParams): Promise<ListResponse<User>> => {
  const res = await apiClient.get<ListResponse<User>>(USERS_URL, { params })
  return res.data
}

export const getUserByIdFn = async (id: number): Promise<User> => {
  const res = await apiClient.get<User>(`${USERS_URL}/${id}`)
  return res.data
}

export const getUnlinkedUsersFn = async (): Promise<User[]> => {
  const res = await apiClient.get<User[]>(`${USERS_URL}/unlinked`)
  return res.data
}

export const createUserFn = async (data: CreateUser): Promise<User> => {
  const res = await apiClient.post<User>(USERS_URL, data)
  return res.data
}

export const updateUserFn = async (id: number, data: UpdateUser): Promise<User> => {
  const res = await apiClient.patch<User>(`${USERS_URL}/${id}`, data)
  return res.data
}

export const deleteUserFn = async (id: number): Promise<void> => {
  await apiClient.delete(`${USERS_URL}/${id}`)
}
