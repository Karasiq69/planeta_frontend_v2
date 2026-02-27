import { formatPrice } from '@/lib/utils'

import { MONTH_NAMES } from './constants'

export const formatPayrollPeriod = (periodStart: string): string => {
  const date = new Date(periodStart)
  const month = MONTH_NAMES[date.getMonth()]
  const year = date.getFullYear()
  return `${month} ${year}`
}

export const formatPaymentRate = (type: 'percent' | 'fixed', rate: number): string => {
  if (type === 'percent') return `${rate}%`
  return formatPrice(rate)
}
