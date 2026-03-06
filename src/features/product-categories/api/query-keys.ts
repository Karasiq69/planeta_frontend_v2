export const categoryQueryKeys = {
  all: ['product-categories'] as const,
  list: () => [...categoryQueryKeys.all, 'list'] as const,
}
