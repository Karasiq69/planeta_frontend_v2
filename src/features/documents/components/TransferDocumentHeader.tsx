import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import {
  AlertTriangle,
  ArrowRight,
  ArrowRightLeft,
  Building2,
  CalendarDays,
  WarehouseIcon,
  Wrench,
} from 'lucide-react'

import { getOperationIcon, getOperationLabel } from '@/features/documents/components/FormFieldSelectOperation'
import { WarehouseTypeEnum } from '@/features/warehouse/types'

import type { Document } from '@/features/documents/types'

interface Props {
  document: Document
}

const warehouseIcons: Record<string, typeof WarehouseIcon> = {
  [WarehouseTypeEnum.MAIN]: WarehouseIcon,
  [WarehouseTypeEnum.WORKSHOP]: Wrench,
  [WarehouseTypeEnum.TRANSIT]: ArrowRightLeft,
  [WarehouseTypeEnum.DEFECTIVE]: AlertTriangle,
}

const getWarehouseIcon = (type?: string) => {
  const Icon = (type && warehouseIcons[type]) || Building2
  return <Icon className='size-3.5' />
}

const TransferDocumentHeader = ({ document }: Props) => {
  return (
    <div className='rounded-lg border bg-card p-4'>
      <div className='flex flex-wrap items-center gap-x-6 gap-y-2'>
        <div className='inline-flex items-center gap-1.5 rounded-md bg-red-500/10 px-2.5 py-1 text-sm font-medium'>
          {getWarehouseIcon(document.fromWarehouse?.type)}
          {document.fromWarehouse?.name || '—'}
        </div>

        <ArrowRight className='size-4 text-muted-foreground shrink-0' />

        <div className='inline-flex items-center gap-1.5 rounded-md bg-green-500/10 px-2.5 py-1 text-sm font-medium'>
          {getWarehouseIcon(document.warehouse?.type)}
          {document.warehouse?.name || '—'}
        </div>

        {document.operationType && getOperationLabel(document.operationType) && (
          <div className='flex items-center gap-1.5 text-sm'>
            <span className='text-muted-foreground'>{getOperationIcon(document.operationType, 14)}</span>
            <span className='font-medium'>{getOperationLabel(document.operationType)}</span>
          </div>
        )}

        {document.orderId && (
          <div className='flex items-center gap-2 text-sm'>
            <span className='text-muted-foreground'>Заказ:</span>
            <span className='font-medium'>#{document.orderId}</span>
          </div>
        )}

        <div className='flex items-center gap-1.5 text-sm'>
          <CalendarDays className='size-3.5 text-muted-foreground' />
          <span className='font-medium'>
            {document.date ? format(new Date(document.date), 'dd.MM.yyyy', { locale: ru }) : '—'}
          </span>
        </div>

        {document.note && (
          <div className='flex items-center gap-2 text-sm'>
            <span className='text-muted-foreground'>Примечание:</span>
            <span className='font-medium truncate max-w-[200px]'>{document.note}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default TransferDocumentHeader
