export type ClientType = 'individual' | 'legal_entity' | 'individual_entrepreneur' | 'government'

export const CLIENT_TYPE_LABELS: Record<ClientType, string> = {
  individual: 'Физлицо',
  legal_entity: 'Юрлицо',
  individual_entrepreneur: 'ИП',
  government: 'Госорган',
}

export type IClient = {
  id: number
  firstName: string
  lastName: string
  middleName: string | null
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

export type ClientSummary = {
  totalOrders: number
  totalCars: number
  totalPaid: number
  totalDebt: number
}
