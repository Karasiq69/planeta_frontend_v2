export interface Organization {
  id: number
  name: string
  inn: string
  kpp?: string
  ogrn?: string
  legalAddress?: string
  actualAddress?: string
  phone?: string
  email?: string
  bankName?: string
  bankBik?: string
  bankAccount?: string
  logo?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
