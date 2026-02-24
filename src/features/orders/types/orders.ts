import type { ICar } from '@/features/cars/types'
import type { IClient } from '@/features/clients/types'
import type { Mechanic } from '@/features/mechanics/types'
import type { IService } from '@/features/services/types'
import type { User } from '@/types'

export const OrderStatus = {
  APPLICATION: 'APPLICATION',
  ORDER: 'ORDER',
  IN_PROGRESS: 'IN_PROGRESS',
  WAITING_WAREHOUSE: 'WAITING_WAREHOUSE',
  WAITING_PAYMENT: 'WAITING_PAYMENT',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const

// Тип OrderStatus на основе констант
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]

// Массив опций для UI компонентов (например, селектов)
export const statusOptions: { value: OrderStatus; label: string }[] = [
  { value: OrderStatus.APPLICATION, label: 'Заявка' },
  { value: OrderStatus.ORDER, label: 'Заказ-наряд' },
  { value: OrderStatus.WAITING_WAREHOUSE, label: 'Ждет склад' },
  { value: OrderStatus.IN_PROGRESS, label: 'В работе' },
  { value: OrderStatus.WAITING_PAYMENT, label: 'Ждет оплаты' },
  { value: OrderStatus.COMPLETED, label: 'Завершен' },
  { value: OrderStatus.CANCELLED, label: 'Отменен' },
]

export interface Order {
  id: number
  clientId?: number
  client?: IClient
  carId?: number
  car?: ICar
  status: OrderStatus
  totalCost: number
  recommendation?: string
  reasonToApply?: string
  createdAt: string
  updatedAt: string
  services: OrderService[]
  createdById: number
  creator: User
}

// Query параметры для списка заказов
export interface OrdersQueryParams {
  page?: number
  pageSize?: number
  clientId?: number
  status?: OrderStatus
  searchTerm?: string | undefined
  filters?: {
    status?: string[]
    [key: string]: unknown
  }
}

// Response типы
export interface PaginationMeta {
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface OrdersListResponse {
  data: Order[]
  meta: PaginationMeta
}

export interface OrderService {
  id: number
  orderId: number
  serviceId: number
  defaultDuration: number
  appliedRate: number
  appliedPrice: number
  discountPercent: number
  startTime: string | null
  endTime: string | null
  service: IService
  mechanics: OrderServiceMechanic[]
}

export interface OrderServiceMechanic {
  id: number
  orderServiceId: number
  mechanicId: number
  participationPercentage: number
  paymentType: 'percent' | 'fixed'
  paymentRate: number
  mechanic: Mechanic
}
