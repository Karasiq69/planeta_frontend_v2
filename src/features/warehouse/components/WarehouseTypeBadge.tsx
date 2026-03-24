import { Badge } from '@/components/ui/badge'
import { getTypeConfig } from '@/helpers/get-type-config'
import { warehouseTypeConfig } from '@/features/warehouse/types/config'

interface WarehouseTypeBadgeProps {
  type: string
  className?: string
}

export function WarehouseTypeBadge({ type, className }: WarehouseTypeBadgeProps) {
  const config = getTypeConfig(type, warehouseTypeConfig)
  const Icon = config.icon
  return (
    <Badge variant={config.variant} className={className}>
      {Icon && <Icon className='mr-1 size-3' />}
      {config.label}
    </Badge>
  )
}
