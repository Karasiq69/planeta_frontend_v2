import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

import { Separator } from '@/components/ui/separator'
import { formatPrice } from '@/lib/utils'

import type { Document } from '@/features/documents/types'

interface Props {
  document: Document
}

const Field = ({ label, value }: { label: string; value: string | null | undefined }) => (
  <div className='flex items-baseline gap-2'>
    <span className='text-muted-foreground text-sm shrink-0'>{label}</span>
    <span className='text-sm font-medium truncate'>{value || '—'}</span>
  </div>
)

const ReceiptDocumentHeader = ({ document }: Props) => {
  return (
    <div className='rounded-lg border bg-card p-4'>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-3'>
        <Field label='Склад:' value={document.warehouse?.name} />
        <Field label='Поставщик:' value={document.supplier?.name} />
        <Field label='Организация:' value={document.organization?.name} />
        <Field label='Сумма:' value={formatPrice(document.totalAmount ?? 0)} />
        <Field
          label='Вх. номер:'
          value={
            document.incomingNumber
              ? document.incomingDate
                ? `${document.incomingNumber} от ${format(new Date(document.incomingDate), 'dd.MM.yyyy', { locale: ru })}`
                : document.incomingNumber
              : null
          }
        />
        <Field
          label='Дата:'
          value={document.date ? format(new Date(document.date), 'dd.MM.yyyy', { locale: ru }) : null}
        />
        <Field label='Примечание:' value={document.note} />
      </div>
    </div>
  )
}

export default ReceiptDocumentHeader
