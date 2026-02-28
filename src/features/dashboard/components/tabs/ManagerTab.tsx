'use client'

import { useState } from 'react'

import {
  useKpiSummary,
  useRevenue,
  useOrdersByStatus,
  useMechanicLoad,
  useTopServices,
  useDebts,
  useLowStock,
  useAppointments,
} from '@/features/dashboard/api/queries'
import { KpiCards } from '@/features/dashboard/components/cards/KpiCards'
import { MechanicLoadChart } from '@/features/dashboard/components/charts/MechanicLoadChart'
import { OrdersByStatusChart } from '@/features/dashboard/components/charts/OrdersByStatusChart'
import { RevenueChart } from '@/features/dashboard/components/charts/RevenueChart'
import { AppointmentsTable } from '@/features/dashboard/components/tables/AppointmentsTable'
import { DebtsTable } from '@/features/dashboard/components/tables/DebtsTable'
import { LowStockTable } from '@/features/dashboard/components/tables/LowStockTable'
import { TopServicesTable } from '@/features/dashboard/components/tables/TopServicesTable'

import type { DashboardPeriodParams } from '@/features/dashboard/types'

interface ManagerTabProps {
  periodParams: DashboardPeriodParams
  warehouseId?: number
}

export function ManagerTab({ periodParams, warehouseId }: ManagerTabProps) {
  const [debtsPage, setDebtsPage] = useState(1)
  const [debtsPageSize, setDebtsPageSize] = useState(10)
  const [lowStockPage, setLowStockPage] = useState(1)
  const [lowStockPageSize, setLowStockPageSize] = useState(10)

  const kpi = useKpiSummary(periodParams)
  const revenue = useRevenue(periodParams)
  const ordersByStatus = useOrdersByStatus(periodParams)
  const mechanicLoad = useMechanicLoad()
  const topServices = useTopServices(periodParams)
  const debts = useDebts({ page: debtsPage, pageSize: debtsPageSize })
  const lowStock = useLowStock({ warehouseId, page: lowStockPage, pageSize: lowStockPageSize })
  const appointments = useAppointments()
  return (
    <div className='space-y-6'>
      {/* KPI Cards */}
      <KpiCards data={kpi.data} isLoading={kpi.isLoading} />

      {/* Charts Row: Revenue (65%) + Orders by Status (35%) */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.54fr]'>
        <RevenueChart data={revenue.data} isLoading={revenue.isLoading} />
        <OrdersByStatusChart data={ordersByStatus.data} isLoading={ordersByStatus.isLoading} />
      </div>

      {/* Mechanic Load (50%) + Top Services (50%) */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <MechanicLoadChart data={mechanicLoad.data} isLoading={mechanicLoad.isLoading} />
        <TopServicesTable data={topServices.data} isLoading={topServices.isLoading} />
      </div>

      {/* Debts (50%) + Low Stock (50%) */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <DebtsTable
          data={debts.data}
          isLoading={debts.isLoading}
          page={debtsPage}
          pageSize={debtsPageSize}
          onPageChange={setDebtsPage}
          onPageSizeChange={setDebtsPageSize}
        />
        <LowStockTable
          data={lowStock.data}
          isLoading={lowStock.isLoading}
          page={lowStockPage}
          pageSize={lowStockPageSize}
          onPageChange={setLowStockPage}
          onPageSizeChange={setLowStockPageSize}
        />
      </div>

      {/* Appointments - full width */}
      <AppointmentsTable data={appointments.data} isLoading={appointments.isLoading} />
    </div>
  )
}
