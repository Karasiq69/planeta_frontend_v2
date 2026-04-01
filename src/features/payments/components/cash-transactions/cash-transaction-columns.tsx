'use client'

import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import type { CashTransaction } from '@/features/payments/types'
import type { ColumnDef } from '@tanstack/react-table'

const formatTransactionAmount = (amount: number, type: 'income' | 'expense') => {
  const formatted = new Intl.NumberFormat('ru-RU').format(amount)
  const prefix = type === 'income' ? '+ ' : '- '
  return prefix + formatted + ' ₽'
}

const formatDateTime = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }) + ' ' + date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const cashTransactionColumns: ColumnDef<CashTransaction>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Дата',
    cell: ({ row }) => (
      <span className='text-muted-foreground text-xs whitespace-nowrap'>
        {formatDateTime(row.original.createdAt)}
      </span>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Тип',
    cell: ({ row }) => (
      <Badge variant={row.original.type === 'income' ? 'success' : 'destructive'}>
        {row.original.type === 'income' ? 'Доход' : 'Расход'}
      </Badge>
    ),
  },
  {
    accessorKey: 'categoryName',
    header: 'Категория',
  },
  {
    accessorKey: 'amount',
    header: 'Сумма',
    cell: ({ row }) => (
      <span className={`font-semibold tabular-nums ${row.original.type === 'income' ? 'text-emerald-600' : 'text-red-600'}`}>
        {formatTransactionAmount(row.original.amount, row.original.type)}
      </span>
    ),
  },
  {
    accessorKey: 'description',
    header: 'Описание',
    cell: ({ row }) => {
      const desc = row.original.description
      if (!desc) return <span className='text-muted-foreground'>—</span>
      if (desc.length <= 40) return desc
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className='truncate max-w-[200px] block cursor-default'>{desc}</span>
          </TooltipTrigger>
          <TooltipContent className='max-w-sm'>{desc}</TooltipContent>
        </Tooltip>
      )
    },
  },
  {
    id: 'source',
    header: 'Источник',
    cell: ({ row }) => {
      const { paymentId, payrollId, documentId } = row.original
      if (paymentId) return <span className='text-primary'>Заказ</span>
      if (payrollId) return <span className='text-primary'>Ведомость</span>
      if (documentId) return <span className='text-primary'>Документ</span>
      return <span className='text-muted-foreground'>Вручную</span>
    },
  },
  {
    accessorKey: 'createdByName',
    header: 'Автор',
    cell: ({ row }) => (
      <span className='text-muted-foreground text-sm'>{row.original.createdByName}</span>
    ),
  },
]
