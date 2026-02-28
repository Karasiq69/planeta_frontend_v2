// === Query Params ===
export type DashboardPeriod = 'today' | 'week' | 'month' | 'custom'

export interface DashboardPeriodParams {
	period: DashboardPeriod
	dateFrom?: string
	dateTo?: string
}

export interface DashboardPaginatedParams {
	page?: number
	pageSize?: number
}

export interface DashboardLowStockParams extends DashboardPaginatedParams {
	warehouseId?: number
}

export interface DashboardReservedItemsParams extends DashboardPaginatedParams {
	warehouseId?: number
}

// === KPI Summary ===
export interface KpiMetric {
	value: number
	changePercent: number
}

export interface KpiSummaryResponse {
	revenue: KpiMetric
	orders: KpiMetric
	averageCheck: KpiMetric
	mechanicLoad: KpiMetric
}

// === Revenue by Day ===
export interface RevenueDataPoint {
	date: string
	amount: number
}

export interface RevenueResponse {
	current: RevenueDataPoint[]
	previous: RevenueDataPoint[]
}

// === Orders by Status ===
export interface OrderStatusCount {
	status: string
	count: number
}

export interface OrdersByStatusResponse {
	total: number
	statuses: OrderStatusCount[]
}

// === Mechanic Load ===
export interface MechanicLoadItem {
	id: number
	name: string
	activeOrders: number
	maxLoad: number
}

// API отдаёт массив MechanicLoadItem[] напрямую

// === Top Services ===
export interface TopServiceItem {
	serviceId: number
	name: string
	count: number
	revenue: number
}

// API отдаёт массив TopServiceItem[] напрямую

// === Debts ===
export interface DebtItem {
	orderId: number
	clientName: string
	vehicleName: string
	amount: number
	daysPastDue: number
}

export interface DebtsResponse {
	totalDebt: number
	data: DebtItem[]
	meta: { total: number; page: number; pageSize: number; totalPages: number }
}

// === Low Stock ===
export interface LowStockItem {
	id: number
	productName: string
	sku: string | null
	currentQuantity: number
	minimumQuantity: number
	warehouseName: string
}

// === Appointments ===
export interface AppointmentItem {
	id: number
	time: string
	clientName: string
	vehicleName: string
	serviceName: string | null
	mechanicName: string | null
	status: string
}

// API отдаёт массив AppointmentItem[] напрямую

// === Warehouse Pending ===
export interface WarehousePendingItem {
	orderId: number
	clientName: string
	vehicleName: string
	products: Array<{ name: string; quantity: number }>
	mechanicName: string
}

// === Recent Receipts ===
export interface RecentReceiptItem {
	id: number
	number: string
	supplierName: string | null
	itemCount: number
	totalAmount: number
	date: string
	status: string
}

export interface RecentReceiptsResponse {
	totalAmount: number
	data: RecentReceiptItem[]
	meta: { total: number; page: number; pageSize: number; totalPages: number }
}

// === Reserved Items ===
export interface ReservedItem {
	id: number
	productName: string
	sku: string | null
	reservedQuantity: number
	availableQuantity: number
	orderId: number
}

export interface ReservedItemsResponse {
	totalReserved: number
	data: ReservedItem[]
	meta: { total: number; page: number; pageSize: number; totalPages: number }
}

// === Mechanic Orders ===
export interface MechanicOrderItem {
	orderId: number
	vehicleName: string
	serviceName: string
	status: string
}

export interface MechanicOrdersResponse {
	total: number
	data: MechanicOrderItem[]
}
