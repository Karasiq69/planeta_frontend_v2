import type {
	DashboardLowStockParams,
	DashboardPaginatedParams,
	DashboardPeriodParams,
	DashboardReservedItemsParams,
} from '@/features/dashboard/types'

export const dashboardQueryKeys = {
	all: ['dashboard'] as const,
	kpiSummary: (params: DashboardPeriodParams) => [...dashboardQueryKeys.all, 'kpi-summary', { params }] as const,
	revenue: (params: DashboardPeriodParams) => [...dashboardQueryKeys.all, 'revenue', { params }] as const,
	ordersByStatus: (params: DashboardPeriodParams) => [...dashboardQueryKeys.all, 'orders-by-status', { params }] as const,
	mechanicLoad: () => [...dashboardQueryKeys.all, 'mechanic-load'] as const,
	topServices: (params: DashboardPeriodParams) => [...dashboardQueryKeys.all, 'top-services', { params }] as const,
	debts: (params: DashboardPaginatedParams) => [...dashboardQueryKeys.all, 'debts', { params }] as const,
	lowStock: (params: DashboardLowStockParams) => [...dashboardQueryKeys.all, 'low-stock', { params }] as const,
	appointments: () => [...dashboardQueryKeys.all, 'appointments'] as const,
	warehousePending: (params: DashboardPaginatedParams) => [...dashboardQueryKeys.all, 'warehouse-pending', { params }] as const,
	recentReceipts: (params: DashboardPaginatedParams) => [...dashboardQueryKeys.all, 'recent-receipts', { params }] as const,
	reservedItems: (params: DashboardReservedItemsParams) => [...dashboardQueryKeys.all, 'reserved-items', { params }] as const,
	myOrders: () => [...dashboardQueryKeys.all, 'my-orders'] as const,
}
