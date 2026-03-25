import { ArrowRight } from 'lucide-react'

import { WarehouseBadge } from './WarehouseBadge'

import type { WarehouseTypeEnum } from '@/features/warehouse/types'

interface WarehouseInfo {
  name: string
  type?: WarehouseTypeEnum | string
}

interface WarehouseTransferDirectionProps {
  from?: WarehouseInfo | null
  to?: WarehouseInfo | null
}

export function WarehouseTransferDirection({ from, to }: WarehouseTransferDirectionProps) {
  return (
    <div className='flex items-center gap-1.5'>
      {from ? <WarehouseBadge name={from.name} type={from.type} /> : <span className='text-muted-foreground'>—</span>}
      <ArrowRight className='size-3.5 shrink-0 text-muted-foreground' />
      {to ? <WarehouseBadge name={to.name} type={to.type} /> : <span className='text-muted-foreground'>—</span>}
    </div>
  )
}
