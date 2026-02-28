import apiClient from '@/lib/auth/client'
import { DASHBOARD_URL } from '@/lib/constants'

import type {
  AppointmentItem,
  DashboardLowStockParams,
  DashboardPaginatedParams,
  DashboardPeriodParams,
  DashboardReservedItemsParams,
  DebtsResponse,
  KpiSummaryResponse,
  LowStockItem,
  MechanicLoadItem,
  MechanicOrdersResponse,
  OrdersByStatusResponse,
  RecentReceiptsResponse,
  ReservedItemsResponse,
  RevenueResponse,
  TopServiceItem,
  WarehousePendingItem,
} from '@/features/dashboard/types'
import type { ListResponse } from '@/types/params'

export const getKpiSummary = async (params: DashboardPeriodParams): Promise<KpiSummaryResponse> => {
  const response = await apiClient.get<KpiSummaryResponse>(`${DASHBOARD_URL}/kpi-summary`, {
    params,
  })
  return response.data
}

export const getRevenue = async (params: DashboardPeriodParams): Promise<RevenueResponse> => {
  const response = await apiClient.get<RevenueResponse>(`${DASHBOARD_URL}/revenue`, { params })
  return response.data
}

export const getOrdersByStatus = async (
  params: DashboardPeriodParams
): Promise<OrdersByStatusResponse> => {
  const response = await apiClient.get<OrdersByStatusResponse>(
    `${DASHBOARD_URL}/orders-by-status`,
    { params }
  )
  return response.data
}

export const getMechanicLoad = async (): Promise<MechanicLoadItem[]> => {
  const response = await apiClient.get<MechanicLoadItem[]>(`${DASHBOARD_URL}/mechanic-load`)
  return response.data
}

export const getTopServices = async (
  params: DashboardPeriodParams
): Promise<TopServiceItem[]> => {
  const response = await apiClient.get<TopServiceItem[]>(`${DASHBOARD_URL}/top-services`, {
    params,
  })
  return response.data
}

export const getDebts = async (params: DashboardPaginatedParams): Promise<DebtsResponse> => {
  const response = await apiClient.get<DebtsResponse>(`${DASHBOARD_URL}/debts`, { params })
  return response.data
}

export const getLowStock = async (
  params: DashboardLowStockParams
): Promise<ListResponse<LowStockItem>> => {
  const response = await apiClient.get<ListResponse<LowStockItem>>(`${DASHBOARD_URL}/low-stock`, {
    params,
  })
  return response.data
}

export const getAppointments = async (): Promise<AppointmentItem[]> => {
  const response = await apiClient.get<AppointmentItem[]>(`${DASHBOARD_URL}/appointments`)
  return response.data
}

export const getWarehousePending = async (
  params: DashboardPaginatedParams
): Promise<ListResponse<WarehousePendingItem>> => {
  const response = await apiClient.get<ListResponse<WarehousePendingItem>>(
    `${DASHBOARD_URL}/warehouse-pending`,
    { params }
  )
  return response.data
}

export const getRecentReceipts = async (
  params: DashboardPaginatedParams
): Promise<RecentReceiptsResponse> => {
  const response = await apiClient.get<RecentReceiptsResponse>(`${DASHBOARD_URL}/recent-receipts`, {
    params,
  })
  return response.data
}

export const getReservedItems = async (
  params: DashboardReservedItemsParams
): Promise<ReservedItemsResponse> => {
  const response = await apiClient.get<ReservedItemsResponse>(`${DASHBOARD_URL}/reserved-items`, {
    params,
  })
  return response.data
}

export const getMyOrders = async (): Promise<MechanicOrdersResponse> => {
  const response = await apiClient.get<MechanicOrdersResponse>(`${DASHBOARD_URL}/my-orders`)
  return response.data
}
