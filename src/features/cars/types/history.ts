export interface CarHistorySummary {
  totalOrders: number
  totalSpent: number
  totalServices: number
  totalProducts: number
  firstVisit: string | null
  lastVisit: string | null
  currentMileage: number | null
}

export interface CarMileageRecord {
  id: number
  value: number
  orderId: number | null
  createdAt: string
}

export interface CarHistoryOrderService {
  id: number
  name: string
  appliedPrice: number
  mechanics: Array<{ name: string }>
}

export interface CarHistoryOrderProduct {
  id: number
  name: string
  quantity: number
  actualPrice: number | null
  estimatedPrice: number
}

export interface CarHistoryOrderPayment {
  amount: number
  paymentMethod: string
  status: string
  paidAt: string | null
}

export interface CarHistoryOrder {
  id: number
  status: string
  totalCost: number | null
  reasonToApply: string | null
  recommendation: string | null
  createdAt: string
  mileage: number | null
  services: CarHistoryOrderService[]
  products: CarHistoryOrderProduct[]
  payments: CarHistoryOrderPayment[]
}

export interface CarHistoryResponse {
  summary: CarHistorySummary
  mileageHistory: CarMileageRecord[]
  orders: {
    data: CarHistoryOrder[]
    pagination: {
      page: number
      pageSize: number
      total: number
      totalPages: number
    }
  }
}

export interface CarHistoryParams {
  page?: number
  pageSize?: number
  dateFrom?: string
  dateTo?: string
}
