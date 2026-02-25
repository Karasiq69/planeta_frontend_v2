import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

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

const ExpenseDocumentHeader = ({ document }: Props) => {
  return (
    <div className='rounded-lg border bg-card p-4'>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-3'>
        <Field label='Склад:' value={document.warehouse?.name} />
        <Field
          label='Дата:'
          value={document.date ? format(new Date(document.date), 'dd.MM.yyyy', { locale: ru }) : null}
        />
        {document.orderId && <Field label='Заказ:' value={`#${document.orderId}`} />}
        <Field label='Примечание:' value={document.note} />
      </div>
    </div>
  )
}

export default ExpenseDocumentHeader
