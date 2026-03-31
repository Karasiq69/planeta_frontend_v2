import type { Order } from '@/features/orders/types'

type CompletionRule = {
  label: string
  check: (order: Order) => boolean
}

const COMPLETION_RULES: CompletionRule[] = [
  { label: 'Вид ремонта', check: (o) => !!o.repairType },
  { label: 'Диспетчер', check: (o) => !!o.dispatcherId },
  { label: 'Мастер-приёмщик', check: (o) => !!o.masterId },
]

type GuardResult = { ok: true } | { ok: false; missing: string[] }

export const useOrderCompletionGuard = (order: Order) => {
  const canComplete = (): GuardResult => {
    const missing = COMPLETION_RULES.filter((rule) => !rule.check(order)).map((rule) => rule.label)

    if (missing.length > 0) {
      return { ok: false, missing }
    }

    return { ok: true }
  }

  return { canComplete }
}
