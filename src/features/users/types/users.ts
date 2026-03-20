import type { UserRole } from '@/types/user'

export type UserListParams = {
  page?: number
  pageSize?: number
  searchTerm?: string
  isActive?: boolean
  role?: UserRole
}

export type CreateUser = {
  username: string
  email: string
  password: string
  role: UserRole
}

export type UpdateUser = {
  username?: string
  email?: string
  password?: string
  role?: UserRole
  isActive?: boolean
}
