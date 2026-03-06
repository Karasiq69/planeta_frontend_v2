export type UserRole = 'admin' | 'manager' | 'mechanic' | 'warehouse_worker'

export interface User {
  userId: string
  username: string
  email: string
  role: UserRole
}
