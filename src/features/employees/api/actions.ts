import apiClient from '@/lib/auth/client'
import { EMPLOYEES_URL } from '@/lib/constants'

import type { CreateEmployee, Employee, UpdateEmployee } from '@/features/employees/types'
import type { ListParams, ListResponse } from '@/types/params'

export const getAllEmployeesFn = async (
  params: ListParams
): Promise<ListResponse<Employee>> => {
  const res = await apiClient.get<ListResponse<Employee>>(EMPLOYEES_URL, { params })
  return res.data
}

export const getEmployeeByIdFn = async (id: number): Promise<Employee> => {
  const res = await apiClient.get<Employee>(`${EMPLOYEES_URL}/${id}`)
  return res.data
}

export const getEmployeesByOrganizationFn = async (orgId: number): Promise<Employee[]> => {
  const res = await apiClient.get<Employee[]>(`${EMPLOYEES_URL}/organization/${orgId}`)
  return res.data
}

export const createEmployeeFn = async (data: CreateEmployee): Promise<Employee> => {
  const res = await apiClient.post<Employee>(EMPLOYEES_URL, data)
  return res.data
}

export const updateEmployeeFn = async (id: number, data: UpdateEmployee): Promise<Employee> => {
  const res = await apiClient.patch<Employee>(`${EMPLOYEES_URL}/${id}`, data)
  return res.data
}

export const deleteEmployeeFn = async (id: number): Promise<void> => {
  await apiClient.delete(`${EMPLOYEES_URL}/${id}`)
}
