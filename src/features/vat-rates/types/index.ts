export interface VatRate {
  id: number
  name: string
  rate: string
  isDefault: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateVatRatePayload {
  name: string
  rate: number
  isDefault?: boolean
}

export type UpdateVatRatePayload = Partial<CreateVatRatePayload>
