import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPhone = (phone: string) => {
  return phone.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '+7 ($1) $2-$3-$4')
}

export function formatPrice(
  price: number | string | undefined,
  options: {
    currency?: 'RUB' | 'USD'
    notation?: Intl.NumberFormatOptions['notation']
  } = {}
) {
  if (price === undefined) return '-'
  const { currency = 'RUB', notation = 'compact' } = options

  const numericPrice = typeof price === 'string' ? parseFloat(price) : price

  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(numericPrice)
}
