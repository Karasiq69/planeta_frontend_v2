import { Warehouse } from 'lucide-react'

import { warehouseTypeConfig } from '@/features/warehouse/types/config'

export const getWarehouseIcon = (type?: string, className = 'size-3.5') => {
  const Icon = (type && warehouseTypeConfig[type]?.icon) || Warehouse
  return <Icon className={className} />
}
