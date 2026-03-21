import { formatPrice } from '@/lib/utils'

export interface VatConfig {
  isVatPayer: boolean
  priceIncludesVat: boolean
  rate: number
}

export interface VatResult {
  vatAmount: number
  label: string
  formattedAmount: string
}

export const calculateVatAmount = (subtotal: number, config: VatConfig): number => {
  if (!config.isVatPayer || config.rate <= 0) return 0

  const raw = config.priceIncludesVat
    ? (subtotal * config.rate) / (100 + config.rate)
    : (subtotal * config.rate) / 100

  return Math.round(raw * 100) / 100
}

export const getVatLabel = (config: VatConfig): string => {
  if (!config.isVatPayer) return 'Без НДС'
  return config.priceIncludesVat
    ? `В т.ч. НДС ${config.rate}%`
    : `НДС ${config.rate}%`
}

export const getVatResult = (subtotal: number, config: VatConfig): VatResult => {
  const vatAmount = calculateVatAmount(subtotal, config)

  // Для не плательщика НДС: label = "НДС", formattedAmount = "Без НДС"
  // (сохраняем текущее поведение OrderTotals)
  if (!config.isVatPayer) {
    return { vatAmount: 0, label: 'НДС', formattedAmount: 'Без НДС' }
  }

  return {
    vatAmount,
    label: getVatLabel(config),
    formattedAmount: formatPrice(vatAmount),
  }
}
