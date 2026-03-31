export const positionsQueryKeys = {
  all: ['positions'] as const,
  lists: () => [...positionsQueryKeys.all, 'list'] as const,
  list: (params?: Record<string, unknown>) => [...positionsQueryKeys.lists(), { params }] as const,
  details: () => [...positionsQueryKeys.all, 'detail'] as const,
  detail: (id: number) => [...positionsQueryKeys.details(), id] as const,
}
