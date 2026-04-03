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

export const useKpiSummary = (params: DashboardPeriodParams) => {
	return useQuery({
		queryKey: dashboardQueryKeys.kpiSummary(params),
		queryFn: () => getKpiSummary(params),
	})
}

export const useRevenue = (params: DashboardPeriodParams) => {
	return useQuery({
		queryKey: dashboardQueryKeys.revenue(params),
		queryFn: () => getRevenue(params),
	})
}

export const useOrdersByStatus = (params: DashboardPeriodParams) => {
	return useQuery({
		queryKey: dashboardQueryKeys.ordersByStatus(params),
		queryFn: () => getOrdersByStatus(params),
	})
}

export const useMechanicLoad = () => {
	return useQuery({
		queryKey: dashboardQueryKeys.mechanicLoad(),
		queryFn: getMechanicLoad,
	})
}

export const useTopServices = (params: DashboardPeriodParams) => {
	return useQuery({
		queryKey: dashboardQueryKeys.topServices(params),
		queryFn: () => getTopServices(params),
	})
}

export const useDebts = (params: DashboardPaginatedParams) => {
	return useQuery({
		queryKey: dashboardQueryKeys.debts(params),
		queryFn: () => getDebts(params),
		placeholderData: keepPreviousData,
	})
}

export const useLowStock = (params: DashboardLowStockParams) => {
	return useQuery({
		queryKey: dashboardQueryKeys.lowStock(params),
		queryFn: () => getLowStock(params),
		placeholderData: keepPreviousData,
	})
}

export const useAppointments = () => {
	return useQuery({
		queryKey: dashboardQueryKeys.appointments(),
		queryFn: getAppointments,
	})
}

export const useWarehousePending = (params: DashboardPaginatedParams) => {
	return useQuery({
		queryKey: dashboardQueryKeys.warehousePending(params),
		queryFn: () => getWarehousePending(params),
		placeholderData: keepPreviousData,
	})
}

export const useRecentReceipts = (params: DashboardPaginatedParams) => {
	return useQuery({
		queryKey: dashboardQueryKeys.recentReceipts(params),
		queryFn: () => getRecentReceipts(params),
		placeholderData: keepPreviousData,
	})
}

export const useReservedItems = (params: DashboardReservedItemsParams) => {
	return useQuery({
		queryKey: dashboardQueryKeys.reservedItems(params),
		queryFn: () => getReservedItems(params),
		placeholderData: keepPreviousData,
	})
}

export const useMyOrders = () => {
	return useQuery({
		queryKey: dashboardQueryKeys.myOrders(),
		queryFn: getMyOrders,
	})
}
