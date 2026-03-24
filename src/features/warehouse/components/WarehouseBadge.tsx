import { Warehouse } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { warehouseTypeConfig } from '@/features/warehouse/types/config'

import type { WarehouseTypeEnum } from '@/features/warehouse/types'

interface WarehouseBadgeProps {
  name: string
  type?: WarehouseTypeEnum | string
}

export function WarehouseBadge({ name, type }: WarehouseBadgeProps) {
  const Icon = (type && warehouseTypeConfig[type]?.icon) || Warehouse
  return (
    <Badge variant='secondary' className='gap-1.5 font-normal whitespace-nowrap'>
      <Icon size={14} aria-hidden='true' />
      {name}
    </Badge>
  )
}
