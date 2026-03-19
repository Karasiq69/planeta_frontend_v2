export type TaxRegime = 'osno' | 'usn' | 'usn_income' | 'usn_income_expense' | 'patent' | 'eshn'

export interface UpdateTaxSettingsPayload {
  taxRegime?: TaxRegime | null
  isVatPayer?: boolean
  defaultVatRateId?: number | null
  priceIncludesVat?: boolean
}

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
  hourlyRate: number
  logo?: string
  isActive: boolean
  taxRegime: TaxRegime | null
  isVatPayer: boolean
  defaultVatRateId: number | null
  priceIncludesVat: boolean
  createdAt: Date
  updatedAt: Date
}
