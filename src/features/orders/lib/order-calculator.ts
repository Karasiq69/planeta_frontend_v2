import type { OrderProduct } from '@/features/order-products/types'
import type { OrderService } from '@/features/orders/types'

export const calculateTotalDuration = (services: OrderService[]): number => {
  return services.reduce((total, service) => total + (service.defaultDuration || 0), 0)
}

export const formatDuration = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (hours === 0) return `${minutes} мин`
  if (minutes === 0) return `${hours} ч`
  return `${hours} ч ${minutes} мин`
}

export const countActiveProducts = (products: OrderProduct[]): number => {
  return products.filter((product) => product.status !== 'CANCELLED').length
}

export const countActiveServices = (services: OrderService[]): number => {
  return services.filter((service) => service.appliedPrice > 0).length
}
