'use client'

import { DatePicker } from '@/components/ui/date-picker'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCashRegisters } from '@/features/payments/api/queries'

import type { PaymentsQueryParams } from '@/features/payments/types'

interface PaymentsFiltersProps {
  filters: PaymentsQueryParams
  onChange: (filters: PaymentsQueryParams) => void
}

const ALL_VALUE = '__all__'

const toISODate = (date: Date | undefined) =>
  date ? date.toISOString().split('T')[0] : undefined

const fromISODate = (str: string | undefined) =>
  str ? new Date(str + 'T00:00:00') : undefined

const PaymentsFilters = ({ filters, onChange }: PaymentsFiltersProps) => {
  const { data: cashRegisters } = useCashRegisters()

  return (
    <>
      <Select
        value={filters.status ?? ALL_VALUE}
        onValueChange={(v) =>
          onChange({ ...filters, status: v === ALL_VALUE ? undefined : (v as PaymentsQueryParams['status']) })
        }
      >
        <SelectTrigger className='w-[160px]'>
          <SelectValue placeholder='Статус' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL_VALUE}>Все статусы</SelectItem>
          <SelectItem value='completed'>Оплачен</SelectItem>
          <SelectItem value='cancelled'>Отменён</SelectItem>
          <SelectItem value='pending'>Ожидает</SelectItem>
          <SelectItem value='refunded'>Возврат</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.cashRegisterId?.toString() ?? ALL_VALUE}
        onValueChange={(v) =>
          onChange({ ...filters, cashRegisterId: v === ALL_VALUE ? undefined : Number(v) })
        }
      >
        <SelectTrigger className='w-auto min-w-[180px]'>
          <SelectValue placeholder='Касса' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL_VALUE}>Все кассы</SelectItem>
          {cashRegisters?.map((cr) => (
            <SelectItem key={cr.id} value={cr.id.toString()}>
              {cr.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DatePicker
        value={fromISODate(filters.dateFrom)}
        onChange={(date) => onChange({ ...filters, dateFrom: toISODate(date) })}
        placeholder='Дата от'
        className='w-[160px]'
      />

      <DatePicker
        value={fromISODate(filters.dateTo)}
        onChange={(date) => onChange({ ...filters, dateTo: toISODate(date) })}
        placeholder='Дата до'
        className='w-[160px]'
      />
    </>
  )
}

export default PaymentsFilters
