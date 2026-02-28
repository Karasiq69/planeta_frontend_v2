import { keepPreviousData, useQuery } from '@tanstack/react-query'

import {
	getAppointments,
	getDebts,
	getKpiSummary,
	getLowStock,
	getMechanicLoad,
	getMyOrders,
	getOrdersByStatus,
	getRecentReceipts,
	getReservedItems,
	getRevenue,
	getTopServices,
	getWarehousePending,
} from './actions'
import { dashboardQueryKeys } from './query-keys'

import type {
	DashboardLowStockParams,
	DashboardPaginatedParams,
	DashboardPeriodParams,
	DashboardReservedItemsParams,
} from '@/features/dashboard/types'

// TODO: убрать логирование после отладки
function logQuery<T>(name: string, data: T): T {
	console.log(`[Dashboard] ${name}:`, JSON.stringify(data, null, 2))
	return data
}

export const useKpiSummary = (params: DashboardPeriodParams) => {
	return useQuery({
		queryKey: dashboardQueryKeys.kpiSummary(params),
		queryFn: () => getKpiSummary(params).then((d) => logQuery('kpiSummary', d)),
	})
}

export const useRevenue = (params: DashboardPeriodParams) => {
	return useQuery({
		queryKey: dashboardQueryKeys.revenue(params),
		queryFn: () => getRevenue(params).then((d) => logQuery('revenue', d)),
	})
}

export const useOrdersByStatus = (params: DashboardPeriodParams) => {
	return useQuery({
		queryKey: dashboardQueryKeys.ordersByStatus(params),
		queryFn: () => getOrdersByStatus(params).then((d) => logQuery('ordersByStatus', d)),
	})
}

export const useMechanicLoad = () => {
	return useQuery({
		queryKey: dashboardQueryKeys.mechanicLoad(),
		queryFn: () => getMechanicLoad().then((d) => logQuery('mechanicLoad', d)),
	})
}

export const useTopServices = (params: DashboardPeriodParams) => {
	return useQuery({
		queryKey: dashboardQueryKeys.topServices(params),
		queryFn: () => getTopServices(params).then((d) => logQuery('topServices', d)),
	})
}

export const useDebts = (params: DashboardPaginatedParams) => {
	return useQuery({
		queryKey: dashboardQueryKeys.debts(params),
		queryFn: () => getDebts(params).then((d) => logQuery('debts', d)),
		placeholderData: keepPreviousData,
	})
}

export const useLowStock = (params: DashboardLowStockParams) => {
	return useQuery({
		queryKey: dashboardQueryKeys.lowStock(params),
		queryFn: () => getLowStock(params).then((d) => logQuery('lowStock', d)),
		placeholderData: keepPreviousData,
	})
}

export const useAppointments = () => {
	return useQuery({
		queryKey: dashboardQueryKeys.appointments(),
		queryFn: () => getAppointments().then((d) => logQuery('appointments', d)),
	})
}

export const useWarehousePending = (params: DashboardPaginatedParams) => {
	return useQuery({
		queryKey: dashboardQueryKeys.warehousePending(params),
		queryFn: () => getWarehousePending(params).then((d) => logQuery('warehousePending', d)),
		placeholderData: keepPreviousData,
	})
}

export const useRecentReceipts = (params: DashboardPaginatedParams) => {
	return useQuery({
		queryKey: dashboardQueryKeys.recentReceipts(params),
		queryFn: () => getRecentReceipts(params).then((d) => logQuery('recentReceipts', d)),
		placeholderData: keepPreviousData,
	})
}

export const useReservedItems = (params: DashboardReservedItemsParams) => {
	return useQuery({
		queryKey: dashboardQueryKeys.reservedItems(params),
		queryFn: () => getReservedItems(params).then((d) => logQuery('reservedItems', d)),
		placeholderData: keepPreviousData,
	})
}

export const useMyOrders = () => {
	return useQuery({
		queryKey: dashboardQueryKeys.myOrders(),
		queryFn: () => getMyOrders().then((d) => logQuery('myOrders', d)),
	})
}
