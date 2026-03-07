'use client'

import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { ChevronDown, ExternalLink, FileText } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'

import { QuantityCell } from '@/components/common/table/cells/QuantityCell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import { useDocumentsList } from '@/features/documents/api/queries'
import {
  getOperationIcon,
  getOperationLabel,
} from '@/features/documents/components/FormFieldSelectOperation'
import { getStatusConfig } from '@/features/documents/lib/status-helper'
import { WarehouseBadge } from '@/features/warehouse/components/WarehouseBadge'
import { cn } from '@/lib/utils'

import type { Document, DocumentItem } from '@/features/documents/types'

const getDocumentLink = (doc: Document) => {
  if (doc.type === 'TRANSFER') return `/documents/transfer/${doc.id}`
  return `/documents/${doc.id}`
}

function DocumentItemRow({ item }: { item: DocumentItem }) {
  return (
    <div className='flex items-center justify-between gap-4 py-1.5 px-3 text-sm'>
      <div className='flex-1 min-w-0'>
        <span className='font-medium'>{item.product.name}</span>
        {item.product.sku && (
          <span className='text-muted-foreground ml-2 text-xs'>{item.product.sku}</span>
        )}
      </div>
      <QuantityCell value={item.quantity} />
    </div>
  )
}

function DocumentCard({ document: doc }: { document: Document }) {
  const [expanded, setExpanded] = useState(false)
  const statusConfig = getStatusConfig(doc.status)

  return (
    <div className='rounded-lg border bg-card overflow-hidden'>
      <div className='flex items-center gap-3 p-3'>
        <FileText size={16} className='text-muted-foreground shrink-0' />

        <Link
          href={getDocumentLink(doc)}
          className='text-sm font-medium hover:underline shrink-0'
        >
          #{doc.id}
        </Link>

        {doc.date && (
          <span className='text-xs text-muted-foreground shrink-0'>
            {format(new Date(doc.date), 'dd.MM.yyyy', { locale: ru })}
          </span>
        )}

        <Badge variant={statusConfig.variant} className='shrink-0'>
          {statusConfig.label}
        </Badge>

        {doc.operationType && getOperationLabel(doc.operationType) && (
          <div className='inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs font-medium shrink-0'>
            {getOperationIcon(doc.operationType, 12)}
            {getOperationLabel(doc.operationType)}
          </div>
        )}

        <div className='flex-1' />

        <div className='flex items-center gap-2 shrink-0'>
          {doc.fromWarehouse && (
            <>
              <WarehouseBadge name={doc.fromWarehouse.name} type={doc.fromWarehouse.type} />
              <span className='text-muted-foreground text-xs'>→</span>
            </>
          )}
          {doc.warehouse && (
            <WarehouseBadge name={doc.warehouse.name} type={doc.warehouse.type} />
          )}
        </div>

        <Button variant='ghost' size='sm' className='h-7 w-7 p-0 shrink-0' asChild>
          <Link href={getDocumentLink(doc)}>
            <ExternalLink size={14} />
          </Link>
        </Button>
      </div>

      {doc.items?.length > 0 && (
        <>
          <button
            onClick={() => setExpanded(!expanded)}
            className='flex items-center gap-1.5 w-full px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted/50 border-t transition-colors'
          >
            <ChevronDown
              size={14}
              className={cn('transition-transform', expanded && 'rotate-180')}
            />
            Позиции ({doc.items.length})
          </button>

          {expanded && (
            <div className='border-t bg-muted/30 divide-y divide-border'>
              {doc.items.map((item) => (
                <DocumentItemRow key={item.id} item={item} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

const DocumentsTabContent = () => {
  const { id } = useParams()
  const orderId = Number(id)
  const { data, isLoading } = useDocumentsList({ orderId })

  if (isLoading) return <LoaderSectionAnimated className='bg-background' text='Загружаем...' />

  const documents = data?.data || []

  if (documents.length === 0) {
    return (
      <Card>
        <CardContent className='flex flex-col items-center justify-center py-12 text-muted-foreground'>
          <FileText size={32} className='mb-2 opacity-50' />
          <p className='text-sm'>Нет связанных документов</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className='space-y-2'>
      {documents.map((doc) => (
        <DocumentCard key={doc.id} document={doc} />
      ))}
    </div>
  )
}

export default DocumentsTabContent
