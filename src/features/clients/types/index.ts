export type ClientType = 'individual' | 'legal_entity'

export type IClient = {
  id: number
  firstName: string
  lastName: string
  email: string | null
  phone: string
  type: ClientType
  companyName: string | null
  inn: string | null
  kpp: string | null
  address: string | null
  createdAt: string
  updatedAt: string
}
