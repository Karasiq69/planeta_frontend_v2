export type PayrollStatus = 'draft' | 'confirmed' | 'paid'

export interface PayrollListItem {
  id: number
  periodStart: string
  periodEnd: string
  status: PayrollStatus
  createdAt: string
  confirmedAt: string | null
  paidAt: string | null
  totalAmount: number
  itemsCount: number
}

export interface PayrollDetail {
  id: number
  periodStart: string
  periodEnd: string
  status: PayrollStatus
  createdAt: string
  confirmedAt: string | null
  paidAt: string | null
  summary: PayrollMechanicSummary[]
  totalAmount: number
  totalItems: number
}

export interface PayrollMechanicSummary {
  mechanicId: number
  mechanicName: string
  totalAmount: number
  servicesCount: number
}

export interface PayrollItem {
  id: number
  mechanicId: number
  mechanicName: string
  orderId: number
  servicePrice: number
  paymentType: 'percent' | 'fixed'
  paymentRate: number
  participationPercentage: number
  calculatedAmount: number
}

export interface CreatePayrollDto {
  month: number
  year: number
}

export interface PayrollQuery {
  year?: number
}

export interface GenerateResult {
  itemsCount: number
  totalAmount: number
}
