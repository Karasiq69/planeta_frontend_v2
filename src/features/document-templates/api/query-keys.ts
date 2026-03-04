export const templateQueryKeys = {
  all: ['templates'] as const,
  lists: () => [...templateQueryKeys.all, 'list'] as const,
  list: (category?: string) => [...templateQueryKeys.lists(), { category }] as const,
  details: () => [...templateQueryKeys.all, 'detail'] as const,
  detail: (id: number) => [...templateQueryKeys.details(), id] as const,
}
