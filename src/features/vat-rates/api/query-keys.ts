export const vatRatesQueryKeys = {
  all: ['vat-rates'] as const,

  lists: () => [...vatRatesQueryKeys.all, 'list'] as const,
  list: (params?: { active?: boolean }) => [...vatRatesQueryKeys.lists(), { params }] as const,

  details: () => [...vatRatesQueryKeys.all, 'detail'] as const,
  detail: (id: number) => [...vatRatesQueryKeys.details(), id] as const,
}
