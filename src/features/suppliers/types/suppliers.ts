export interface Supplier {
  id: number
  name: string
  contactPerson?: string | null
  phone?: string | null
  email?: string | null
  address?: string | null
  inn?: string | null
  kpp?: string | null
  type?: string | null
  legalName?: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}
