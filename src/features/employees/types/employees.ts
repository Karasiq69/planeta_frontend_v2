import type { Organization } from '@/features/organizations/types'
import type { User } from '@/types/user'

export type EmployeePosition = 'mechanic' | 'manager' | 'warehouse_worker' | 'admin'

export interface Employee {
  id: number
  userId: number | null
  organizationId: number
  firstName: string
  lastName: string
  middleName: string | null
  position: EmployeePosition
  phone: string | null
  isActive: boolean
  hiredAt: string | null
  firedAt: string | null
  createdAt: string
  updatedAt: string
  organization?: Organization
  user?: User
}

export type CreateEmployee = {
  organizationId: number
  firstName: string
  lastName: string
  middleName?: string
  position: EmployeePosition
  phone?: string
  userId?: number
  hiredAt?: string
}

export type UpdateEmployee = Partial<CreateEmployee> & { isActive?: boolean; firedAt?: string }
