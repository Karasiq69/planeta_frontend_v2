export type UserRole = 'admin' | 'manager' | 'mechanic' | 'storekeeper'

export interface User {
  userId: string
  username: string
  email: string
  role: UserRole
}
