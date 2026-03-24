export const productBrandQueryKeys = {
  all: ['product-brands'] as const,
  list: () => [...productBrandQueryKeys.all, 'list'] as const,
}
