export const ordersQueryKeys = {
    all: ['orders'] as const,
    details: () => [...ordersQueryKeys.all, 'order'] as const,
    detail: (id: number) => [...ordersQueryKeys.details(), id] as const,
}