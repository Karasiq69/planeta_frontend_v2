'use client'

import { BadgeCheck, FileText, Package, Warehouse } from 'lucide-react'

import { AppSheet } from '@/components/ds/base/AppSheet'
import { Separator } from '@/components/ui/separator'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import { DocumentStatusBadge } from '@/features/documents/components/DocumentStatusBadge'
import { QuantityIndicator } from '@/features/stock-movements/components/QuantityIndicator'
import { documentTypeConfig } from '@/features/documents/lib/constants'
import { useAllInventoryTransactions } from '@/features/warehouse/api/queries'
import { formatPrice } from '@/lib/utils'

import type { StockMovements } from '@/features/stock-movements/types/stock-movements'
import type { WarehouseItem } from '@/features/warehouse/types'

interface Props {
  item: WarehouseItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const WarehouseItemHistorySheet = ({ item, open, onOpenChange }: Props) => {
  const { data, isLoading } = useAllInventoryTransactions(
    { warehouseItemId: item?.id, limit: 50 },
    !!item,
  )

  const transactions = data?.data ?? []
  const quantity = Number(item?.quantity ?? 0)
  const reserved = Number(item?.reservedQuantity ?? 0)
  const available = quantity - reserved

  return (
    <AppSheet
      open={open}
      onOpenChange={onOpenChange}
      title={
        <span className='flex items-center gap-2'>
          {item?.product?.name || 'Товар'}
          {item?.product?.isOriginal && (
            <BadgeCheck size={18} className='text-blue-500 shrink-0' />
          )}
        </span>
      }
      description={`${item?.product?.sku} · ${item?.warehouse?.name}`}
      size='xl'
    >
      {/* Stats */}
      {item && (
        <div className='grid grid-cols-3 gap-px rounded-lg border bg-border overflow-hidden'>
          <StatCell
            icon={<Package size={14} className='text-muted-foreground' />}
            label='На складе'
            value={`${Math.floor(quantity)} шт.`}
          />
          <StatCell
            icon={<Warehouse size={14} className='text-muted-foreground' />}
            label='Доступно'
            value={`${Math.floor(available)} шт.`}
            valueClass={available <= Number(item.minimumQuantity) ? 'text-red-600' : 'text-green-600'}
          />
          <StatCell
            label='Розница'
            value={formatPrice(item.retailPrice)}
          />
        </div>
      )}

      <Separator className='my-4' />

      {/* Timeline */}
      {isLoading ? (
        <LoaderSectionAnimated className='rounded p-10' />
      ) : transactions.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-16 text-muted-foreground'>
          <FileText size={32} strokeWidth={1.5} className='mb-3 opacity-40' />
          <p className='text-sm'>Нет движений по этому товару</p>
        </div>
      ) : (
        <div className='relative'>
          {/* Timeline line */}
          <div className='absolute left-[15px] top-2 bottom-2 w-px bg-border' />

          <div className='space-y-0'>
            {transactions.map((tx, i) => (
              <TransactionRow key={tx.id} tx={tx} isLast={i === transactions.length - 1} />
            ))}
          </div>
        </div>
      )}
    </AppSheet>
  )
}

function StatCell({
  icon,
  label,
  value,
  valueClass,
}: {
  icon?: React.ReactNode
  label: string
  value: string
  valueClass?: string
}) {
  return (
    <div className='bg-background px-3 py-2.5'>
      <div className='flex items-center gap-1.5 text-xs text-muted-foreground mb-0.5'>
        {icon}
        {label}
      </div>
      <div className={`text-sm font-semibold tabular-nums ${valueClass ?? ''}`}>
        {value}
      </div>
    </div>
  )
}

function TransactionRow({ tx, isLast }: { tx: StockMovements; isLast: boolean }) {
  const qty = Number(tx.quantity)
  const isPositive = qty > 0
  const typeConfig = documentTypeConfig[tx.document?.type]
  const date = new Date(tx.createdAt)

  return (
    <div className={`relative flex gap-3 pl-0 ${isLast ? '' : 'pb-4'}`}>
      {/* Timeline dot */}
      <div className='relative z-10 mt-1 flex shrink-0 items-center justify-center'>
        <QuantityIndicator quantity={qty} />
      </div>

      {/* Content */}
      <div className='flex-1 min-w-0 pt-0.5'>
        <div className='flex items-center justify-between gap-2'>
          <div className='flex items-center gap-2 min-w-0'>
            <span className='text-sm font-medium truncate'>
              {typeConfig?.label || tx.document?.type || '—'}
            </span>
            <DocumentStatusBadge
              status={tx.document?.status}
              className='text-[10px] px-1.5 py-0 shrink-0'
            />
          </div>

          <span className={`text-sm font-semibold tabular-nums shrink-0 ${
            isPositive ? 'text-emerald-600' : 'text-red-600'
          }`}>
            {isPositive ? '+' : ''}{Math.floor(qty)} шт.
          </span>
        </div>

        <div className='flex items-center gap-2 mt-0.5 text-xs text-muted-foreground'>
          <span>
            {date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })}
            {', '}
            {date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
          </span>
          {tx.document?.number && (
            <>
              <span className='text-border'>·</span>
              <span>№{tx.document.number}</span>
            </>
          )}
          {tx.price && Number(tx.price) > 0 && (
            <>
              <span className='text-border'>·</span>
              <span>{formatPrice(tx.price)}</span>
            </>
          )}
        </div>

        {tx.note && (
          <p className='mt-1 text-xs text-muted-foreground/70 truncate'>{tx.note}</p>
        )}
      </div>
    </div>
  )
}
