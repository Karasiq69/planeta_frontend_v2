export const commentQueryKeys = {
    all: ['comments'] as const,

    byOrder: () => [...commentQueryKeys.all, 'order'] as const,
    byOrderId: (orderId: number) => [...commentQueryKeys.byOrder(), orderId] as const,
};