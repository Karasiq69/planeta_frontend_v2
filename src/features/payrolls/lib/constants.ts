import type { VariantProps } from 'class-variance-authority'

import type { badgeVariants } from '@/components/ui/badge'
import type { PayrollStatus } from '@/features/payrolls/types'

type BadgeVariant = VariantProps<typeof badgeVariants>['variant']

export const PAYROLL_STATUS_LABELS: Record<PayrollStatus, string> = {
  draft: 'Черновик',
  confirmed: 'Подтверждена',
  paid: 'Оплачена',
}

export const PAYROLL_STATUS_VARIANT: Record<PayrollStatus, BadgeVariant> = {
  draft: 'warning',
  confirmed: 'info',
  paid: 'success',
}

export const PAYMENT_TYPE_LABELS: Record<'percent' | 'fixed', string> = {
  percent: 'Процент',
  fixed: 'Фикс',
}

export const MONTH_NAMES = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
]
