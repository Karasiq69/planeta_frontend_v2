export const mechanicsQueryKeys = {
  all: ['mechanics'] as const,
  details: () => [...mechanicsQueryKeys.all, 'mechanic'] as const,
  detail: (id: number) => [...mechanicsQueryKeys.details(), id] as const,

  // lists: () => [...mechanicsQueryKeys.all, 'list'] as const,
  // list: (params: OrdersQueryParams) => [...mechanicsQueryKeys.lists(), {params}] as const
}
