'use client'

import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { usePaymentCategories } from '@/features/payments/api/cash-transactions-queries'

import type { CashTransactionFilters, TransactionType } from '@/features/payments/types'

export type TransactionTableFilters = Pick<CashTransactionFilters, 'type' | 'categoryId' | 'dateFrom' | 'dateTo'>

interface CashTransactionsToolbarProps {
  filters: TransactionTableFilters
  onFiltersChange: (filters: TransactionTableFilters) => void
}

const CashTransactionsToolbar = ({ filters, onFiltersChange }: CashTransactionsToolbarProps) => {
  const { data: categories } = usePaymentCategories({ isActive: true })

  const filteredCategories = categories?.filter((cat) => {
    if (!filters.type) return true
    return cat.type === filters.type || cat.type === 'both'
  })

  const hasFilters = filters.type || filters.categoryId || filters.dateFrom || filters.dateTo

  return (
    <div className='flex items-center gap-2 flex-wrap'>
      <Select
        value={filters.type ?? 'all'}
        onValueChange={(val) =>
          onFiltersChange({ ...filters, type: val === 'all' ? undefined : (val as TransactionType), categoryId: undefined })
        }
      >
        <SelectTrigger className='w-[140px] h-8 text-sm'>
          <SelectValue placeholder='Тип' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>Все типы</SelectItem>
          <SelectItem value='income'>Доходы</SelectItem>
          <SelectItem value='expense'>Расходы</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.categoryId?.toString() ?? 'all'}
        onValueChange={(val) =>
          onFiltersChange({ ...filters, categoryId: val === 'all' ? undefined : Number(val) })
        }
      >
        <SelectTrigger className='w-[180px] h-8 text-sm'>
          <SelectValue placeholder='Категория' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>Все категории</SelectItem>
          {filteredCategories?.map((cat) => (
            <SelectItem key={cat.id} value={cat.id.toString()}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type='date'
        value={filters.dateFrom ?? ''}
        onChange={(e) => onFiltersChange({ ...filters, dateFrom: e.target.value || undefined })}
        className='w-[140px] h-8 text-sm'
        placeholder='С'
      />
      <Input
        type='date'
        value={filters.dateTo ?? ''}
        onChange={(e) => onFiltersChange({ ...filters, dateTo: e.target.value || undefined })}
        className='w-[140px] h-8 text-sm'
        placeholder='По'
      />

      {hasFilters && (
        <Button
          variant='ghost'
          size='sm'
          className='h-8 px-2'
          onClick={() => onFiltersChange({})}
        >
          <X className='size-4 mr-1' />
          Сбросить
        </Button>
      )}
    </div>
  )
}

export default CashTransactionsToolbar
