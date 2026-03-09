import { Building2 } from 'lucide-react'

import { warehouseTypeConfig } from '@/features/warehouse/types/config'

export const getWarehouseIcon = (type?: string, className = 'size-3.5') => {
  const Icon = (type && warehouseTypeConfig[type]?.icon) || Building2
  return <Icon className={className} />
}
