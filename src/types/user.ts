export type UserRole = 'admin' | 'manager' | 'mechanic' | 'warehouse_worker'

export interface User {
  id: number
  username: string
  email: string
  role: UserRole
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export const ROLE_LABELS: Record<string, string> = {
  admin: 'Администратор',
  manager: 'Менеджер',
  mechanic: 'Механик',
  warehouse_worker: 'Кладовщик',
}
