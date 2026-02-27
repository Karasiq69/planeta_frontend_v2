import type { PayrollQuery } from '@/features/payrolls/types'

export const payrollsQueryKeys = {
  all: ['payrolls'] as const,
  lists: () => [...payrollsQueryKeys.all, 'list'] as const,
  list: (params: PayrollQuery) => [...payrollsQueryKeys.lists(), { params }] as const,
  detail: (id: number) => [...payrollsQueryKeys.all, 'detail', id] as const,
  items: (id: number) => [...payrollsQueryKeys.all, 'items', id] as const,
}
